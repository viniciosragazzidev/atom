"use server";
import React from "react";
import AppNavbarHeader from "../components/header";
import { Button } from "@/components/ui/button";
import { BsLightning } from "react-icons/bs";
import { PiAtom } from "react-icons/pi";

import { ScrollArea } from "@/components/ui/scroll-area";

import CardsStepApp from "../components/(steps)/cards-steps";
import CardsPageBottom from "../components/cards-page-bottom";
import { auth } from "../../../../auth";
import { permanentRedirect } from "next/navigation";
import { ProfileType } from "@/lib/@types";
const path = process.env.PATHNAME;

const AppHomePage = async () => {
  const companyAndUnits: any[] = [];

  const session = await auth();
  const user = session?.user;

  if (!user) {
    permanentRedirect("/");
  }

  const profileId = user.profileId;
  let profile: ProfileType | undefined;

  if (profileId) {
    try {
      const profileFetch = await fetch(`${path}/api/profile/${profileId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      profile = await profileFetch.profile;
    } catch (error) {
      //console.log(error);
    }
  }
  const company = profile?.Company;
  console.log(profile);

  return (
    <main className="w-full h-screen overflow-hidden  ">
      <AppNavbarHeader />

      <ScrollArea className="w-full h-full max-h-[calc(100vh-80px)] flex items-center ">
        <div className="w-full max-md:min-h-72 md:h-72  container flex justify-center ">
          <div className="w-full h-full overflow-hidden bg-slate-900 dark:bg-slate-900/20 flex items-center shadow-lg   text-slate-100 rounded-xl p-5 py-7 sm:p-10 ">
            <div id="stars" className="z-40"></div>
            <div id="stars2" className="z-40"></div>
            <div id="stars3" className="z-40"></div>
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
        {!profile || !company || company.length < 1 ? (
          <CardsStepApp profile={profile} />
        ) : (
          <CardsPageBottom unitList={companyAndUnits} />
        )}
      </ScrollArea>
    </main>
  );
};

export default AppHomePage;
