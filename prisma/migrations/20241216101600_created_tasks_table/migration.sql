-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('completed', 'pending', 'in_progress');

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
