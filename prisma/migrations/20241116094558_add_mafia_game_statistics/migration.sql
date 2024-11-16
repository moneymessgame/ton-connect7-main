/*
  Warnings:

  - You are about to drop the column `clubCity` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `clubName` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `judgeId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `judgeName` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `votes` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `clubCity` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `clubId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `clubName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `clubCity` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `clubName` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `games` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Player_email_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "clubCity",
DROP COLUMN "clubName",
DROP COLUMN "judgeId",
DROP COLUMN "judgeName",
DROP COLUMN "votes";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "birthday",
DROP COLUMN "clubCity",
DROP COLUMN "clubId",
DROP COLUMN "clubName",
DROP COLUMN "country",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "roles",
DROP COLUMN "sex",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "clubCity",
DROP COLUMN "clubName",
DROP COLUMN "games";

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Judge" (
    "id" SERIAL NOT NULL,
    "playerId" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Judge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToJudge" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameToRating" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlayerToRole" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClubToRating" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClubToPlayer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToJudge_AB_unique" ON "_GameToJudge"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToJudge_B_index" ON "_GameToJudge"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToRating_AB_unique" ON "_GameToRating"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToRating_B_index" ON "_GameToRating"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToRole_AB_unique" ON "_PlayerToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToRole_B_index" ON "_PlayerToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToRating_AB_unique" ON "_ClubToRating"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToRating_B_index" ON "_ClubToRating"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToPlayer_AB_unique" ON "_ClubToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToPlayer_B_index" ON "_ClubToPlayer"("B");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToJudge" ADD CONSTRAINT "_GameToJudge_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToJudge" ADD CONSTRAINT "_GameToJudge_B_fkey" FOREIGN KEY ("B") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToRating" ADD CONSTRAINT "_GameToRating_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToRating" ADD CONSTRAINT "_GameToRating_B_fkey" FOREIGN KEY ("B") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToRole" ADD CONSTRAINT "_PlayerToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToRole" ADD CONSTRAINT "_PlayerToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToRating" ADD CONSTRAINT "_ClubToRating_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToRating" ADD CONSTRAINT "_ClubToRating_B_fkey" FOREIGN KEY ("B") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToPlayer" ADD CONSTRAINT "_ClubToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToPlayer" ADD CONSTRAINT "_ClubToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
