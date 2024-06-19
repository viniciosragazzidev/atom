import { faker } from "@faker-js/faker/locale/pt_BR";
import { CompanyType, UnitType } from "../@types";

let company: CompanyType[] = Array.from({ length: 1 }).map(() => {
  const name = faker.company.name();
  return {
    name,
    id: faker.number.int({ min: 1000, max: 2000 }).toString(),
    document: faker.number
      .int({ min: 100000000000, max: 999999999999 })
      .toString(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    email: faker.internet.email(),
    fundationDate: faker.date.past().toISOString(),
    phone: faker.phone.number(),
    state: "RJ",
    inscEstadual: faker.number
      .int({ min: 100000000000, max: 999999999999 })
      .toString(),
    inscMunicipal: faker.number
      .int({ min: 100000000000, max: 999999999999 })
      .toString(),
    areasOfActivity: "Tecnologia",
    slug: faker.helpers.slugify(name).toLowerCase(),
    units: [],
  };
});

export const units: UnitType[] = Array.from({ length: 10 }).map(() => {
  const name = faker.company.name();
  return {
    id: faker.number.int({ min: 1000, max: 2000 }).toString(),
    name,
    street: faker.location.streetAddress(),
    neighborhoodAddress: "Centro",
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    numberAddress: faker.number.int({ min: 1, max: 1000 }).toString(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    state: "RJ",
    userManager: faker.person.fullName(),
    slug: faker.helpers.slugify(name).toLowerCase(),
    companyId: company[0].id?.toString()!,
    company: company[0],
    createdAt: faker.date.recent({ days: 30 }),
    updatedAt: faker.date.recent({ days: 7 }),
  };
});




company[0].units = units;

export { company };

