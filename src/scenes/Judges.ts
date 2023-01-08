import Phaser from "phaser";
import Scenes from "@scenes";
import GameProgess from "@utils/GameProgress";
import { FADE_LENGTH, TXT_COLOR } from "config";

export default class Judges extends Phaser.Scene {
  private tryAgainText?: Phaser.GameObjects.Text;
  private judges: [
    Phaser.GameObjects.Rectangle,
    Phaser.GameObjects.Rectangle
  ][] = [];
  private backdrop?: Phaser.GameObjects.Rectangle;
  private feedbackText?: Phaser.GameObjects.Text;

  constructor() {
    super(Scenes.JUDGES);
  }

  create() {
    this.scene.bringToTop();

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
      delay: 4000,
      callback: () => {
        // this.clearJudges();
        // this.addTryAgain();
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
    const feedbackPool = [
      "Hmmm. I'd like to see more pumpkins.",
      "In my opinion, using a cartwheel is just not done anymore",
      "I love your use of the large red flowers!",
    ];
    const feedback = Phaser.Utils.Array.GetRandom(feedbackPool) as string;
    const centerY = this.cameras.main.centerY;
    this.backdrop = this.add
      .rectangle(0, centerY, this.cameras.main.width, 100, 0x000000, 0.5)
      .setOrigin(0, 0.5)
      .setAlpha(0);
    this.feedbackText = this.add
      .text(this.cameras.main.centerX, centerY + 10, feedback, {
        color: "#fff",
        fontSize: "22px",
        fontFamily: "KenneyMiniSquare",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: [this.backdrop, this.feedbackText],
      alpha: 1,
      duration: FADE_LENGTH,
      ease: "Power1",
    });

    this.tweens.add({
      targets: this.feedbackText,
      y: centerY,
      duration: FADE_LENGTH,
      ease: "Back.easeOut",
    });

    // const nextButton = this.add
    //   .text(this.cameras.main.centerX, centerY + 80, "Next", {
    //     color: "#000",
    //     fontSize: "22px",
    //     fontFamily: "KenneyMiniSquare",
    //   })
    //   .setOrigin(0.5)
    //   .setInteractive({useHandCursor:true})
    this.time.addEvent({
      delay: 4000,
      callback: () => {
        this.clearJudges();
        this.addTryAgain();
      },
    });
  }

  addTryAgain() {
    this.tryAgainText = this.add
      .text(220, 330, `Try again next year`, {
        color: TXT_COLOR,
        fontSize: "24px",
        fontFamily: "KenneyMiniSquare",
      })
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.nextYear();
      });
    this.tryAgainText?.setAlpha(0);
    this.tweens.add({
      targets: this.tryAgainText,
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
          this.scene.start(Scenes.YEAR_INTRO);
        },
      });
    } else {
      console.error("Game over man");
    }
  }
}
