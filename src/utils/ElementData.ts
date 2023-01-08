export type OptionId =
  | "small_pumpkin"
  | "large_pumpkin"
  | "giant_pumpkin"
  | "red_apple"
  | "green_apple"
  | "cartwheel"
  | "wheat_sheaf"
  | "cornucopia"
  | "autumnal_leaves"
  | "large_mixed_flowers"
  | "small_mixed_flowers"
  | "large_red_flowers"
  | "small_red_flowers"
  | "large_yellow_flowers"
  | "small_yellow_flowers"
  | "pears"
  | "carrots"
  | "corn";

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
  { name: "Cartwheel", uuid: "cartwheel", colour: 0x3ea308, size: 3 },
  { name: "Wheat Sheaf", uuid: "wheat_sheaf", colour: 0x3ea308, size: 2 },
  { name: "Cornucopia", uuid: "cornucopia", colour: 0x3ea308, size: 2 },
  {
    name: "Autumnal Leaves",
    uuid: "autumnal_leaves",
    colour: 0x3ea308,
    size: 2,
  },
  {
    name: "Large Mixed Flowers",
    uuid: "large_mixed_flowers",
    colour: 0x3ea308,
    size: 2,
  },
  {
    name: "Small Mixed Flowers",
    uuid: "small_mixed_flowers",
    colour: 0x3ea308,
    size: 1,
  },
  {
    name: "Large Red Flowers",
    uuid: "large_red_flowers",
    colour: 0x3ea308,
    size: 2,
  },
  {
    name: "Small Red Flowers",
    uuid: "small_red_flowers",
    colour: 0x3ea308,
    size: 1,
  },
  {
    name: "Large Yellow Flowers",
    uuid: "large_yellow_flowers",
    colour: 0x3ea308,
    size: 2,
  },
  {
    name: "Small Yellow Flowers",
    uuid: "small_yellow_flowers",
    colour: 0x3ea308,
    size: 1,
  },
  {
    name: "Pears",
    uuid: "pears",
    colour: 0x3ea308,
    size: 1,
  },
  {
    name: "Carrots",
    uuid: "carrots",
    colour: 0x3ea308,
    size: 1,
  },
  {
    name: "Corn",
    uuid: "corn",
    colour: 0x3ea308,
    size: 1,
  },
];
