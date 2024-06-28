"use server";

import { CompanyType } from "@/lib/@types";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "../../../../../../../auth";
import db from "@/lib/services/db";

export const sendCompany = async (data: CompanyType) => {
  try {
    const session = await auth();
    const user = session?.user;
    const profileId = user?.profileId;
    const companySlug = data.name.toLocaleLowerCase().replace(/ /g, "-");

    const createCompany = await db.company.create({
      data: {
        name: String(data.name) || "",
        document: String(data.document) || "",
        email: String(data.email) || "",
        phone: String(data.phone) || "",
        street: String(data.street) || "",
        numberAddress: String(data.numberAddress) || "",
        neighborhoodAddress: String(data.neighborhoodAddress) || "",
        city: String(data.city) || "",
        zipCode: String(data.zipCode) || "",
        areasOfActivity: String(data.areasOfActivity) || "",
        state: String(data.state) || "",
        fundationDate: String(data.fundationDate) || "",
        slug: String(data.slug) || companySlug,
        inscEstadual: String(data.inscEstadual) || "",
        inscMunicipal: String(data.inscMunicipal) || "",
        owner: {
          connect: {
            id: String(profileId),
          },
        },
      },
    });

    const createFirstEmployee = await db.employeeProfile.create({
      data: {
        profile: {
          connect: {
            id: String(profileId),
          },
        },
        company: {
          connect: {
            id: String(createCompany.id),
          },
        },
        role: "admin",
        office: "owner",
      },
    });

    // Criar um registro em CompanyEmployees

    const createMainUnit = await db.unit.create({
      data: {
        name: "Sede",
        slug: "sede",
        city: String(data.city) || "",
        state: String(data.state) || "",
        zipCode: String(data.zipCode) || "",
        numberAddress: String(data.numberAddress) || "",
        street: String(data.street) || "",
        neighborhoodAddress: String(data.neighborhoodAddress) || "",
        company: {
          connect: {
            id: String(createCompany.id),
          },
        },
        email: String(data.email) || "",
        phone: String(data.phone) || "",
        userManager: {
          connect: {
            id: String(profileId),
          },
        },
      },
    });

    const createFirstUnitEmployee = await db.unitEmployees.create({
      data: {
        employee: {
          connect: {
            id: String(createFirstEmployee.id),
          },
        },
        role: "admin",
        Unit: {
          connect: {
            id: String(createMainUnit.id),
          },
        },
      },
    });

    const result = JSON.stringify({
      status: 200,
      message: "success",
      data: {
        company: createCompany,
        unit: createMainUnit,
      },
    });
    revalidateTag("profile");
    return result;
  } catch (error) {
    return JSON.stringify({ status: 500, message: error });
  }
};
