/*
  Warnings:

  - You are about to drop the column `rarity` on the `Character` table. All the data in the column will be lost.
  - Added the required column `rarityId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "rarity",
ADD COLUMN     "rarityId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Rarity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
