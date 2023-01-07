export type OptionId =
  | "small_pumpkin"
  | "large_pumpkin"
  | "giant_pumpkin"
  | "red_apple"
  | "green_apple";

export type ElementOption = {
  name: string;
  colour: number;
  size: number;
  uuid: OptionId;
};

export const Options: ElementOption[] = [
  { name: "Small Pumpkin", uuid: "small_pumpkin", colour: 0xf5a825, size: 1 },
  { name: "Large Pumpkin", uuid: "large_pumpkin", colour: 0xf58c25, size: 2 },
  { name: "Giant Pumpkin", uuid: "giant_pumpkin", colour: 0xc95019, size: 3 },
  { name: "Red Apple", uuid: "red_apple", colour: 0xde330d, size: 1 },
  { name: "Green Apple", uuid: "green_apple", colour: 0x3ea308, size: 1 },
];
