import Phaser from "phaser";
import Scenes from "@scenes";
import StartMenu from "@components/StartMenu";
import GameProgess from "@utils/GameProgress";

export default class Start extends Phaser.Scene {
  constructor() {
    super(Scenes.START);
  }

  create() {
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      `Ludum Dare 52\nUntitled Compo Entry`,
      { color: "#000", fontSize: "24px", fontFamily: "KenneyMiniSquare" }
    );
    title.x -= title.width / 2;
    title.y -= title.height / 2;

    const menu = new StartMenu(
      this,
      this.cameras.main.centerX,
      this.cameras.main.centerY - 20
    );
    menu.build();
    this.game.registry.set("progress", new GameProgess());
  }
}
