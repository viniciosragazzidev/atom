import AppNavbarHeader from "@/app/(system)/components/header";
import { units } from "@/lib/data/company";
import React from "react";

import AsideMenu from "./components/aside-menu";

interface LayoutUnitAreaProps {
  children: React.ReactNode;
  params: {
    companySlug: string;
    unitSlug: string;
  };
}

const LayoutUnitArea = ({ children, params }: LayoutUnitAreaProps) => {
  return (
    <div className="flex w-full ">
      <AsideMenu params={params} />
      <div className="flex w-full flex-col">
        <AppNavbarHeader completeNav companyAndUnits={units} />
        {children}
      </div>
    </div>
  );
};

export default LayoutUnitArea;
