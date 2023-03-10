import Phaser from "phaser";
import Scenes from "@scenes";
import { BG_COLOR } from "config";

export default class Preload extends Phaser.Scene {
  constructor() {
    super(Scenes.PRELOAD);
  }

  preload() {
    // Create hidden text with font families that you have preloaded in index.html to ensure Phaser will render them
    this.add.text(0, 0, "Loading...", {
      color: BG_COLOR,
      fontSize: "48px",
      fontFamily: "KenneyMiniSquare",
    });
    //this.add.text(40, 40, "Loading...", { color: "#fff", fontSize: "48px" });
    this.load.pack({ key: "preload", url: "assets/pack.json" });
  }

  create() {
    this.scene.start(Scenes.START);
  }
}
