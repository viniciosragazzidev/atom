import AppNavbarHeader from "@/app/(system)/components/header";
import React from "react";
import NavbarTop from "./components/navbar-top";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutServicesProps {
  children: React.ReactNode;
  params: {
    companySlug: string;
    unitSlug: string;
  };
}

const LayoutServices = ({ children, params }: LayoutServicesProps) => {
  const navItems = [
    {
      name: "Visão Geral",
      href: `/app/${params.companySlug}/${params.unitSlug}/services`,
    },
    {
      name: "Lista de Serviços",
      href: `/app/${params.companySlug}/${params.unitSlug}/services/list`,
    },
  ];
  return (
    <ScrollArea className="w-full h-full max-h-screen] flex items-center ">
      <div className=" flex flex-col gap-7  ">
        <header className="pt-6 pb-4">
          <nav>
            <NavbarTop items={navItems} />
          </nav>
        </header>
      </div>
      {children}
    </ScrollArea>
  );
};

export default LayoutServices;
