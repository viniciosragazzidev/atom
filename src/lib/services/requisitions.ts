const path = process.env.PATHNAME;

export const getProfileByProfileId = async (profileId: string) => {
  try {
    const profileFetch = await fetch(`${path}/api/profile/${profileId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      next: {
        revalidate: 1000,
        tags: ["profile", profileId],
      },
    }).then((res) => res.json());

    return profileFetch;
  } catch (error) {
    //console.log(error);
  }
};

export const getUnitOrdersServices = async (unitId: string) => {
  try {
    const ordersFetch = await fetch(`${path}/api/services/${unitId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1000,
        tags: ["orders", unitId],
      },
    }).then((res) => res.json());
    return ordersFetch;
  } catch (error) {
    //console.log(error);
  }
};
