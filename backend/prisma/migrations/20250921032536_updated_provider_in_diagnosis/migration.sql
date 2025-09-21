/*
  Warnings:

  - Made the column `providerId` on table `Diagnosis` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Diagnosis" DROP CONSTRAINT "Diagnosis_provider_fkey";

-- AlterTable
ALTER TABLE "public"."Diagnosis" ALTER COLUMN "providerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Diagnosis" ADD CONSTRAINT "Diagnosis_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
