-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Draft', 'Clarify', 'Backlog', 'Ready', 'Next', 'InProgress', 'Blocked', 'Check', 'Done', 'Aborted', 'Reflect', 'Archive', 'Deleted');

-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('Transient', 'Task', 'SubTask', 'Project', 'Objective', 'Epic', 'Theme', 'Activity', 'Plan', 'Annotation');

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "numchild" INTEGER NOT NULL DEFAULT 0,
    "entryType" "EntryType" NOT NULL DEFAULT 'Transient',
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cuid" TEXT NOT NULL,
    "parentId" INTEGER,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" "Status" NOT NULL DEFAULT 'Draft',
    "text" TEXT NOT NULL,
    "url" TEXT,
    "filePath" TEXT,
    "tags" TEXT[],
    "meta" JSONB NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "urgency" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "due" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "scheduled" TIMESTAMP(3),
    "until" TIMESTAMP(3),
    "wait" TIMESTAMP(3),
    "start" TIMESTAMP(3),
    "next" TIMESTAMP(3),
    "recur" JSONB,
    "repeat" JSONB,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Depends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_path_key" ON "Entry"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_uuid_key" ON "Entry"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_cuid_key" ON "Entry"("cuid");

-- CreateIndex
CREATE INDEX "Entry_path_idx" ON "Entry"("path");

-- CreateIndex
CREATE INDEX "Entry_entryType_idx" ON "Entry"("entryType");

-- CreateIndex
CREATE INDEX "Entry_parentId_idx" ON "Entry"("parentId");

-- CreateIndex
CREATE INDEX "Entry_status_idx" ON "Entry"("status");

-- CreateIndex
CREATE INDEX "Entry_tags_idx" ON "Entry"("tags");

-- CreateIndex
CREATE UNIQUE INDEX "_Depends_AB_unique" ON "_Depends"("A", "B");

-- CreateIndex
CREATE INDEX "_Depends_B_index" ON "_Depends"("B");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Depends" ADD CONSTRAINT "_Depends_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Depends" ADD CONSTRAINT "_Depends_B_fkey" FOREIGN KEY ("B") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
