"use server";
import React from "react";

import { Button } from "@/components/ui/button";
import { BsLightning } from "react-icons/bs";
import { PiAtom } from "react-icons/pi";

import { ScrollArea } from "@/components/ui/scroll-area";

import { permanentRedirect } from "next/navigation";
import { ProfileType } from "@/lib/@types";
import { auth } from "../../../../../auth";
import AppNavbarHeader from "../../components/header";
import CardsPageBottom from "../../components/cards-page-bottom";
import { FiPhoneCall } from "react-icons/fi";
import { getProfileByProfileId } from "@/lib/services/requisitions";
import TopStarsContainer from "../components/top-stars-container";
import WrapperApp from "@/components/wrapper";

const AppHomePage = async ({ params }: { params: any }) => {
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
      const profileFetch = await getProfileByProfileId(profileId);
      profile = await profileFetch.profile;
    } catch (error) {
      //console.log(error);
    }
  }
  const company = profile?.Company;

  if (!company || company.length === 0) {
    permanentRedirect("/app/");
  }

  return (
    <WrapperApp params={params}>
      <main className="w-full h-screen overflow-hidden  ">
        <AppNavbarHeader />

        <ScrollArea className="w-full h-full max-h-[calc(100vh-80px)] flex items-center ">
          <TopStarsContainer
            buttonIcon={<FiPhoneCall className="text-lg" />}
            buttonText="Suporte Atom"
            subtitle="Nossa equipe sempre estará de prontidão para te ajudar e
                solicionar qualquer problema que você tiver! Só clicar no botão
                abaixo."
            title={`Olá, ${profile?.name}`}
          />

          <CardsPageBottom unitList={companyAndUnits} />
        </ScrollArea>
      </main>
    </WrapperApp>
  );
};

export default AppHomePage;
