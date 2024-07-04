"use server";
import { ProfileType } from "@/lib/@types";
import { auth } from "../../../../../auth";
import { permanentRedirect } from "next/navigation";
const path = process.env.PATHNAME;

export const getCompanyAndUnits = async () => {
  try {
    const session = await auth();
    const user = session?.user;
    const profileId = user?.profileId;
    const profileFetch = await fetch(`${path}/api/profile/${profileId}`, {
      method: "GET",
      next: {
        revalidate: 1000,
        tags: ["profile"],
      },
    }).then((res) => res.json());

    const profile: ProfileType = profileFetch.profile;

    const units = profile?.Unit;
    const company = profile?.Company;

    return {
      units,
      company,
    };
  } catch (error) {
    // //console.log(error);
    return {
      units: [],
      company: [],
    };
  }
};
export const handleSelectUnit = async (data: FormData) => {
  "use server";

  const unitSlug = data.get("unit");

  const company = [
    {
      slug: "atom",
    },
  ];
  permanentRedirect(`/app/${company![0].slug!}/${unitSlug}`);
};
