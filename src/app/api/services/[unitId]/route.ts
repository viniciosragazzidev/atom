import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/services/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { unitId: string } }
) {
  const { unitId } = params;
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const periodInDays = 30;
  const perPage = parseInt(request.nextUrl.searchParams.get("perPage") || "5");
  const offset = (page - 1) * perPage;
  const search = request.nextUrl.searchParams.get("q") || "";
  try {
    console.log(search);

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
                some: {
                  name: {
                    contains: search,
                  },
                },
              },
            },
            {
              id: {
                equals: Number(search),
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
    const totalItems = await db.unitOrderService.count({
      where: {
        unitId: String(unitId), // Convert unitId to a number
        createdAt: {
          gte: new Date(Date.now() - periodInDays * 24 * 60 * 60 * 1000),
        },
      },
    }); // Correção aqui

    console.log(page, "ddd");
    if (orders) {
      return NextResponse.json({
        total_items: totalItems,
        items_per_page: perPage,
        current_page: page,
        total_pages: Math.ceil(totalItems / perPage),
        orders,

        status: 200,
      });
    } else {
      return NextResponse.json({ error: "orders not found", status: 404 });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Ops, something went wrong",
      status: 500,
    });
  }
}
