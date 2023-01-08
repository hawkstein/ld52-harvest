import Phaser from "phaser";
import Scenes from "@scenes";
import GameProgess from "@utils/GameProgress";
import { FADE_LENGTH } from "config";
import DisplayElement from "sprites/DisplayElement";
import TileGrid from "@utils/TileGrid";
import { GameButton } from "sprites/GameButton";

type RecordObj = {
  name: string;
  scoreAdjustment: number;
  message: string;
  priority: number;
  key: string;
};

export default class Judges extends Phaser.Scene {
  private nextButton?: GameButton;
  private judges: [
    Phaser.GameObjects.Rectangle,
    Phaser.GameObjects.Rectangle
  ][] = [];
  private backdrop?: Phaser.GameObjects.Rectangle;
  private feedbackText?: Phaser.GameObjects.Text;
  private judgeText?: Phaser.GameObjects.Text;
  private messages: { name: string; body: string }[] = [];
  private scores: Record<string, number> = {};

  constructor() {
    super(Scenes.JUDGES);
  }

  create({ grid, elements }: { grid: TileGrid; elements: DisplayElement[] }) {
    this.scene.bringToTop();

    const progress = this.game.registry.get("progress") as GameProgess;
    const judges = progress.getJudges();

    const judgementResults = judges
      .map((judge) =>
        judge.prefs.map((judgement) => ({
          ...judgement(grid, elements),
          name: judge.name,
        }))
      )
      .flat();

    // Filter out the messages we haven't seen with the highest priority
    const importantMessages = Object.values(
      judgementResults.reduce<Record<string, RecordObj>>((highest, msg) => {
        const messagePriority = progress.hasSeenMessage(msg.key)
          ? msg.priority - 100
          : msg.priority;
        if (!highest[msg.name]) {
          return {
            ...highest,
            [msg.name]: { ...msg, priority: messagePriority },
          };
        }
        if (highest[msg.name].priority < messagePriority) {
          return {
            ...highest,
            [msg.name]: { ...msg, priority: messagePriority },
          };
        }
        return highest;
      }, {})
    );
    this.messages = importantMessages.map(({ name, message }) => ({
      name,
      body: message,
    }));
    // Use the results to create the panel scores
    this.scores = judgementResults.reduce<Record<string, number>>(
      (scoreTotals, result) => {
        if (!scoreTotals[result.name]) {
          return {
            ...scoreTotals,
            [result.name]: 5 + result.scoreAdjustment,
          };
        }
        return {
          ...scoreTotals,
          [result.name]: scoreTotals[result.name] + result.scoreAdjustment,
        };
      },
      {}
    );

    progress.addMessageKeys(importantMessages.map((msg) => msg.key));
    const boxWidth = this.cameras.main.width;
    const boxHeight = this.cameras.main.height;
    this.add
      .rectangle(0, 0, boxWidth, boxHeight, 0x000000, 0)
      .setOrigin(0)
      .setInteractive();

    this.judges = [];
    for (let index = 0; index < 3; index++) {
      this.addJudge(160 + index * 140, index * 300);
    }

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.addFeedback();
      },
    });
  }

  addJudge(x: number, delay: number) {
    const offscreenY = this.cameras.main.height;
    const clipboard = this.add
      .rectangle(x, offscreenY + 120, 100, 120, 0xffffff)
      .setOrigin(0, 0);
    this.tweens.add({
      targets: clipboard,
      y: offscreenY - 70,
      duration: 1200,
      delay: delay,
      ease: "Back.easeOut",
    });
    const head = this.add
      .rectangle(x + 40, offscreenY + 60, 60, 60, 0x999999)
      .setOrigin(0, 0);
    this.tweens.add({
      targets: head,
      y: offscreenY - 30,
      duration: 1000,
      delay: delay,
      ease: "Quart.easeInOut",
    });
    this.judges.push([clipboard, head]);
  }

  clearJudges() {
    this.judges.forEach((judgePair) => {
      const offscreenY = this.cameras.main.height;
      this.tweens.add({
        targets: judgePair,
        y: offscreenY + 30,
        duration: 600,
        ease: "Power2",
      });
    });
    this.tweens.add({
      targets: [this.backdrop, this.feedbackText],
      alpha: 0,
      duration: FADE_LENGTH,
      ease: "Power1",
    });
  }

  addFeedback() {
    const { name: judgeName, body: feedback } = this.messages.pop()!;

    const centerY = this.cameras.main.centerY;
    this.backdrop = this.add
      .rectangle(0, centerY, this.cameras.main.width, 100, 0x000000, 0.5)
      .setOrigin(0, 0.5)
      .setAlpha(0);
    this.judgeText = this.add
      .text(this.cameras.main.centerX, centerY - 20, judgeName, {
        color: "#fff",
        fontSize: "22px",
        fontFamily: "KenneyMiniSquare",
      })
      .setOrigin(0.5);
    this.feedbackText = this.add
      .text(this.cameras.main.centerX, centerY + 10, feedback, {
        color: "#fff",
        fontSize: "22px",
        fontFamily: "KenneyMiniSquare",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: [this.backdrop, this.feedbackText, this.judgeText],
      alpha: 1,
      duration: FADE_LENGTH,
      ease: "Power1",
    });

    // this.tweens.add({
    //   targets: this.feedbackText,
    //   y: centerY,
    //   duration: FADE_LENGTH,
    //   ease: "Back.easeOut",
    // });

    this.addButton();
  }

  addButton() {
    this.nextButton = this.add
      .existing(
        new GameButton({
          scene: this,
          x: this.cameras.main.centerX - 100,
          y: 255,
          width: 200,
          height: 50,
          label: "Next comment",
        })
      )
      .on("pointerdown", () => {
        if (this.messages.length) {
          const { name: judgeName, body: feedback } = this.messages.pop()!;
          this.feedbackText?.setText(feedback);
          this.judgeText?.setText(judgeName);
          if (!this.messages.length) {
            this.nextButton?.setText("View Scores");
          }
        } else {
          this.clearJudges();
          this.nextYear();
        }
      });
    this.nextButton?.setAlpha(0);
    this.tweens.add({
      targets: this.nextButton,
      alpha: 1,
      delay: 800,
      duration: FADE_LENGTH,
    });
  }

  nextYear() {
    const progress = this.game.registry.get("progress") as GameProgess;
    const stillPlaying = progress.advanceOneYear();
    if (stillPlaying) {
      this.time.addEvent({
        delay: FADE_LENGTH,
        callback: () => {
          this.scene.stop(Scenes.GAME);
          this.scene.start(Scenes.YEAR_SCORES, this.scores);
        },
      });
    } else {
      this.scene.stop(Scenes.GAME);
      this.scene.start(Scenes.GAME_END);
    }
  }
}
