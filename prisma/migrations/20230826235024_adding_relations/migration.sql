/*
  Warnings:

  - The values [SubTask,Epic,Theme,Activity,Plan,Annotation] on the enum `EntryType` will be removed. If these variants are still used in the database, this will fail.
  - The values [InProgress,Blocked] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `next` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `recur` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `repeat` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nodeId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nodeId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EntryType_new" AS ENUM ('Transient', 'Note', 'Area', 'Objective', 'Project', 'Task');
ALTER TABLE "Entry" ALTER COLUMN "entryType" DROP DEFAULT;
ALTER TABLE "Entry" ALTER COLUMN "entryType" TYPE "EntryType_new" USING ("entryType"::text::"EntryType_new");
ALTER TYPE "EntryType" RENAME TO "EntryType_old";
ALTER TYPE "EntryType_new" RENAME TO "EntryType";
DROP TYPE "EntryType_old";
ALTER TABLE "Entry" ALTER COLUMN "entryType" SET DEFAULT 'Transient';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Capture', 'Draft', 'Rework', 'Clarify', 'Incubate', 'Backlog', 'Icebox', 'Ready', 'Next', 'Started', 'Check', 'Done', 'Reflect', 'Stalled', 'Aborted', 'Archive', 'Deleted');
ALTER TABLE "Entry" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Entry" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Entry" ALTER COLUMN "status" SET DEFAULT 'Draft';
COMMIT;

-- DropIndex
DROP INDEX "Entry_tags_idx";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "next",
DROP COLUMN "recur",
DROP COLUMN "repeat",
DROP COLUMN "tags",
ADD COLUMN     "cfgRecur" JSONB,
ADD COLUMN     "cfgRepeat" JSONB,
ADD COLUMN     "cfgReview" JSONB,
ADD COLUMN     "jobAt" TIMESTAMP(3),
ADD COLUMN     "nodeId" INTEGER NOT NULL,
ALTER COLUMN "meta" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "numchild" INTEGER NOT NULL DEFAULT 0,
    "name" CITEXT NOT NULL,
    "group" CITEXT NOT NULL DEFAULT 'default',

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "numchild" INTEGER NOT NULL DEFAULT 0,
    "cuid" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntryUpdate" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changes" JSONB NOT NULL,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "EntryUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntryToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_path_key" ON "Tag"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_path_idx" ON "Tag"("path");

-- CreateIndex
CREATE INDEX "Tag_name_group_idx" ON "Tag"("name", "group");

-- CreateIndex
CREATE UNIQUE INDEX "Node_path_key" ON "Node"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Node_cuid_key" ON "Node"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToTag_AB_unique" ON "_EntryToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToTag_B_index" ON "_EntryToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_nodeId_key" ON "Entry"("nodeId");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryUpdate" ADD CONSTRAINT "EntryUpdate_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToTag" ADD CONSTRAINT "_EntryToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToTag" ADD CONSTRAINT "_EntryToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
