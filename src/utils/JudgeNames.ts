const LIST_OF_NAMES = [
  "Mary",
  "Linda",
  "Susan",
  "Karen",
  "Vera",
  "Grace",
  "Jane",
  "Shirley",
  "Betty",
  "Barbara",
  "Debra",
  "Nancy",
  "Cynthia",
  "Kathleen",
  "Brenda",
  "Susan",
  "Margaret",
  "Dorothy",
  "Ingrid",
  "Ava",
  "Edith",
  "Esther",
];

const getJudgeName = () =>
  Phaser.Utils.Array.GetRandom(LIST_OF_NAMES) as string;

export default getJudgeName;
