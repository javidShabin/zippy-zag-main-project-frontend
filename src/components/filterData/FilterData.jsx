// Ensure "../../assets" correctly exports these items.

import {
  biriyani,
  burger,
  iceCream,
  juice,
  mojito,
  pasta,
  sandwich,
} from "../../assets";

const filterData = [
  {
    id: 1,
    name: "Biryani",
    imageSrc: biriyani,
    category: "Biryani", // Fixed typo: "Biriyani" to "Biryani" (if needed).
  },
  {
    id: 2,
    name: "Burger",
    imageSrc: burger,
    category: "Burger",
  },
  {
    id: 3,
    name: "Sandwich",
    imageSrc: sandwich,
    category: "Sandwich",
  },
  {
    id: 4,
    name: "Juice",
    imageSrc: juice,
    category: "Juice",
  },
  {
    id: 5,
    name: "Pasta",
    imageSrc: pasta,
    category: "Pasta",
  },
  {
    id: 6,
    name: "Mojito",
    imageSrc: mojito,
    category: "Mojito",
  },
  {
    id: 7,
    name: "Ice cream",
    imageSrc: iceCream,
    category: "Ice Cream", // Fixed typo: "Ice creami" to "Ice Cream".
  },
];

export { filterData };
