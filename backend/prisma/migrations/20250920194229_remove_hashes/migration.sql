/*
  Warnings:

  - You are about to drop the column `hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashedRt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "hash",
DROP COLUMN "hashedRt";
