-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedDt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "rolName" TEXT NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedDt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "periodId" INTEGER NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedDt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periods" (
    "id" SERIAL NOT NULL,
    "periodName" TEXT NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedDt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subjects" (
    "id" SERIAL NOT NULL,
    "subjectName" TEXT NOT NULL,
    "periodId" INTEGER NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedDt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscriptions" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedDt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Inscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Califications" (
    "id" SERIAL NOT NULL,
    "periodId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedDt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Califications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_rolName_key" ON "Roles"("rolName");

-- CreateIndex
CREATE UNIQUE INDEX "Students_cedula_key" ON "Students"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Periods_periodName_key" ON "Periods"("periodName");

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_subjectName_key" ON "Subjects"("subjectName");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscriptions" ADD CONSTRAINT "Inscriptions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscriptions" ADD CONSTRAINT "Inscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscriptions" ADD CONSTRAINT "Inscriptions_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Califications" ADD CONSTRAINT "Califications_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Califications" ADD CONSTRAINT "Califications_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Califications" ADD CONSTRAINT "Califications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
