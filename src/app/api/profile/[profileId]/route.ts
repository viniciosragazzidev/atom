import { NextResponse } from "next/server";
import db from "@/lib/services/db";

export async function GET(
  request: Request,
  { params }: { params: { profileId: string } }
) {
  const { profileId } = params;
  try {
    const profile = await db.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        Company: true,
        Unit: true,
      },
    });

    if (profile) {
      return NextResponse.json({ profile: profile, status: 200 });
    } else {
      return NextResponse.json({ error: "profile not found", status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Ops, something went wrong",
      status: 500,
    });
  }
}
