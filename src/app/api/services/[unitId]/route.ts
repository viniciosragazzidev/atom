import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/services/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { unitId: string } }
) {
  const { unitId } = params;
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");

  const perPage = parseInt(request.nextUrl.searchParams.get("perPage") || "5");
  const offset = (page - 1) * perPage;
  const search = request.nextUrl.searchParams.get("q") || "";
  try {
    const orders = await db.unitOrderService.findMany({
      where: {
        unitId: String(unitId), // Convert unitId to a number

        AND: {
          OR: [
            {
              UnitOrderServiceClient: {
                name: {
                  contains: search,
                },
              },
            },
            {
              UnitOrderServiceClient: {
                phone: {
                  contains: search,
                },
              },
            },
            {
              UnitOrderServiceItems: {
                every: {
                  name: {
                    contains: search,
                  },
                },
              },
            },
          ],
        },
      },

      include: {
        UnitOrderServiceClient: true,
        UnitOrderServiceItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: perPage,
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
