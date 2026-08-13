-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "support_ticket";

-- CreateTable
CREATE TABLE "assignments" (
    "id" SERIAL NOT NULL,
    "ticketid" INTEGER,
    "userid" INTEGER,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryid" SERIAL NOT NULL,
    "category" VARCHAR(36) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryid")
);

-- CreateTable
CREATE TABLE "comments" (
    "commentid" SERIAL NOT NULL,
    "text" TEXT,
    "ticketid" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("commentid")
);

-- CreateTable
CREATE TABLE "customers" (
    "customerid" SERIAL NOT NULL,
    "name" VARCHAR(36) NOT NULL,
    "email" VARCHAR(36) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customerid")
);

-- CreateTable
CREATE TABLE "status_history" (
    "statusid" SERIAL NOT NULL,
    "ticketid" INTEGER,
    "currentstatus" VARCHAR(10),
    "previousstatus" VARCHAR(10),
    "updatedby" INTEGER,

    CONSTRAINT "status_history_pkey" PRIMARY KEY ("statusid")
);

-- CreateTable
CREATE TABLE "tickets" (
    "ticketid" SERIAL NOT NULL,
    "title" VARCHAR(36),
    "description" TEXT,
    "priority" VARCHAR(10),
    "status" VARCHAR(10),
    "customerid" INTEGER NOT NULL,
    "categoryid" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticketid")
);

-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "name" VARCHAR(36),
    "email" VARCHAR(36) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_ticketid_fkey" FOREIGN KEY ("ticketid") REFERENCES "tickets"("ticketid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_ticketid_fkey" FOREIGN KEY ("ticketid") REFERENCES "tickets"("ticketid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "status_history" ADD CONSTRAINT "status_history_ticketid_fkey" FOREIGN KEY ("ticketid") REFERENCES "tickets"("ticketid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "status_history" ADD CONSTRAINT "status_history_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"("userid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "categories"("categoryid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customerid_fkey" FOREIGN KEY ("customerid") REFERENCES "customers"("customerid") ON DELETE NO ACTION ON UPDATE NO ACTION;

