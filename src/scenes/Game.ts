import Phaser from "phaser";
import Scenes from "@scenes";
import DisplayElement from "sprites/DisplayElement";
import TileGrid from "@utils/TileGrid";
// import { TXT_COLOR } from "config";

export default class Game extends Phaser.Scene {
  private grid: TileGrid = new TileGrid();

  constructor() {
    super(Scenes.GAME);
  }

  create() {
    // this.add
    //   .text(210, 290, `Submit to judges`, {
    //     color: TXT_COLOR,
    //     fontSize: "24px",
    //     fontFamily: "KenneyMiniSquare",
    //   })
    //   .setOrigin(0);
    const LEFT = 100;
    const TOP = 100;
    const TILE_SIZE = 50;
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

    new DisplayElement(this, this.grid, 0, 0, 2, 0xff2222);
    new DisplayElement(this, this.grid, 2, 2, 2, 0x002222);
  }

  update() {}
}
