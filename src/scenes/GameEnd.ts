import Phaser from "phaser";
import Scenes from "@scenes";
import { FONT_FAM, TXT_COLOR } from "config";

export default class GameEnd extends Phaser.Scene {
  constructor() {
    super(Scenes.GAME_END);
  }

  create() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "That's it! I've had enough!\n\nIt's been 10 years, I'm never going to win!",
        { fontFamily: FONT_FAM, color: TXT_COLOR }
      )
      .setOrigin(0);
  }
}
