/*
  Warnings:

  - The primary key for the `Area` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_areaId_fkey";

-- AlterTable
ALTER TABLE "Area" DROP CONSTRAINT "Area_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Area_id_seq";

-- AlterTable
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "areaId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Permissions_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
