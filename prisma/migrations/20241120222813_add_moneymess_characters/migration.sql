-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "nickname" TEXT,
    "src" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
