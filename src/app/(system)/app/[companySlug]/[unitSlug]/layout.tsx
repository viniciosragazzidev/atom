import AppNavbarHeader from "@/app/(system)/components/header";
import React from "react";

import AsideMenu from "./components/aside-menu";
import WrapperApp from "@/components/wrapper";

interface LayoutUnitAreaProps {
  children: React.ReactNode;
  params: {
    companySlug: string;
    unitSlug: string;
  };
}

const LayoutUnitArea = ({ children, params }: LayoutUnitAreaProps) => {
  return (
    <WrapperApp params={params}>
      <div className="flex w-full ">
        <AsideMenu params={params} />
        <div className="flex w-full flex-col divide-y divide-border/40">
          <AppNavbarHeader params={params} completeNav />
          {children}
        </div>
      </div>
    </WrapperApp>
  );
};

export default LayoutUnitArea;
