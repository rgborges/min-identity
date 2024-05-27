/*
  Warnings:

  - You are about to drop the column `groupId` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the `UsersInGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrganizationsToUsers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[permissionId]` on the table `Groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationsId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permissionId` to the `Groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `claims` to the `Permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationsId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UsersInGroups" DROP CONSTRAINT "UsersInGroups_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UsersInGroups" DROP CONSTRAINT "UsersInGroups_userId_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationsToUsers" DROP CONSTRAINT "_OrganizationsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationsToUsers" DROP CONSTRAINT "_OrganizationsToUsers_B_fkey";

-- DropIndex
DROP INDEX "Permissions_groupId_key";

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "permissionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "groupId",
DROP COLUMN "name",
ADD COLUMN     "claims" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "organizationsId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UsersInGroups";

-- DropTable
DROP TABLE "_OrganizationsToUsers";

-- CreateTable
CREATE TABLE "_GroupsToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupsToUsers_AB_unique" ON "_GroupsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupsToUsers_B_index" ON "_GroupsToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Groups_permissionId_key" ON "Groups"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_organizationsId_key" ON "Users"("organizationsId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "Organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupsToUsers" ADD CONSTRAINT "_GroupsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupsToUsers" ADD CONSTRAINT "_GroupsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
