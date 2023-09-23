// import { data, modifiedType } from "./prisma/seed";

// const d = {
//   genus: "Malus",
//   name: "Apple",
//   id: 6,
//   family: "Rosaceae",
//   order: "Rosales",
//   nutritions: {
//     carbohydrates: 11.4,
//     protein: 0.3,
//     fat: 0.4,
//     calories: 52,
//     sugar: 10.3,
//   },
// };
// // type typeD = typeof d;
// // type keys = keyof typeof d;

// // // console.log(typeD);
// // type neww = typeD & {
// //   nutritions: {
// //     fruitId: number;
// //   };
// // };
// // var abc: neww;

// const data1 = data.map((e) => ({
//   ...e,
//   nutritions: { ...e.nutritions, fruitId: e.id },
// }));
// const data2 = data.map((e: any) => {
//   const newObject = e;
//   newObject.nutritions.fruitId = e.id;
//   return e;
// });
// const nutritions = data1.map((e) => e.nutritions);

// console.log(nutritions);

// console.log(Number.isNaN(Number("2020")));
console.log(Number("12.33.12"));
