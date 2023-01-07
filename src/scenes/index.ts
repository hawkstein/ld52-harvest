const Scenes = {
  PRELOAD: "PRELOAD",
  START: "START",
  OPTIONS: "OPTIONS",
  CREDITS: "CREDITS",
  GAME: "GAME",
  HUD: "HUD",
  LEVEL_COMPLETE: "LEVEL_COMPLETE",
  END: "END",
} as const;

export type SceneKey = keyof typeof Scenes;

export default Scenes;
