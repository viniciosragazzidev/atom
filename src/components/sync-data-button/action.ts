"use server";

import { revalidateTag } from "next/cache";

export const revalidateCustomTag = async ({ tag }: { tag: string }) => {
  return revalidateTag(tag);
};
