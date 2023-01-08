import Scenes from "@scenes";
import { Options } from "@utils/ElementData";
import { TXT_COLOR } from "config";
import Phaser from "phaser";
import { GameButton } from "sprites/GameButton";

export default class HUD extends Phaser.Scene {
  private background?: Phaser.GameObjects.Graphics;
  private blocker?: Phaser.GameObjects.Rectangle;
  private expanded = false;
  private scrollPos = 0;

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

    this.blocker = this.add
      .rectangle(0, -boxHeight, boxWidth, boxHeight, 0x000000, 0)
      .setOrigin(0)
      .setInteractive();

    this.background = this.add.graphics();
    this.background.fillStyle(0x222222, 0.8);
    this.background.fillRect(0, 0, boxWidth, boxHeight);
    this.background.setPosition(0, -boxHeight);

    const mask = new Phaser.Display.Masks.GeometryMask(this, this.background);

    const container = this.add.container(0, -boxHeight);
    container.setMask(mask);

    const up = this.add.existing(
      new GameButton({
        scene: this,
        label: "UP",
        x: -100,
        y: 80,
        width: 100,
        height: 50,
      })
    );
    const down = this.add.existing(
      new GameButton({
        scene: this,
        label: "DOWN",
        x: -100,
        y: 150,
        width: 100,
        height: 50,
      })
    );

    up.on("pointerdown", () => {
      this.scrollPos = Math.min(0, this.scrollPos + 300);
      this.tweens.add({
        targets: container,
        y: this.scrollPos,
        ease: "Power1",
        duration: 300,
      });
    });

    down.on("pointerdown", () => {
      this.scrollPos = Math.max(-2100, this.scrollPos - 300);
      this.tweens.add({
        targets: container,
        y: this.scrollPos,
        ease: "Power1",
        duration: 300,
      });
    });

    const toggle = () => {
      if (!this.expanded) {
        container.x = 0;
      }
      this.tweens.add({
        targets: [container, this.background, mask, this.blocker],
        y: this.expanded ? -boxHeight : 0,
        ease: "Power1",
        duration: 300,
        onComplete: () => {
          if (!this.expanded) {
            container.x = -boxWidth;
          }
        },
      });
      this.tweens.add({
        targets: [up, down],
        x: this.expanded ? -100 : 20,
        ease: "Back.easeOut",
        duration: 300,
      });
      this.expanded = !this.expanded;
    };

    const button = this.add.rectangle(20, 0, 140, 40, 0xff2222).setOrigin(0);
    this.add
      .text(35, 5, `Add item`, {
        color: TXT_COLOR,
        fontSize: "24px",
        fontFamily: "KenneyMiniSquare",
      })
      .setOrigin(0);
    button.setInteractive({ useHandCursor: true });
    button.on("pointerdown", toggle);

    const elementData = [...Options];
    let currentY = -50;
    let previousSize = 1;
    elementData.forEach((option) => {
      currentY += 50 + previousSize * 50;
      previousSize = option.size;
      const optionToClick = this.add
        .rectangle(
          200,
          currentY,
          option.size * 50,
          option.size * 50,
          option.colour
        )
        .setOrigin(0);
      const text = this.add
        .text(210 + option.size * 50, currentY, option.name, {
          color: "#fff",
          fontSize: "24px",
          fontFamily: "KenneyMiniSquare",
        })
        .setOrigin(0);
      container.add(optionToClick);
      container.add(text);
      optionToClick.setInteractive({ useHandCursor: true });
      optionToClick.on("pointerdown", () => {
        if (this.expanded) {
          //Checking that we're expanded is a bit of kludge around a bug where the edge of the HUD is still clickable somehow
          this.events.emit("add_element", option);
          toggle();
        }
      });
    });
  }
}
