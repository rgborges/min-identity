/*
  Warnings:

  - You are about to drop the column `role` on the `RootUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RootUsers" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";
