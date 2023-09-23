-- CreateTable
CREATE TABLE "fruit" (
    "id" INTEGER NOT NULL,
    "genus" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "order" TEXT NOT NULL,

    CONSTRAINT "fruit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutritions" (
    "fruitId" INTEGER NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "calories" INTEGER NOT NULL,
    "sugar" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "nutritions_pkey" PRIMARY KEY ("fruitId")
);

-- AddForeignKey
ALTER TABLE "nutritions" ADD CONSTRAINT "nutritions_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "fruit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
