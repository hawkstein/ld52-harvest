import Phaser from "phaser";
import Scenes from "@scenes";
import DisplayElement from "sprites/DisplayElement";
import TileGrid from "@utils/TileGrid";
import { FADE_LENGTH, TXT_COLOR } from "config";
import { ElementOption, Options } from "@utils/ElementData";

type GameState = "building" | "judging";

export default class Game extends Phaser.Scene {
  private grid: TileGrid = new TileGrid();
  private elements: DisplayElement[] = [];

  private submitText?: Phaser.GameObjects.Text;
  private removeText?: Phaser.GameObjects.Text;
  private gameState: GameState = "building";

  constructor() {
    super(Scenes.GAME);
  }

  init() {
    console.log("Scene initialising");
    this.events.once("start", () => {
      console.log("Scene starting...");
      this.gameState = "building";
      this.grid = new TileGrid();
      this.elements = [];
    });

    this.events.once("destroy", () => {
      console.log("Destroying scene...");
    });

    this.events.once("shutdown", () => {
      const HUD = this.scene.get(Scenes.HUD);
      HUD.events.off("add_element");
    });
  }

  create() {
    console.log("Scene creating...");
    this.submitText = this.add
      .text(220, 330, `Submit to judges`, {
        color: TXT_COLOR,
        fontSize: "24px",
        fontFamily: "KenneyMiniSquare",
      })
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });

    const [LEFT, TOP] = this.grid.getWorldPos();
    const TILE_SIZE = this.grid.getTileSize();
    const TILE_GAP = 4;
    this.grid.tiles.forEach((column, columnIndex) => {
      column.forEach((_, rowIndex) => {
        this.add
          .rectangle(
            LEFT + TILE_GAP + columnIndex * TILE_SIZE,
            TOP + TILE_GAP + rowIndex * TILE_SIZE,
            TILE_SIZE - TILE_GAP * 2,
            TILE_SIZE - TILE_GAP * 2,
            0x333333,
            0.2
          )
          .setOrigin(0);
      });
    });

    this.removeText = this.add
      .text(400, 10, `Drag here to remove`, {
        color: TXT_COLOR,
        fontSize: "24px",
        fontFamily: "KenneyMiniSquare",
      })
      .setOrigin(0);

    const HUD = this.scene.get(Scenes.HUD);
    HUD.events.on("add_element", ({ size, colour, uuid }: ElementOption) => {
      const newElement = new DisplayElement(
        this,
        this.grid,
        this.cameras.main.centerX - (TILE_SIZE * size) / 2,
        TOP - 10,
        size,
        colour,
        uuid
      );
      newElement.on("remove_element", ({ id }: { id: number }) => {
        const elementIndex = this.elements.findIndex(
          (displayElement) => displayElement.getId() === id
        );
        const sprite = this.elements[elementIndex];
        this.elements.splice(elementIndex, 1);
        sprite.destroy();
      });
      this.elements.push(newElement);
    });

    this.addListenersToObjects();

    this.cameras.main.fadeFrom(FADE_LENGTH, 245, 229, 184);
  }

  addListenersToObjects() {
    this.submitText?.on("pointerdown", () => {
      console.table(
        this.elements.map((sprite) => {
          return {
            type: Options.find((option) => option.uuid === sprite.getType())
              ?.uuid,
          };
        })
      );
      this.gameState = "judging";
      const HUD = this.scene.get(Scenes.HUD);
      this.tweens.add({
        targets: [HUD.cameras.main, this.submitText, this.removeText],
        alpha: 0,
        duration: FADE_LENGTH,
        onComplete: () => {
          this.scene.pause(Scenes.HUD);
        },
      });
      this.cameras.main.pan(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 60,
        600,
        "Back.easeInOut"
      );
      this.scene.launch(Scenes.JUDGES);
    });
  }

  removeListenersFromObjects() {
    this.submitText?.off("pointerdown");
  }
}
