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
