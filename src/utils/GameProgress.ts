import DisplayElement from "sprites/DisplayElement";
import { OptionId, Options } from "./ElementData";
import getJudgeName from "./JudgeNames";
import TileGrid from "./TileGrid";

type Judge = {
  name: string;
  prefs: Judgement[];
};

type Judgement = (
  grid: TileGrid,
  elements: DisplayElement[]
) => {
  scoreAdjustment: number;
  message: string;
  priority: number;
  key: string;
};

const getTypeName = (type: OptionId) =>
  Options.find((option) => option.uuid === type)?.name;

const wantsToSeeEnoughOf =
  (type: OptionId, amount: number) =>
  (_: TileGrid, elements: DisplayElement[]) => {
    const count = elements.filter((e) => e.getType() === type).length;
    const key = `wants-${amount}-${type}`;
    if (count >= amount) {
      return {
        scoreAdjustment: 1,
        message: `Great to see enough ${getTypeName(type)}`,
        priority: 3,
        key,
      };
    } else {
      return {
        scoreAdjustment: -1,
        message: `I'd really like to see more ${getTypeName(type)}`,
        priority: 5,
        key,
      };
    }
  };

const lovesToSee =
  (type: OptionId) => (_: TileGrid, elements: DisplayElement[]) => {
    const count = elements.filter((e) => e.getType() === type).length;
    const key = `loves-${type}`;
    if (count) {
      return {
        scoreAdjustment: 2,
        message: `For me, having a ${getTypeName(type)} is perfect`,
        priority: 5,
        key,
      };
    } else {
      return {
        scoreAdjustment: -2,
        message: `Without a ${getTypeName(type)}, I'm just going to pass`,
        priority: 1,
        key,
      };
    }
  };

const hatesToSee =
  (type: OptionId) => (_: TileGrid, elements: DisplayElement[]) => {
    const count = elements.filter((e) => e.getType() === type).length;
    const key = `hates-${type}`;
    if (count) {
      return {
        scoreAdjustment: -2,
        message: `Including a ${getTypeName(type)} is just not Im looking for`,
        priority: 5,
        key,
      };
    } else {
      return {
        scoreAdjustment: 2,
        message: `You dodged adding a ${getTypeName(type)}. Well done.`,
        priority: 1,
        key,
      };
    }
  };

const optionsForEnoughOf: OptionId[] = [
  "small_pumpkin",
  "large_pumpkin",
  "red_apple",
  "wheat_sheaf",
  "green_apple",
  "autumnal_leaves",
  "small_mixed_flowers",
  "small_red_flowers",
  "small_yellow_flowers",
  "pears",
  "carrots",
  "corn",
];

const optionsForLoveHate: OptionId[] = [
  "giant_pumpkin",
  "cartwheel",
  "cornocopia",
  "large_mixed_flowers",
  "large_red_flowers",
  "large_yellow_flowers",
];

export default class GameProgess {
  private year: number = 1;
  private judges: Judge[];
  private seenMessages: string[] = [];

  constructor() {
    const names: string[] = [];
    while (names.length < 3) {
      const randomName = getJudgeName();
      if (!names.includes(randomName)) {
        names.push(randomName);
      }
    }
    const preferredTypes: OptionId[] = [];
    while (preferredTypes.length < 3) {
      const randomType = Phaser.Utils.Array.GetRandom(
        optionsForEnoughOf
      ) as OptionId;
      if (!preferredTypes.includes(randomType)) {
        preferredTypes.push(randomType);
      }
    }
    const polarTypes: OptionId[] = [];
    while (polarTypes.length < 3) {
      const randomType = Phaser.Utils.Array.GetRandom(
        optionsForLoveHate
      ) as OptionId;
      if (!polarTypes.includes(randomType)) {
        polarTypes.push(randomType);
      }
    }
    this.judges = names.map((name) => {
      const lovesOrHates = Math.random() > 0.5;
      return {
        name,
        prefs: [
          wantsToSeeEnoughOf(preferredTypes.pop()!, Phaser.Math.Between(2, 3)),
          lovesOrHates
            ? lovesToSee(polarTypes.pop()!)
            : hatesToSee(polarTypes.pop()!),
        ],
      };
    });
  }

  advanceOneYear() {
    this.year += 1;
    if (this.year > 10) {
      return false;
    }
    return true;
  }

  getCurrentYear() {
    return this.year;
  }

  getJudges() {
    return this.judges;
  }

  addMessageKeys(messageKeys: string[]) {
    messageKeys.forEach((key) => {
      if (!this.seenMessages.includes(key)) {
        this.seenMessages.push(key);
      }
    });
  }

  hasSeenMessage(key: string) {
    return this.seenMessages.includes(key);
  }

  getSeenMessages() {
    return this.seenMessages;
  }
}
