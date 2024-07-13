/*
  Warnings:

  - You are about to drop the column `explaination` on the `jlpt_question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jlpt_question" DROP COLUMN "explaination",
ADD COLUMN     "explanation" TEXT;
