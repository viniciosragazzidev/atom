"use server";

import { revalidatePath } from "next/cache";

export const sendOrder = async (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      revalidatePath("/app");
      resolve({
        status: 200,
        message: "success",
      });
    }, 2000);
  });
};

export const updateOrder = async (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      revalidatePath("/app");
      resolve({
        status: 200,
        message: "success",
      });
    }, 2000);
  });
};
