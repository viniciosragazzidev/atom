"use server";
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
  filters: {
    search: string;
    page: string;
    perPage: string;
  };
}) => {
  try {
    const units = (await getCompanyAndUnits()).units;
    const unit = units?.find((unit: any) => unit.slug === unitSlug);

    const search = filters.search;
    const page = filters.page;
    const perPage = filters.perPage;

    if (unit) {
      const unitId = unit.id!;
      const ordersFetch = await fetch(
        `${path}/api/services/${unitId}?page=${page}&perPage=${perPage}&q=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 1000,
            tags: ["orders", unitId, page, perPage, search],
          },
        }
      ).then((res) => res.json());
      return ordersFetch;
    }
  } catch (error) {
    //console.log(error);
  }
};

export const verifyIfEmailClientOsExist = async ({
  email,
  unitSlug,
  companySlug,
}: {
  email: string;
  unitSlug: string;
  companySlug: string;
}) => {
  try {
    const currentUnit = await getCurrentUnit({
      unitSlug: unitSlug,
      companySlug: companySlug,
    });
    const client = await db.unitOrderServiceClient.findFirst({
      where: {
        email: email,

        unitId: currentUnit?.id,
      },
    });
    if (client !== null) return client;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyIfDocumentClientOsExist = async ({
  document,
  unitSlug,
  companySlug,
}: {
  document: string;
  unitSlug: string;
  companySlug: string;
}) => {
  try {
    const currentUnit = await getCurrentUnit({
      unitSlug: unitSlug,
      companySlug: companySlug,
    });
    const client = await db.unitOrderServiceClient.findFirst({
      where: {
        document: document,

        unitId: currentUnit?.id,
      },
    });

    console.log(client, document, "client", currentUnit, "currentUnit");

    return client;
  } catch (error) {
    //console.log(error);
    return null;
  }
};
