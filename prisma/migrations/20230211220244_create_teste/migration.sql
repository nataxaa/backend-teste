/*
  Warnings:

  - The primary key for the `Artigo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Artigo` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artigo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Artigo" ("id", "image", "name", "url") SELECT "id", "image", "name", "url" FROM "Artigo";
DROP TABLE "Artigo";
ALTER TABLE "new_Artigo" RENAME TO "Artigo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
