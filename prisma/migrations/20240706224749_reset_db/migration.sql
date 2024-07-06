/*
  Warnings:

  - The primary key for the `UnitOrderServiceItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UnitOrderServiceClient" ADD COLUMN     "unitId" TEXT;

-- AlterTable
ALTER TABLE "UnitOrderServiceItem" DROP CONSTRAINT "UnitOrderServiceItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "employeeId" DROP NOT NULL,
ADD CONSTRAINT "UnitOrderServiceItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UnitOrderServiceItem_id_seq";

-- AddForeignKey
ALTER TABLE "UnitOrderServiceClient" ADD CONSTRAINT "UnitOrderServiceClient_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
