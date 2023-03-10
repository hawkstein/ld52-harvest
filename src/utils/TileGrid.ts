const ROWS = 3;
const COLUMNS = 9;
const LEFT_POS = 120;
const TOP_POS = 160;
const TILE_SIZE = 50;

export default class TileGrid {
  public tiles: number[][];

  constructor() {
    const column = new Array(ROWS).fill(0);
    this.tiles = Array.from({ length: COLUMNS }).map(() => [...column]);
  }

  scenePosToGrid(x: number, y: number) {
    return [
      Math.round((x - LEFT_POS) / TILE_SIZE),
      Math.round((y - TOP_POS - TILE_SIZE) / TILE_SIZE),
    ];
  }

  gridPosToScene(x: number, y: number) {
    return [LEFT_POS + x * TILE_SIZE, TOP_POS + y * TILE_SIZE + TILE_SIZE];
  }

  snapPositionToGrid(x: number, y: number) {
    const [gridX, gridY] = this.scenePosToGrid(x, y);
    return this.gridPosToScene(gridX, gridY);
  }

  areTilesEmpty(xPos: number, yPos: number, xLength: number, uuid: number) {
    const [xGrid, yGrid] = this.scenePosToGrid(xPos, yPos);
    let isEmpty = true;
    for (let xIndex = xGrid; xIndex < xGrid + xLength; xIndex++) {
      if (
        xIndex >= 0 &&
        xIndex < this.tiles.length &&
        yGrid >= 0 &&
        yGrid < this.tiles[xIndex].length
      ) {
        isEmpty =
          isEmpty &&
          (this.tiles[xIndex][yGrid] === 0 ||
            this.tiles[xIndex][yGrid] === uuid);
      } else {
        isEmpty = false;
      }
    }
    return isEmpty;
  }

  fillGrid(xPos: number, yPos: number, length: number, fill: number) {
    const [xGrid, yGrid] = this.scenePosToGrid(xPos, yPos);
    for (let xIndex = xGrid; xIndex < xGrid + length; xIndex++) {
      if (
        xIndex >= 0 &&
        xIndex < this.tiles.length &&
        yGrid >= 0 &&
        yGrid < this.tiles[xIndex].length
      ) {
        this.tiles[xIndex][yGrid] = fill;
      }
    }
  }

  getWorldPos() {
    return [LEFT_POS, TOP_POS];
  }

  getTileSize() {
    return TILE_SIZE;
  }
}
