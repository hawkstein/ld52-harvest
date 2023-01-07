import Phaser from "phaser";
import Scenes from "@scenes";
import GameProgess from "@utils/GameProgress";
import { FADE_LENGTH } from "config";

export default class YearIntro extends Phaser.Scene {
  constructor() {
    super(Scenes.YEAR_INTRO);
  }

  create() {
    const progress = this.game.registry.get("progress") as GameProgess;
    const year = progress.getCurrentYear();
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 100,
        `Year ${year}`,
        { color: "#000", fontSize: "24px", fontFamily: "KenneyMiniSquare" }
      )
      .setOrigin(0.5);

    this.time.addEvent({
      delay: FADE_LENGTH,
      callback: () => {
        const cam = this.cameras.main;
        cam.fade(FADE_LENGTH, 245, 229, 184);
        cam.once("camerafadeoutcomplete", () => {
          this.scene.launch(Scenes.HUD);
          this.scene.start(Scenes.GAME);
        });
      },
    });
  }
}
