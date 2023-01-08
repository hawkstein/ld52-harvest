import Phaser from "phaser";
import Scenes from "@scenes";
import { FADE_LENGTH, FONT_FAM, FONT_SIZE, TXT_COLOR } from "config";
import { ScoreCard } from "sprites/ScoreCard";

export default class YearScores extends Phaser.Scene {
  constructor() {
    super(Scenes.YEAR_SCORES);
  }

  create(scores: Record<string, number>) {
    const targets = Object.entries(scores).map(([judge, score], index) => {
      return this.scene.scene.add.existing(
        new ScoreCard({
          x: 136 + index * 210,
          y: 170,
          scene: this,
          score,
          judgeName: judge,
        })
      );
    });
    targets.forEach((t, index) => {
      this.tweens.add({
        targets: t,
        y: 140,
        duration: 400,
        delay: 50 * index,
        ease: "Back.easeInOut",
      });
    });

    const place = this.add
      .text(this.cameras.main.centerX, 280, "You came in 4th place", {
        color: TXT_COLOR,
        fontSize: "36px",
        fontFamily: FONT_FAM,
      })
      .setOrigin(0.5)
      .setAlpha(0);
    this.tweens.add({
      targets: place,
      alpha: 1,
      duration: 400,
      delay: 300,
      ease: "Power1",
    });

    const tryAgain = this.add
      .text(this.cameras.main.centerX, 340, "Try again next year", {
        color: TXT_COLOR,
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAM,
      })
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5)
      .setAlpha(0)
      .once("pointerdown", () => {
        const cam = this.cameras.main;
        cam.fade(FADE_LENGTH, 245, 229, 184);
        cam.once("camerafadeoutcomplete", () => {
          this.scene.start(Scenes.YEAR_INTRO);
        });
      });

    this.tweens.add({
      targets: tryAgain,
      alpha: 1,
      duration: 400,
      delay: 600,
      ease: "Power1",
    });
  }
}
