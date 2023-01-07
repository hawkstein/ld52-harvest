import Phaser from "phaser";
import { getOption } from "data";

const playSound = (sound: Phaser.Sound.BaseSound) => {
  const sfx = getOption("sfx");
  if (sfx) {
    sound.play();
  }
};

export { playSound };
