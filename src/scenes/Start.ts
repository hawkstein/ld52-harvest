import Phaser from "phaser";
import Scenes from "@scenes";
import GameProgess from "@utils/GameProgress";
import { FADE_LENGTH, FONT_FAM, TXT_COLOR } from "config";
import { GameButton } from "sprites/GameButton";

export default class Start extends Phaser.Scene {
  constructor() {
    super(Scenes.START);
  }

  create() {
    this.add
      .text(this.cameras.main.centerX, 50, `Ludum Dare 52\nTheme: Harvest`, {
        color: TXT_COLOR,
        fontSize: "24px",
        fontFamily: FONT_FAM,
      })
      .setOrigin(0.5);

    this.add
      .text(this.cameras.main.centerX, 130, "Another season", {
        color: TXT_COLOR,
        fontSize: "48px",
        fontFamily: FONT_FAM,
      })
      .setOrigin(0.5);
    this.add
      .text(this.cameras.main.centerX, 170, "in the village", {
        color: TXT_COLOR,
        fontSize: "36px",
        fontFamily: FONT_FAM,
      })
      .setOrigin(0.5);
    const playButton = new GameButton({
      x: this.cameras.main.centerX - 130,
      y: 230,
      width: 260,
      height: 50,
      scene: this,
      label: "Enter competition",
    });
    playButton.once("pointerdown", () => {
      const cam = this.cameras.main;
      cam.fade(FADE_LENGTH, 245, 229, 184);
      cam.once("camerafadeoutcomplete", () => {
        this.scene.start(Scenes.YEAR_INTRO);
      });
    });
    this.add.existing(playButton);
    this.game.registry.set("progress", new GameProgess());
  }
}
