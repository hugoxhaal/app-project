/*
  Warnings:

  - You are about to drop the column `name` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `periodId` on the `Students` table. All the data in the column will be lost.
  - Added the required column `calification` to the `Califications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentName` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_periodId_fkey";

-- AlterTable
ALTER TABLE "Califications" ADD COLUMN     "calification" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Students" DROP COLUMN "name",
DROP COLUMN "periodId",
ADD COLUMN     "studentName" TEXT NOT NULL;
