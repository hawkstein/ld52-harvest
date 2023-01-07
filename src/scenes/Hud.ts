import Scenes from "@scenes";
import { Options } from "@utils/ElementData";
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

    const mask = new Phaser.Display.Masks.GeometryMask(this, this.background);

    this.cameras.main.setMask(mask);

    const container = this.add.container(0, -boxHeight);

    const button = this.add.rectangle(30, 0, 60, 50, 0xff2222).setOrigin(0, 0);
    button.setInteractive({ useHandCursor: true });
    button.on("pointerdown", () => {
      this.tweens.add({
        targets: [container, this.background, mask],
        y: this.expanded ? -boxHeight : 0,
        ease: "Power1",
        duration: 300,
      });
      this.expanded = !this.expanded;
    });

    const elementData = [...Options];
    let currentY = 50;
    elementData.forEach((option) => {
      const optionToClick = this.add.rectangle(
        200,
        currentY,
        option.size * 50,
        option.size * 50,
        option.colour
      );
      container.add(optionToClick);
      optionToClick.setInteractive({ useHandCursor: true });
      optionToClick.on("pointerdown", () => {
        this.events.emit("add_element", option);
      });
      currentY += 50 + option.size * 50;
    });
  }
}
