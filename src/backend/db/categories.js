import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "FPS"
  },
  {
    _id: uuid(),
    categoryName: "TPS"
  },
  {
    _id: uuid(),
    categoryName: "RPG"
  },
  {
    _id: uuid(),
    categoryName: "Action-Adventure"
  },
  {
    _id: uuid(),
    categoryName: "Real-time strategy"
  }
];
