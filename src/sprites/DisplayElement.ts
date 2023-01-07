import TileGrid from "@utils/TileGrid";

const TILE_SIZE = 50;

let uuid = 1;

export default class DisplayElement extends Phaser.GameObjects.Rectangle {
  private originalPos: { x: number; y: number };
  private id: number = uuid++;

  constructor(
    scene: Phaser.Scene,
    grid: TileGrid,
    x: number,
    y: number,
    size: number,
    color: number
  ) {
    const pixelWidth = TILE_SIZE * size;
    super(scene, x, y, pixelWidth, pixelWidth, color);
    this.setOrigin(0, 1);
    this.setDepth(1000);
    this.scene.add.existing(this);
    this.setInteractive({ useHandCursor: true });
    grid.fillGrid(this.x, this.y, size, this.id);
    this.originalPos = { x: this.x, y: this.y };
    this.scene.input.setDraggable(this);
    this.scene.input.on(
      "dragstart",
      (_: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        if (gameObject !== this) {
          return;
        }
        this.originalPos = { x: this.x, y: this.y };
        this.setDepth(1000);
      }
    );
    this.scene.input.on(
      "drag",
      (
        _: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject,
        dragX: number,
        dragY: number
      ) => {
        if (gameObject !== this) {
          return;
        }
        this.x = dragX;
        this.y = dragY;
      }
    );
    this.scene.input.on(
      "dragend",
      (_: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        if (gameObject !== this) {
          return;
        }
        if (grid.areTilesEmpty(this.x, this.y, size, this.id)) {
          grid.fillGrid(this.originalPos.x, this.originalPos.y, size, 0);
          const [xPos, yPos] = grid.snapPositionToGrid(this.x, this.y);
          this.x = xPos;
          this.y = yPos;
          grid.fillGrid(this.x, this.y, size, this.id);
        } else {
          this.x = this.originalPos.x;
          this.y = this.originalPos.y;
        }
        this.setDepth(this.y);
      }
    );
  }
}
