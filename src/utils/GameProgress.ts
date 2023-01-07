type Judge = {
  name: string;
};

export default class GameProgess {
  private year: number = 1;
  private judges: Judge[];

  constructor() {
    this.judges = [];
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
