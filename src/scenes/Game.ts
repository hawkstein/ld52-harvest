import Phaser from "phaser";
import Scenes from "@scenes";
import { TXT_COLOR } from "config";

export default class Game extends Phaser.Scene {
  private grid: boolean[][];
  private originalPos?: { x: number; y: number };

  constructor() {
    super(Scenes.GAME);
    this.grid = new Array(3).fill(new Array(9).fill(true));
  }

  create() {
    // this.add
    //   .text(210, 290, `Submit to judges`, {
    //     color: TXT_COLOR,
    //     fontSize: "24px",
    //     fontFamily: "KenneyMiniSquare",
    //   })
    //   .setOrigin(0);

    const TILE_SIZE = 50;
    const TILE_GAP = 10;
    this.grid.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        this.add
          .rectangle(
            columnIndex * (TILE_SIZE + TILE_GAP),
            rowIndex * (TILE_SIZE + TILE_GAP),
            TILE_SIZE,
            TILE_SIZE,
            0x333333,
            0.2
          )
          .setOrigin(0);
      });
    });

    const element = this.add
      .rectangle(200, 100, TILE_SIZE, TILE_SIZE, 0xff2222)
      .setOrigin(0);
    element.setInteractive({ useHandCursor: true });
    this.input.setDraggable(element);
    this.input.on(
      "dragstart",
      (_: Phaser.Input.Pointer, __: Phaser.GameObjects.GameObject) => {
        const gridX = Math.round(element.x / TILE_AREA);
        const gridY = Math.round(element.y / TILE_AREA);
        this.grid[gridY][gridX] = true;
        this.originalPos = { x: element.x, y: element.y };
      }
    );
    this.input.on(
      "drag",
      (
        _: Phaser.Input.Pointer,
        __: Phaser.GameObjects.GameObject,
        dragX: number,
        dragY: number
      ) => {
        element.x = dragX;
        element.y = dragY;
      }
    );
    const TILE_AREA = TILE_SIZE + TILE_GAP;
    this.input.on(
      "dragend",
      (_: Phaser.Input.Pointer, __: Phaser.GameObjects.GameObject) => {
        const gridX = Math.round(element.x / TILE_AREA);
        const gridY = Math.round(element.y / TILE_AREA);
        if (
          gridY >= 0 &&
          gridY <= 2 &&
          gridX >= 0 &&
          gridX <= 8 &&
          this.grid[gridY][gridX]
        ) {
          element.x = gridX * TILE_AREA;
          element.y = gridY * TILE_AREA;
          this.grid[gridY][gridX] = false;
        } else {
          element.x = this.originalPos?.x ?? 0;
          element.y = this.originalPos?.y ?? 0;
        }
      }
    );
  }

  update() {}
}
