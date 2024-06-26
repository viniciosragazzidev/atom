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
  FiX,
} from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { usePathname } from "next/navigation";

const AsideMenu = ({
  params,
}: {
  params: { companySlug: string; unitSlug: string };
}) => {
  const [open, setOpen] = React.useState(false);
  const previousURL = `/app/${params.companySlug}/${params.unitSlug}`;
  const menu_items = [
    {
      name: "Dashboard",
      href: previousURL,
      icon: <FiGrid />,
    },
    {
      name: "Servicos",
      href: `${previousURL}/services`,
      icon: <FiTool />,
    },
    {
      name: "Vendas",
      href: `${previousURL}/sales`,
      icon: <FiShoppingBag />,
    },
    {
      name: "Financeiro",
      href: `${previousURL}/finance`,
      icon: <LuWallet />,
    },
    {
      name: "Atendimento",
      href: `${previousURL}/support`,
      icon: <FiPhoneCall />,
    },
  ];

  const menu_system = [
    {
      name: "Ajustes",
      href: `${previousURL}/settings`,
      icon: <FiSettings />,
    },
    {
      name: "Suporte",
      href: `${previousURL}/support`,
      icon: <FiHeadphones />,
    },
  ];
  const path = usePathname();

  const [currentRoute, setCurrentRoute] = React.useState("");
  const getFourthItemInPath = (path: string) => {
    const splittedPath = path.split("/");

    return splittedPath[4] || "";
  };
  React.useEffect(() => {
    const route = path;

    setCurrentRoute(getFourthItemInPath(route));
  }, [path]);
  return (
    <aside
      className={`${
        open ? "w-full min-w-[220px] max-w-[220px]" : "w-24"
      } h-screen border-r border-border/40 py-10 relative  mr-2 overflow-hidden transition-all `}
    >
      <div
        className={`flex flex-col w-[220px] h-full gap-10 absolute top-10 left-0 transition-all ${
          open ? "translate-x-0" : "translate-x-[-100vw]"
        }`}
      >
        <div className="flex w-full items-center justify-between px-5">
          <Logo className="max-w-24" />
          <FiX
            className=" text-sm cursor-pointer "
            onClick={() => setOpen(!open)}
          />
        </div>
        <nav className="flex flex-col gap-6  px-2 pt-5">
          <span className="font-semibold text-accent-foreground/80 uppercase  text-xs text-nowrap  px-4">
            Menu Principal
          </span>
          <ul className=" flex flex-col gap-3 text-sm">
            {menu_items.map((item, index) => (
              <li
                key={index}
                className="  hover:bg-accent/50 py-2 px-4 transition-all hover:shadow-sm rounded-full"
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <span
                    className={`text-base text-primary ${
                      currentRoute === getFourthItemInPath(item.href) &&
                      "text-primary"
                    }`}
                  >
                    {item.icon}
                  </span>{" "}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex flex-col gap-6  px-2">
          <span className="font-semibold text-accent-foreground/80 uppercase   text-xs  text-nowrap px-4">
            Menu do sistema
          </span>
          <ul className=" flex flex-col gap-3 text-sm">
            {menu_system.map((item, index) => (
              <li
                key={index}
                className="  hover:bg-accent/50 py-2 px-4 transition-all hover:shadow-sm rounded-full"
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <span
                    className={`text-base text-primary ${
                      currentRoute === getFourthItemInPath(item.href) &&
                      "text-primary"
                    }`}
                  >
                    {item.icon}
                  </span>{" "}
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
                  <span
                    className={`text-lg ${
                      currentRoute === getFourthItemInPath(item.href) &&
                      "text-primary"
                    }`}
                  >
                    {item.icon}
                  </span>{" "}
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
                  <span
                    className={`text-lg  ${
                      currentRoute === getFourthItemInPath(item.href) &&
                      "text-primary"
                    }`}
                  >
                    {item.icon}
                  </span>{" "}
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
