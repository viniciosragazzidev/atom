"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "../../../../../../../auth";
import db from "@/lib/services/db";
import { ProfileType } from "@/lib/@types";

export const sendProfile = async (data: ProfileType) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const createProfile = await db.profile.create({
      data: {
        name: String(data.name) || "",
        surname: String(data.surname) || "",
        birthdate: String(data.birthdate) || "",
        gender: String(data.gender) || "",
        document: String(data.document) || "",
        email: String(data.email) || "",
        phone: String(data.phone) || "",
        address: String(data.address) || "",
        city: String(data.city) || "",
        state: String(data.state) || "",
        password: String(data.password) || "",
        User: {
          connect: {
            id: String(userId),
          },
        },
      },
    });
    const result = JSON.stringify({
      status: 200,
      message: "success",
      data: createProfile,
    });

    revalidateTag("profile");
    return result;
  } catch (error) {
    return JSON.stringify({
      status: 500,
      message: error,
    });
  }
};
