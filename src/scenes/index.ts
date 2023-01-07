const Scenes = {
  PRELOAD: "PRELOAD",
  START: "START",
  OPTIONS: "OPTIONS",
  CREDITS: "CREDITS",
  YEAR_INTRO: "YEAR_INTRO",
  GAME: "GAME",
  HUD: "HUD",
  JUDGES: "JUDGES",
  END: "END",
} as const;

export type SceneKey = keyof typeof Scenes;

export default Scenes;
