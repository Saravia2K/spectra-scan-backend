-- CreateEnum
CREATE TYPE "TestAnswerValues" AS ENUM ('DEFINITELY_AGREE', 'SLIGHTLY_AGREE', 'SLIGHTLY_DISAGREE', 'DEFINITELY_DISAGREE');

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "request_password_change" BOOLEAN NOT NULL,
    "registration_date" DATE NOT NULL,
    "last_login" TIMESTAMP(6),

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "cutoff" INTEGER NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestAnswerCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TestAnswerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestQuestion" (
    "id" SERIAL NOT NULL,
    "test_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "scorable_values" "TestAnswerValues"[],

    CONSTRAINT "TestQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientTest" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "test_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "access_code" VARCHAR(5) NOT NULL,
    "total_score" INTEGER,
    "details" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatientTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientTestAnswer" (
    "id" SERIAL NOT NULL,
    "patient_test_id" INTEGER NOT NULL,
    "test_question_id" INTEGER NOT NULL,
    "value" "TestAnswerValues" NOT NULL,

    CONSTRAINT "PatientTestAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientTest_token_key" ON "PatientTest"("token");

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "TestAnswerCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTest" ADD CONSTRAINT "PatientTest_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTest" ADD CONSTRAINT "PatientTest_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTestAnswer" ADD CONSTRAINT "PatientTestAnswer_patient_test_id_fkey" FOREIGN KEY ("patient_test_id") REFERENCES "PatientTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTestAnswer" ADD CONSTRAINT "PatientTestAnswer_test_question_id_fkey" FOREIGN KEY ("test_question_id") REFERENCES "TestQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
