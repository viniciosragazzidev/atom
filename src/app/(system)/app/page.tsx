import React from "react";
import AppNavbarHeader from "../components/header";
import { Button } from "@/components/ui/button";
import { BsLightning } from "react-icons/bs";
import { PiAtom } from "react-icons/pi";

import { ScrollArea } from "@/components/ui/scroll-area";

import CardsStepApp from "../components/(steps)/cards-steps";
import CardsPageBottom from "../components/cards-page-bottom";

const AppHomePage = () => {
  const companyAndUnits: any[] = [
    {
      id: 1,
      name: "Unidade Nova Iguaçu",
      slug: "unidade-nova-iguacu",
    },
    {
      id: 2,
      name: "Unidade Barra da Tijuca",
      slug: "unidade-barra-da-tijuca",
    },
    {
      id: 3,
      name: "Unidade Copacabana",
      slug: "unidade-copacabana",
    },
    {
      id: 4,
      name: "Unidade Botafogo",
      slug: "unidade-botafogo",
    },
    {
      id: 5,
      name: "Unidade Niterói",
      slug: "unidade-niteroi",
    },
    {
      id: 6,
      name: "Unidade São Gonçalo",
      slug: "unidade-sao-goncalo",
    },
    {
      id: 7,
      name: "Unidade Duque de Caxias",
      slug: "unidade-duque-de-caxias",
    },
    {
      id: 8,
      name: "Unidade Madureira",
      slug: "unidade-madureira",
    },
    {
      id: 9,
      name: "Unidade Tijuca",
      slug: "unidade-tijuca",
    },
    {
      id: 10,
      name: "Unidade Santa Cruz",
      slug: "unidade-santa-cruz",
    },
    {
      id: 11,
      name: "Unidade Recreio",
      slug: "unidade-recreio",
    },
  ];

  return (
    <main className="w-full h-screen overflow-hidden  ">
      <AppNavbarHeader companyAndUnits={companyAndUnits} />

      <ScrollArea className="w-full h-full max-h-[calc(100vh-80px)] flex items-center ">
        <div className="w-full max-md:min-h-72 md:h-72  container flex justify-center ">
          <div className="w-full h-full overflow-hidden bg-slate-900 dark:bg-slate-900/20 flex items-center shadow-lg   text-slate-100 rounded-xl p-5 py-7 sm:p-10 ">
            <div
              id="stars"
              className="z-40"
            ></div>
            <div
              id="stars2"
              className="z-40"
            ></div>
            <div
              id="stars3"
              className="z-40"
            ></div>
            <div className="flex max-w-lg flex-col gap-1 z-50">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Conheça todos nossos planos disponíveis
              </h1>
              <p className="text-sm text-slate-100/90">
                A Atom possui diversos planos pensado totalmente para cada uma
                das suas nescessidades.
              </p>
              <Button
                variant={"default"}
                size={"sm"}
                className="w-full mt-5  sm:max-w-[280px] flex items-center gap-1"
              >
                <BsLightning className="text-lg" /> Ver Planos
              </Button>
            </div>
            <div className=" w-full flex justify-end md:pr-10 relative max-sm:hidden items-center z-50">
              <span className=" text-9xl md:text-[280px]  text-[#294269] ">
                <PiAtom />
              </span>
            </div>
          </div>
        </div>
        {!companyAndUnits || companyAndUnits.length === 0 ? (
          <CardsStepApp />
        ) : (
          <CardsPageBottom unitList={companyAndUnits} />
        )}
      </ScrollArea>
    </main>
  );
};

export default AppHomePage;
