import Scenes from "@scenes";
import { MenuButton } from "sprites/MenuButton";
import Phaser from "phaser";

export default class StartMenu {
  private scene: Phaser.Scene;
  private x: number;
  private y: number;
  //private buttons: MenuButton[] = [];
  //private currentIndex: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    /**
     * Add buttons to a "tabIndex" [x]
     * Store currently focused button index [x]
     * Navigate focus via arrow keys, tab key (and mouse)
     * Select via enter & space (and click)
     */
  }

  build() {
    this.buildButton("Play", this.y, () => {
      this.scene.scene.start(Scenes.YEAR_INTRO);
    });
    //this.buildButton("Options", this.y, Scenes.OPTIONS);
    //this.buildButton("Credits", this.y, Scenes.CREDITS);
  }

  private buildButton(label: string, y: number, onClick: () => void) {
    new MenuButton({
      scene: this.scene,
      x: this.x,
      y,
      label,
      onClick,
    });
    // button.on("pointerover", () => {
    //   if (button.menuIndex !== undefined) {
    //     this.currentIndex = button.menuIndex;
    //   }
    // });
    // button.menuIndex = this.buttons.push(button) - 1;
    this.y += 50;
  }
}
