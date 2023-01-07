import Phaser from "phaser";

export const BG_COLOR = "#f5e5b8";
export const TXT_COLOR = "#000";

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: BG_COLOR,
  scale: {
    width: 640,
    height: 340,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
};
