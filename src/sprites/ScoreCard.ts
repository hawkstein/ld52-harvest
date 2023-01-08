import { FONT_FAM, TXT_COLOR } from "config";
import Phaser from "phaser";

type ScoreConfig = {
  x: number;
  y: number;
  scene: Phaser.Scene;
  judgeName: string;
  score: number;
};

const CARD_WIDTH = 140;
const CARD_HEIGHT = 200;

export class ScoreCard extends Phaser.GameObjects.Container {
  constructor({ scene, judgeName, score, x, y }: ScoreConfig) {
    super(scene, x, y);
    const card = scene.add.rectangle(0, 0, CARD_WIDTH, CARD_HEIGHT, 0xffffff);
    const judgeLabel = scene.make
      .text({
        x: 0,
        y: Math.round(CARD_HEIGHT / 2) - 30,
        text: judgeName,
        style: {
          color: TXT_COLOR,
          fontSize: "24px",
          fontFamily: FONT_FAM,
        },
      })
      .setOrigin(0.5, 0.5);
    const scoreLabel = scene.make
      .text({
        x: 0,
        y: -20,
        text: `${score}`,
        style: {
          color: TXT_COLOR,
          fontSize: "64px",
          fontFamily: FONT_FAM,
        },
      })
      .setOrigin(0.5, 0.5);
    this.add([card, scoreLabel, judgeLabel]);
  }
}
