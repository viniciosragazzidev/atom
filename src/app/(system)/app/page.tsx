"use server";
import React from "react";
import AppNavbarHeader from "../components/header";
import { BsLightning } from "react-icons/bs";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardsStepApp from "../components/(steps)/cards-steps";
import { auth } from "../../../../auth";
import { permanentRedirect } from "next/navigation";
import { ProfileType } from "@/lib/@types";
import { getProfileByProfileId } from "@/lib/services/requisitions";
import TopStarsContainer from "./components/top-stars-container";
import { cookies } from "next/headers";

const AppHomePage = async () => {
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

  if (company && company.length > 0) {
    permanentRedirect(`/app/${company[0].slug}`);
  }

  return (
    <main className="w-full h-screen overflow-hidden  ">
      <AppNavbarHeader />

      <ScrollArea className="w-full h-full max-h-[calc(100vh-80px)] flex items-center ">
        <TopStarsContainer
          buttonIcon={<BsLightning className="text-lg" />}
          buttonText="Ver Planos"
          subtitle="A Atom possui diversos planos pensado totalmente para cada uma das suas nescessidades."
          title="Conheça todos nossos planos disponíveis"
        />

        <CardsStepApp profile={profile} />
      </ScrollArea>
    </main>
  );
};

export default AppHomePage;
