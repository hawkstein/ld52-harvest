import Scenes from "@scenes";
import Phaser from "phaser";

export default class HUD extends Phaser.Scene {
  private background?: Phaser.GameObjects.Graphics;
  private expanded = false;

  constructor() {
    super({ key: Scenes.HUD });
  }

  init() {
    this.input.keyboard.enabled = false;
  }

  create() {
    this.scene.bringToTop();

    const boxWidth = this.cameras.main.width;
    const boxHeight = this.cameras.main.height;
    this.background = this.add.graphics();
    this.background.fillStyle(0x222222, 0.8);
    this.background.fillRect(0, 0, boxWidth, boxHeight);
    this.background.setPosition(0, -boxHeight);

    const button = this.add.rectangle(30, 0, 60, 50, 0xff2222).setOrigin(0, 0);
    button.setInteractive({ useHandCursor: true });
    button.on("pointerdown", () => {
      this.tweens.add({
        targets: this.background,
        y: this.expanded ? -boxHeight : 0,
        ease: "Power1",
        duration: 300,
      });
      this.expanded = !this.expanded;
    });
  }
}
