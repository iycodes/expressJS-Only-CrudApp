/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `fruit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fruit_name_key" ON "fruit"("name");
