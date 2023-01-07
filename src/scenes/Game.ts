import Phaser from "phaser";
import Scenes from "@scenes";
import { TXT_COLOR } from "config";

export default class Game extends Phaser.Scene {
  constructor() {
    super(Scenes.GAME);
  }

  create() {
    const message = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 0,
      `Ludum Dare 52\nUntitled Compo Entry`,
      { color: TXT_COLOR, fontSize: "36px", fontFamily: "KenneyMiniSquare" }
    );
    message.x -= message.width / 2;
    message.y -= message.height / 2;
  }

  update() {}
}
