import getJudgeName from "./JudgeNames";

type Judge = {
  name: string;
};

export default class GameProgess {
  private year: number = 1;
  private judges: Judge[];

  constructor() {
    const names: string[] = [];
    while (names.length < 3) {
      const randomName = getJudgeName();
      if (!names.includes(randomName)) {
        names.push(randomName);
      }
    }
    this.judges = names.map((name) => ({ name }));
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
}
