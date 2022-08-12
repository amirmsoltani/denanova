/*
  Warnings:

  - You are about to drop the `_FileToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FileToPost";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_PostFile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostFile_A_fkey" FOREIGN KEY ("A") REFERENCES "File" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostFile_B_fkey" FOREIGN KEY ("B") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostFile_AB_unique" ON "_PostFile"("A", "B");

-- CreateIndex
CREATE INDEX "_PostFile_B_index" ON "_PostFile"("B");
