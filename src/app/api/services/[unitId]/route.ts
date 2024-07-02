import { NextResponse } from "next/server";
import db from "@/lib/services/db";

export async function GET(
  request: Request,
  { params }: { params: { unitId: string } }
) {
  const { unitId } = params;

  try {
    const orders = await db.unitOrderService.findMany({
      where: {
        unitId: String(unitId), // Convert unitId to a number
      },

      include: {
        UnitOrderServiceClient: true,
        UnitOrderServiceItems: true,
      },
    });

    if (orders) {
      return NextResponse.json({ orders: orders, status: 200 });
    } else {
      return NextResponse.json({ error: "orders not found", status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Ops, something went wrong",
      status: 500,
    });
  }
}
