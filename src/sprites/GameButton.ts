import { FONT_FAM, FONT_SIZE, TXT_COLOR } from "config";
import Phaser from "phaser";

type ButtonConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  scene: Phaser.Scene;
  label: string;
};

export class GameButton extends Phaser.GameObjects.Container {
  private isFocused: boolean = false;
  private label: Phaser.GameObjects.Text;
  private background: Phaser.GameObjects.Graphics;
  private _width: number;
  private _height: number;

  constructor({ scene, label, x, y, width, height }: ButtonConfig) {
    super(scene, x, y);
    this._width = width;
    this._height = height;
    this.label = scene.make.text({
      x: Math.round(width / 2),
      y: Math.round(height / 2) - 4,
      text: label,
      style: {
        color: TXT_COLOR,
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAM,
      },
    });
    this.label.x -= this.label.width / 2;
    this.label.y -= this.label.height / 2;
    this.background = scene.make.graphics({ x: 0, y: 0 });
    this.drawBackground();

    this.add([this.background, this.label]);
    this.setInteractive({
      useHandCursor: true,
      hitArea: new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });
    this.on("pointerover", () => {
      this.setFocus(true);
    });
    this.on("pointerout", () => {
      this.setFocus(false);
    });
  }

  setFocus(focus: boolean) {
    this.isFocused = focus;
    this.drawBackground();
  }

  drawBackground() {
    this.background.clear();
    const backgroundColor = this.isFocused ? 0xf2c64b : 0xffffff;
    this.background.lineStyle(2, 0x777777);
    this.background.fillStyle(backgroundColor, 1);
    this.background.fillRoundedRect(0, 0, this._width, this._height, 8);
    this.background.strokeRoundedRect(0, 0, this._width, this._height, 8);
  }

  setText(text: string) {
    this.label.setText(text);
    this.label.x = Math.round(this._width / 2 - this.label.width / 2);
    this.label.y = Math.round(this._height / 2 - (4 + this.label.height / 2));
  }
}
