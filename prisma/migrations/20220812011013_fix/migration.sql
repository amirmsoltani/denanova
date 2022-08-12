/*
  Warnings:

  - You are about to drop the `_PostFile` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `PostFile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "_PostFile_B_index";

-- DropIndex
DROP INDEX "_PostFile_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PostFile";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PostFile" (
    "fileId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'DEFAULT',

    PRIMARY KEY ("fileId", "postId", "type"),
    CONSTRAINT "PostFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PostFile_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PostFile" ("fileId", "postId", "type") SELECT "fileId", "postId", "type" FROM "PostFile";
DROP TABLE "PostFile";
ALTER TABLE "new_PostFile" RENAME TO "PostFile";
CREATE INDEX "PostFile_fileId_postId_idx" ON "PostFile"("fileId", "postId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
