import Phaser from "phaser";
import Scenes from "@scenes";
import { TXT_COLOR } from "config";

export default class Game extends Phaser.Scene {
  private grid: boolean[][];

  constructor() {
    super(Scenes.GAME);
    this.grid = new Array(3).fill(new Array(9).fill(false));
  }

  create() {
    this.add
      .text(210, 290, `Submit to judges`, {
        color: TXT_COLOR,
        fontSize: "24px",
        fontFamily: "KenneyMiniSquare",
      })
      .setOrigin(0);

    const TILE_SIZE = 50;
    const TILE_GAP = 10;
    this.grid.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        this.add
          .rectangle(
            50 + columnIndex * (TILE_SIZE + TILE_GAP),
            100 + rowIndex * (TILE_SIZE + TILE_GAP),
            TILE_SIZE,
            TILE_SIZE,
            0x333333,
            0.2
          )
          .setOrigin(0);
      });
    });
  }

  update() {}
}
