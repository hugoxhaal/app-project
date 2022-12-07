/*
  Warnings:

  - You are about to drop the column `periodId` on the `Califications` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Califications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Califications" DROP CONSTRAINT "Califications_periodId_fkey";

-- AlterTable
ALTER TABLE "Califications" DROP COLUMN "periodId",
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Califications" ADD CONSTRAINT "Califications_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
