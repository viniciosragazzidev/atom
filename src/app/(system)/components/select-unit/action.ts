import { ProfileType } from "@/lib/@types";
import { auth } from "../../../../../auth";
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
