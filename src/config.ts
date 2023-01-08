import Phaser from "phaser";

export const BG_COLOR = "#f5e5b8";
export const TXT_COLOR = "#000";
export const FONT_SIZE = "24px";
export const FONT_FAM = "KenneyMiniSquare";

export const FADE_LENGTH = 1000; //1000 default

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: BG_COLOR,
  scale: {
    width: 690,
    height: 390,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
};
