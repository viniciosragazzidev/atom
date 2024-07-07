import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorFieldVerify = ({
  errors,
  name,
}: {
  errors: any;
  name: string;
}) => {
  return (
    errors?.filter((err: any) => err.path[0] === name) &&
    errors?.filter((err: any) => err.path[0] === name)[0]?.message.length > 1
  );
};

export function constructUrl({
  path,
  page,
  perPage,
  f,
  q,
}: {
  path: string;
  page?: string;
  perPage?: string;
  f?: string;
  q?: string;
}) {
  let url = `${path}?`;

  if (page && page.length > 0) {
    url += `&page=${page}`;
  }

  if (perPage && perPage.length > 0) {
    url += `&perPage=${perPage}`;
  }

  if (f && f.length > 0) {
    url += `&f=${f}`;
  }

  if (q && q.length > 0) {
    url += `&q=${q}`;
  }

  // Remove any extra '&' at the start of the query string
  url = url.replace("?&", "?");

  return url;
}
