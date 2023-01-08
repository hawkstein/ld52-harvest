import Phaser from "phaser";
import config from "./config";
import Preload from "@scenes/Preload";
import Game from "@scenes/Game";
import HUD from "@scenes/Hud";
import GameEnd from "@scenes/GameEnd";
import Start from "@scenes/Start";
import Options from "@scenes/Options";
import Credits from "@scenes/Credits";
import YearIntro from "@scenes/YearIntro";
import Judges from "@scenes/Judges";
import YearScores from "@scenes/YearScores";

new Phaser.Game(
  Object.assign(config, {
    scene: [
      Preload,
      Start,
      Options,
      YearIntro,
      Game,
      HUD,
      Judges,
      YearScores,
      GameEnd,
      Credits,
    ],
  })
);
