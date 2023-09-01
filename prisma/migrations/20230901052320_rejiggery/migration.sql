/*
  Warnings:

  - You are about to drop the column `cfgRecur` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `cfgRepeat` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `cfgReview` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `cuid` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `depth` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `numchild` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `cuid` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the `EntryUpdate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Node` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_nodeId_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_parentId_fkey";

-- DropForeignKey
ALTER TABLE "EntryUpdate" DROP CONSTRAINT "EntryUpdate_entryId_fkey";

-- DropIndex
DROP INDEX "Entry_cuid_key";

-- DropIndex
DROP INDEX "Entry_parentId_idx";

-- DropIndex
DROP INDEX "Entry_uuid_key";

-- DropIndex
DROP INDEX "Node_cuid_key";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "cfgRecur",
DROP COLUMN "cfgRepeat",
DROP COLUMN "cfgReview",
DROP COLUMN "cuid",
DROP COLUMN "depth",
DROP COLUMN "numchild",
DROP COLUMN "parentId",
DROP COLUMN "uuid",
ADD COLUMN     "recurConfig" JSONB,
ADD COLUMN     "repeatConfig" JSONB,
ADD COLUMN     "reviewConfig" JSONB,
ALTER COLUMN "path" DROP NOT NULL,
ALTER COLUMN "deleted" DROP DEFAULT,
ALTER COLUMN "nodeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "cuid",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "EntryUpdate";

-- CreateTable
CREATE TABLE "Update" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changes" JSONB NOT NULL,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "Update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Node_name_key" ON "Node"("name");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
