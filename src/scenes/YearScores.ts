import Phaser from "phaser";
import Scenes from "@scenes";
import { FADE_LENGTH, FONT_FAM, FONT_SIZE, TXT_COLOR } from "config";
import { ScoreCard } from "sprites/ScoreCard";

const averageScore = (scores: Record<string, number>) =>
  Math.round(
    Object.values(scores).reduce((total, score) => total + score, 0) / 3
  );

const getPlacementMessage = (score: number) => {
  switch (score) {
    case 0:
      return "You came last. Out of 44 starred eyed hopefuls.";
    case 1:
      return "Bottom of the barrel. 36th place is yours.";
    case 2:
      return "You came 25th. Best keep this quiet or Brenda will talk.";
    case 3:
      return "You came 20th. Hopefully you can improve.";
    case 4:
      return "12th place is yours. Onwards and upwards!";
    case 5:
      return "7th place. Did you come here to lose? or to win!";
    case 6:
      return "5th place is yours. You can do better.";
    case 7:
      return "4th place. Some of these other displays are good!";
    case 8:
      return "3rd place. Nearly there!";
    case 9:
      return "So close! 2nd place in the competition. Next year!";
    case 10:
      return "You won! You came first! You have beaten all others!";
    default:
      return "You came last. For cheating.";
  }
};
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

    const average = averageScore(scores);
    const placementMessage = getPlacementMessage(average);

    const place = this.add
      .text(this.cameras.main.centerX, 280, placementMessage, {
        color: TXT_COLOR,
        fontSize: FONT_SIZE,
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
