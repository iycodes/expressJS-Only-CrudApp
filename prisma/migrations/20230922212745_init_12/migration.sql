-- DropForeignKey
ALTER TABLE "nutritions" DROP CONSTRAINT "nutritions_fruitId_fkey";

-- AddForeignKey
ALTER TABLE "nutritions" ADD CONSTRAINT "nutritions_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "fruit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
