/*
  Warnings:

  - A unique constraint covering the columns `[cognitoSub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cognitoSub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "cognitoSub" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_cognitoSub_key" ON "public"."User"("cognitoSub");
