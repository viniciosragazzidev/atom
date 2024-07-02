import { getCompanyAndUnits } from "@/app/(system)/components/select-unit/action";
import db from "./db";

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

export const getCurrentUnit = async ({
  unitSlug,
  companySlug,
}: {
  unitSlug: string;
  companySlug: string;
}) => {
  try {
    const company = await db.company.findFirst({
      where: {
        slug: companySlug,
      },
    });
    const unit = await db.unit.findFirst({
      where: {
        slug: unitSlug,
        companyId: company?.id,
      },

      include: {},
    });

    return unit;
  } catch (error) {
    //console.log(error);
  }
};
export const getUnitOrdersServices = async ({
  unitSlug,
  filters,
}: {
  unitSlug: string;
  filters: string;
}) => {
  try {
    const units = (await getCompanyAndUnits()).units;
    const unit = units?.find((unit: any) => unit.slug === unitSlug);

    if (unit) {
      const unitId = unit.id!;
      const ordersFetch = await fetch(
        `${path}/api/services/${unit?.id}?${filters}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 1000,
            tags: ["orders", unitId],
          },
        }
      ).then((res) => res.json());
      return ordersFetch;
    }
  } catch (error) {
    //console.log(error);
  }
};
