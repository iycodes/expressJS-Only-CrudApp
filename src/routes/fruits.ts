import { Prisma, fruit } from "@prisma/client";
import { Router } from "express";
import {
  BadRequestError,
  MyCustomError,
  NotFoundError,
} from "../middlewares/myErrorHandler";
import { prisma, server } from "../server";
import { allFruitsPage, createFruitPage, fruitPage } from "./htmlPages";

export const router = Router();
router.get("/", (req, res) => res.send("api is active"));
router.get("/all_fruits", async (req, res) => {
  const all = await prisma.fruit.findMany({
    include: {
      nutritions: true,
    },
  });
  // return res.status(200).send({
  //   data: all,
  // });
  return res.status(200).send(allFruitsPage(all as Array<fruitType2>));
});

router.get("/fruit/:id", async (req, res) => {
  // console.log(`id =>> ${req.params.id}`);
  const trimmed = req.params.id.trim();
  if (trimmed == "") {
    throw new BadRequestError({
      message: "Id of the specified fruit is required",
      shouldLog: true,
    });
  } else if (Number.isNaN(Number(trimmed))) {
    throw new BadRequestError({
      message: "Invalid Fruit Id",
      shouldLog: true,
    });
  }
  let fruitObject;
  try {
    fruitObject = await prisma.fruit.findUnique({
      where: {
        id: Number(trimmed),
      },
      include: {
        nutritions: true,
      },
    });
    if (fruitObject == null) {
      throw new NotFoundError({
        message: "Fruit not found!",
        shouldLog: true,
      });
    }
    // res.status(200).send({
    //   data: fruitObject,
    // });
    res.status(200).send(fruitPage(fruitObject as fruitType2));
  } catch (error) {
    throw new NotFoundError({
      message: "Fruit not foundeeee!",
      shouldLog: true,
    });
  } finally {
  }
});
router.get("/create_fruit", (req, res) => {
  res.send(createFruitPage());
});
router.post<{
  Body: fruitType2;
}>("/add_fruit", async (req, res) => {
  console.log(req.body);
  if (isObjectEmpty(req.body)) {
    throw new BadRequestError({
      message: "The request Body is empty",
      shouldLog: true,
    });
  }
  const nutrition = extractNutrition(req.body);
  const data = removeNutrition(req.body);

  try {
    await prisma.fruit.create({
      data,
    });
    await prisma.nutritions.create({
      data: nutrition,
    });
    res.status(200).send("added sucessfully");
  } catch (error) {
    handlePrismaErrors(error as Error, "Something went Wrong");
  }
});

router.delete("/delete_fruit/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.params);
  id = req.params.id.trim();
  if (id == "") {
    throw new BadRequestError({
      message: "Id of the specified fruit is required",
      shouldLog: true,
    });
  } else if (Number.isNaN(Number(id))) {
    throw new BadRequestError({
      message: "Invalid Fruit Id",
      shouldLog: true,
    });
  }
  let d;
  try {
    d = await prisma.fruit.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(d);
    res.status(204).send();
  } catch (error) {
    console.log("err", error);
    handlePrismaErrors(
      error as Error,
      "Internal Server Error, was unable to delete for some reason,"
    );
  }
});

router.put<{
  Body: fruit;
}>("/update_fruit", async (req, res) => {
  const id = req.body.id;
  // console.log(req.body);
  if (isObjectEmpty(req.body)) {
    throw new BadRequestError({
      message: "The request Body is empty",
      shouldLog: true,
    });
  }
  const nutrition = extractNutrition(req.body);
  console.log(nutrition);
  const data = removeNutrition(req.body);
  console.log(data);
  try {
    await prisma.fruit.update({
      where: {
        id,
      },
      data,
    });
    await prisma.nutritions.update({
      where: {
        fruitId: id,
      },
      data: nutrition,
    });
    res.status(200).send("updated sucessfully");
  } catch (error) {
    handlePrismaErrors(error as Error, "Internal Sever Error");
  }
});

// Functions

function handlePrismaErrors(error: Error, customMsg: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code == "P2025") {
      throw new NotFoundError({
        message: "Data doesn't exist on the server",
        shouldLog: true,
      });
    }
    if (error.code === "P2002")
      throw new MyCustomError({
        code: 409,
        message: "data already exists",
        context: {
          fullError: error.message,
        },
        shouldLog: true,
      });
  }
  throw new MyCustomError({
    message: customMsg,
    code: 500,
    context: {
      fullError: JSON.stringify(error),
    },
    shouldLog: true,
  });
}
const isObjectEmpty = (obj: fruitType2): boolean => {
  return Object.keys(obj).length === 0;
};
const extractNutrition = (data: fruitType2): nutritionType => ({
  ...data.nutritions,
  fruitId: data.id,
});
const removeNutrition = (data: fruitType): fruitOnly => {
  delete data.nutritions;
  return data;
};
export const extractNutritions = (data: Array<any>): Array<nutritionType> =>
  data.map((e) => extractNutrition(e));

export const removeNutritions = (data: Array<fruitType>) =>
  data.map((e) => removeNutrition(e));

//Types
export interface fruitOnly {
  genus: string;
  name: string;
  id: number;
  family: string;
  order: string;
}
export type fruitType = {
  genus: string;
  name: string;
  id: number;
  family: string;
  order: string;
  nutritions?: {
    carbohydrates: number;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
  };
};
export type fruitType2 = fruitType & {
  nutritions: {
    carbohydrates: number;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
  };
};

export interface nutritionType {
  carbohydrates: number;
  protein: number;
  fat: number;
  calories: number;
  sugar: number;
  fruitId: number;
}

// prisma errors
// data not found in databse p2005
// unique constraints failed , eg id or unique field already exists

const a = {
  genus: "Malus",
  name: "Apple",
  id: 6,
  family: "Rosaceae",
  order: "Rosales",
  nutritions: {
    carbohydrates: 11.4,
    protein: 0.3,
    fat: 0.4,
    calories: 52,
    sugar: 10.3,
  },
};
