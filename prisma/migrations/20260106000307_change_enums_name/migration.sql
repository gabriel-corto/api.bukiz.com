/*
  Warnings:

  - The `category` column on the `books` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BookCategory" AS ENUM ('Finance', 'Technology', 'Business', 'Education', 'Health');

-- AlterTable
ALTER TABLE "books" DROP COLUMN "category",
ADD COLUMN     "category" "BookCategory";
