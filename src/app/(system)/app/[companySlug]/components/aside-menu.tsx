"use client";

import Logo from "@/components/logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsWallet,
} from "react-icons/bs";
import SDark from "@/images/s_dark.png";
import SLight from "@/images/s_light.png";
import {
  FiGrid,
  FiHeadphones,
  FiPhoneCall,
  FiSettings,
  FiShoppingBag,
  FiTool,
} from "react-icons/fi";
import { LuWallet } from "react-icons/lu";

const AsideMenu = () => {
  const [open, setOpen] = React.useState(false);
  const menu_items = [
    {
      name: "Dashboard",
      href: "#",
      icon: <FiGrid />,
    },
    {
      name: "Servicos",
      href: "/services",
      icon: <FiTool />,
    },
    {
      name: "Vendas",
      href: "/sales",
      icon: <FiShoppingBag />,
    },
    {
      name: "Financeiro",
      href: "/finance",
      icon: <LuWallet />,
    },
    {
      name: "Atendimento",
      href: "/atendimento",
      icon: <FiPhoneCall />,
    },
  ];

  const menu_system = [
    {
      name: "Ajustes",
      href: "/settings",
      icon: <FiSettings />,
    },
    {
      name: "Suporte",
      href: "/support",
      icon: <FiHeadphones />,
    },
  ];
  return (
    <aside
      className={`${
        open ? "w-64" : "w-24"
      } h-screen border-r border-border/40 py-10 relative  mr-2 overflow-hidden`}
    >
      <div
        className={`flex flex-col w-52 h-full gap-10 absolute top-10 left-0 transition-all ${
          open ? "translate-x-0" : "translate-x-[-100vw]"
        }`}
      >
        <div className="flex w-full items-center justify-between px-4">
          <Logo className="max-w-24" />
          <BsChevronDoubleLeft
            className=" text-sm cursor-pointer "
            onClick={() => setOpen(!open)}
          />
        </div>
        <nav className="flex flex-col gap-6  px-2 pt-5">
          <span className="font-semibold text-accent-foreground/80 uppercase  text-sm text-nowrap  px-4">
            Menu Principal
          </span>
          <ul className=" flex flex-col gap-3 text-sm">
            {menu_items.map((item, index) => (
              <li
                key={index}
                className="  hover:bg-accent/50 py-2 px-4 transition-all hover:shadow-sm rounded-full"
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <span className="text-base text-primary">{item.icon}</span>{" "}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex flex-col gap-6  px-2">
          <span className="font-semibold text-accent-foreground/80 uppercase  text-sm  text-nowrap px-4">
            Menu do sistema
          </span>
          <ul className=" flex flex-col gap-3 text-sm">
            {menu_system.map((item, index) => (
              <li
                key={index}
                className="  hover:bg-accent/50 py-2 px-4 transition-all hover:shadow-sm rounded-full"
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <span className="text-base text-primary">{item.icon}</span>{" "}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        className={`flex flex-col w-full h-full gap-10 absolute top-10 left-0 transition-all ${
          open ? "translate-x-[100vw]" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center px-4">
          <Image
            src={SDark}
            alt="logo"
            className="w-full max-w-10 hidden dark:block"
          />
          <Image
            src={SLight}
            alt="logo"
            className="w-full max-w-10 block dark:hidden"
          />
        </div>

        <nav className="flex flex-col gap-6  px-2 pt-5">
          <ul className=" flex flex-col gap-3 text-sm">
            {menu_items.map((item, index) => (
              <li
                key={index}
                className="  hover:bg-accent/50 py-2 px-4 transition-all hover:shadow-sm rounded-full text-accent-foreground/80 "
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="text-lg">{item.icon}</span>{" "}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex flex-col gap-6  px-2">
          <ul className=" flex flex-col gap-3 text-sm">
            {menu_system.map((item, index) => (
              <li
                key={index}
                className="  hover:bg-accent/50 py-2 px-4 transition-all hover:shadow-sm rounded-full text-accent-foreground/80 "
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="text-lg">{item.icon}</span>{" "}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <span
          className="flex justify-center items-center"
          onClick={() => setOpen(!open)}
        >
          <BsChevronDoubleRight className=" text-sm cursor-pointer " />
        </span>
      </div>
    </aside>
  );
};

export default AsideMenu;
