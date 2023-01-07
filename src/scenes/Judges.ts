import Phaser from "phaser";
import Scenes from "@scenes";
import GameProgess from "@utils/GameProgress";
import { FADE_LENGTH, TXT_COLOR } from "config";

export default class Judges extends Phaser.Scene {
  private blocker?: Phaser.GameObjects.Rectangle;
  private tryAgainText?: Phaser.GameObjects.Text;

  constructor() {
    super(Scenes.JUDGES);
  }

  create() {
    this.scene.bringToTop();

    const boxWidth = this.cameras.main.width;
    const boxHeight = this.cameras.main.height;
    this.blocker = this.add
      .rectangle(0, 0, boxWidth, boxHeight, 0x000000, 0)
      .setOrigin(0)
      .setInteractive();

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
      duration: FADE_LENGTH,
      delay: FADE_LENGTH,
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
