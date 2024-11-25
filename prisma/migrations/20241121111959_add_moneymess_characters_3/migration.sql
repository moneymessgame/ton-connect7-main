/*
  Warnings:

  - You are about to drop the column `firstname` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
