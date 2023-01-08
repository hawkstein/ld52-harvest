const Scenes = {
  PRELOAD: "PRELOAD",
  START: "START",
  OPTIONS: "OPTIONS",
  CREDITS: "CREDITS",
  YEAR_INTRO: "YEAR_INTRO",
  YEAR_SCORES: "YEAR_SCORES",
  GAME: "GAME",
  HUD: "HUD",
  JUDGES: "JUDGES",
  GAME_END: "GAME_END",
} as const;

export type SceneKey = keyof typeof Scenes;

export default Scenes;
