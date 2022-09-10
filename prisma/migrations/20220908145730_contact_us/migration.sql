/*
  Warnings:

  - You are about to drop the `ContantUs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ContantUs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "Content" TEXT NOT NULL
);
