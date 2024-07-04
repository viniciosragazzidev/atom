"use server";

import { revalidatePath } from "next/cache";

export const sendProfile = async (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      revalidatePath("/app");
      ////console.log(data);

      resolve({
        status: 200,
        message: "success",
      });
    }, 2000);
  });
};
