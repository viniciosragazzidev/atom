import { ProfileType } from "@/lib/@types";
import { auth } from "../../../../../auth";

export const getCompanyAndUnits = async () => {
  const session = await auth();
  const user = session?.user;
  const profileId = user?.profileId;
  const profileFetch = await fetch(
    `${
      process.env.PATHNAME || "http://localhost:3000/"
    }/api/profile/${profileId}`,
    {
      method: "GET",
      next: {
        revalidate: 1000,
        tags: ["profile"],
      },
    }
  ).then((res) => res.json());

  const profile: ProfileType = profileFetch.profile;

  const units = profile?.Unit;
  const company = profile?.Company;

  return {
    units,
    company,
  };
};
