"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarTop = ({ items }: any) => {
  const path = usePathname();

  const getFourthItemInPath = (path: string) => {
    const splittedPath = path.split("/");
    if (splittedPath.length > 4) {
      return splittedPath[5];
    } else {
      return splittedPath[4];
    }
  };
  return (
    <ul className="flex items-center gap-3">
      {items.map((item: any) => (
        <li
          key={item.name}
          className={` pb-2  ${
            getFourthItemInPath(path) === getFourthItemInPath(item.href)
              ? "border-b-2  font-semibold border-b-primary"
              : "text-muted-foreground"
          }`}
        >
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarTop;
