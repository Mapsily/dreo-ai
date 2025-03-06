-- CreateEnum
CREATE TYPE "ISSUE_CATEGORY" AS ENUM ('TECHNICAL', 'FEATURE', 'PAYMENT');

-- CreateEnum
CREATE TYPE "TICKET_STATUS" AS ENUM ('OPEN', 'INPROGRESS', 'CLOSED');

-- CreateEnum
CREATE TYPE "PLAN_STATUS" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELED');

-- CreateEnum
CREATE TYPE "CONVERSATION_RESULT" AS ENUM ('PASSED', 'FAILED', 'RESCHEDULED', 'NOTRESPONDED');

-- CreateEnum
CREATE TYPE "CONVERSATION_STATUS" AS ENUM ('INPROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PROSPECT_STATUS" AS ENUM ('INITIAL', 'RESCHEDULED', 'BOOKED', 'NOTINTERESTED', 'NOTRESPONDED', 'FAILED', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "INTEREST_LEVEL" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "THEME" AS ENUM ('LIGHT', 'DARK');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "companyName" TEXT,
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prospect" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "lastContacted" TIMESTAMP(3),
    "rescheduledCount" INTEGER DEFAULT 0,
    "rescheduledFor" TIMESTAMP(3),
    "status" "PROSPECT_STATUS" DEFAULT 'INITIAL',

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "productsInterest" TEXT[],
    "interestLevel" "INTEREST_LEVEL" NOT NULL DEFAULT 'LOW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prospectId" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "ultravoxCallId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "result" "CONVERSATION_RESULT" NOT NULL,
    "status" "CONVERSATION_STATUS" NOT NULL DEFAULT 'INPROGRESS',
    "prospectId" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "planId" TEXT NOT NULL,
    "minutesLeft" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "autoRenew" BOOLEAN NOT NULL DEFAULT false,
    "status" "PLAN_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "dailyUsed" INTEGER NOT NULL DEFAULT 0,
    "lastUsedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "minutes" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "perDay" INTEGER NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "autoRenew" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" UUID NOT NULL,
    "theme" "THEME" NOT NULL DEFAULT 'LIGHT',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentSetting" (
    "id" TEXT NOT NULL,
    "settingId" UUID NOT NULL,
    "language" TEXT NOT NULL,
    "firstMessage" TEXT NOT NULL,
    "knowledgeBase" TEXT NOT NULL,
    "voice" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScriptSetting" (
    "id" TEXT NOT NULL,
    "settingId" UUID NOT NULL,
    "initial" TEXT NOT NULL,
    "followUp" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScriptSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvancedSetting" (
    "id" TEXT NOT NULL,
    "settingId" UUID NOT NULL,
    "maxConversationDuration" TEXT NOT NULL DEFAULT '300s',
    "timeZone" TEXT NOT NULL,
    "startAt" INTEGER NOT NULL DEFAULT 9,
    "endAt" INTEGER NOT NULL DEFAULT 18,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdvancedSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" UUID NOT NULL,
    "status" "TICKET_STATUS" NOT NULL DEFAULT 'OPEN',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "ISSUE_CATEGORY" NOT NULL DEFAULT 'FEATURE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ticketId" UUID NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_ultravoxCallId_key" ON "Conversation"("ultravoxCallId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_userId_key" ON "Setting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AgentSetting_settingId_key" ON "AgentSetting"("settingId");

-- CreateIndex
CREATE UNIQUE INDEX "ScriptSetting_settingId_key" ON "ScriptSetting"("settingId");

-- CreateIndex
CREATE UNIQUE INDEX "AdvancedSetting_settingId_key" ON "AdvancedSetting"("settingId");

-- AddForeignKey
ALTER TABLE "Prospect" ADD CONSTRAINT "Prospect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentSetting" ADD CONSTRAINT "AgentSetting_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScriptSetting" ADD CONSTRAINT "ScriptSetting_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvancedSetting" ADD CONSTRAINT "AdvancedSetting_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
