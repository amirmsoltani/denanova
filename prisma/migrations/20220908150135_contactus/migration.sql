/*
  Warnings:

  - You are about to drop the column `Content` on the `ContactUs` table. All the data in the column will be lost.
  - Added the required column `content` to the `ContactUs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactUs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "content" TEXT NOT NULL
);
INSERT INTO "new_ContactUs" ("createAt", "email", "fullName", "id", "read", "subject") SELECT "createAt", "email", "fullName", "id", "read", "subject" FROM "ContactUs";
DROP TABLE "ContactUs";
ALTER TABLE "new_ContactUs" RENAME TO "ContactUs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
