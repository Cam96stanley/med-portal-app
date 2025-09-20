-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('PATIENT', 'PROVIDER');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImage" TEXT,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'PATIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExternalProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "facility" TEXT,
    "officeNumber" TEXT,

    CONSTRAINT "ExternalProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Diagnosis" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "diagnosisName" TEXT NOT NULL,
    "diagnosisCode" INTEGER NOT NULL,
    "dateDiagnosed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medication" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "medicationName" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "dateStarted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateStopped" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Goal" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Appointment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "appointmentTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "status" "public"."Status" NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BloodPressure" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "systolic" INTEGER NOT NULL,
    "diastolic" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BloodPressure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HeartRate" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "value" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeartRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Weight" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "value" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Glucose" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "value" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Glucose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Temperature" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT,
    "externalProviderId" TEXT,
    "value" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Temperature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "unique_patient_provider_diagnosis" ON "public"."Diagnosis"("patientId", "providerId", "diagnosisCode");

-- CreateIndex
CREATE UNIQUE INDEX "unique_patient_externalProvider_diagnosis" ON "public"."Diagnosis"("patientId", "externalProviderId", "diagnosisCode");

-- CreateIndex
CREATE UNIQUE INDEX "unique_patient_provider_medication" ON "public"."Medication"("patientId", "providerId", "medicationName");

-- CreateIndex
CREATE UNIQUE INDEX "unique_patient_externalProvider_medication" ON "public"."Medication"("patientId", "externalProviderId", "medicationName");

-- CreateIndex
CREATE UNIQUE INDEX "unique_patient_goal" ON "public"."Goal"("patientId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "unique_provider_appointment_time" ON "public"."Appointment"("providerId", "appointmentTime");

-- CreateIndex
CREATE UNIQUE INDEX "unique_externalProvider_appointment_time" ON "public"."Appointment"("externalProviderId", "appointmentTime");

-- CreateIndex
CREATE UNIQUE INDEX "unique_bp_patient_provider_recordedAt" ON "public"."BloodPressure"("patientId", "providerId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_bp_patient_external_recordedAt" ON "public"."BloodPressure"("patientId", "externalProviderId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_hr_patient_provider_recordedAt" ON "public"."HeartRate"("patientId", "providerId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_hr_patient_external_recordedAt" ON "public"."HeartRate"("patientId", "externalProviderId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_weight_patient_provider_recordedAt" ON "public"."Weight"("patientId", "providerId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_weight_patient_external_recordedAt" ON "public"."Weight"("patientId", "externalProviderId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_glucose_patient_provider_recordedAt" ON "public"."Glucose"("patientId", "providerId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_glucose_patient_external_recordedAt" ON "public"."Glucose"("patientId", "externalProviderId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_temp_patient_provider_recordedAt" ON "public"."Temperature"("patientId", "providerId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "unique_temp_patient_external_recordedAt" ON "public"."Temperature"("patientId", "externalProviderId", "recordedAt");

-- AddForeignKey
ALTER TABLE "public"."Diagnosis" ADD CONSTRAINT "Diagnosis_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diagnosis" ADD CONSTRAINT "Diagnosis_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diagnosis" ADD CONSTRAINT "Diagnosis_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medication" ADD CONSTRAINT "Medication_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medication" ADD CONSTRAINT "Medication_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medication" ADD CONSTRAINT "Medication_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Goal" ADD CONSTRAINT "Goal_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Goal" ADD CONSTRAINT "Goal_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Goal" ADD CONSTRAINT "Goal_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BloodPressure" ADD CONSTRAINT "BloodPressure_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BloodPressure" ADD CONSTRAINT "BloodPressure_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BloodPressure" ADD CONSTRAINT "BloodPressure_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeartRate" ADD CONSTRAINT "HeartRate_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeartRate" ADD CONSTRAINT "HeartRate_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeartRate" ADD CONSTRAINT "HeartRate_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Weight" ADD CONSTRAINT "Weight_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Weight" ADD CONSTRAINT "Weight_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Weight" ADD CONSTRAINT "Weight_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Glucose" ADD CONSTRAINT "Glucose_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Glucose" ADD CONSTRAINT "Glucose_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Glucose" ADD CONSTRAINT "Glucose_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Temperature" ADD CONSTRAINT "Temperature_patient_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Temperature" ADD CONSTRAINT "Temperature_provider_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Temperature" ADD CONSTRAINT "Temperature_externalProvider_fkey" FOREIGN KEY ("externalProviderId") REFERENCES "public"."ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
