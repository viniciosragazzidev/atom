// import { faker } from "@faker-js/faker/locale/pt_BR";
// import { CompanyType, unitOrderServiceType, UnitType } from "../@types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
dayjs.extend(relativeTime);
dayjs.locale("pt-br");
// import { brStates, statusData } from "../constants";

export const formateDate = (date: Date) => {
  return dayjs().to(date);
};

// let company = Array.from({ length: 1 }).map(() => {
//   const name = faker.company.name();
//   return {
//     name,
//     id: faker.number.int({ min: 1000, max: 2000 }).toString(),
//     document: faker.number
//       .int({ min: 100000000000, max: 999999999999 })
//       .toString(),
//     address: faker.location.streetAddress(),
//     city: faker.location.city(),
//     email: faker.internet.email(),
//     fundationDate: faker.date.past().toISOString(),
//     phone: faker.phone.number(),
//     state: "RJ",
//     inscEstadual: faker.number
//       .int({ min: 100000000000, max: 999999999999 })
//       .toString(),
//     inscMunicipal: faker.number
//       .int({ min: 100000000000, max: 999999999999 })
//       .toString(),
//     areasOfActivity: "Tecnologia",
//     slug: faker.helpers.slugify(name).toLowerCase(),
//     units: [],
//   };
// });

// export const units = Array.from({ length: 10 }).map(() => {
//   const name = faker.company.name();
//   return {
//     id: faker.number.int({ min: 1000, max: 2000 }).toString(),
//     name,
//     street: faker.location.streetAddress(),
//     neighborhoodAddress: "Centro",
//     city: faker.location.city(),
//     zipCode: faker.location.zipCode(),
//     numberAddress: faker.number.int({ min: 1, max: 1000 }).toString(),
//     email: faker.internet.email(),
//     phone: faker.phone.number(),
//     state: "RJ",
//     userManagerId: faker.person.fullName(),
//     slug: faker.helpers.slugify(name).toLowerCase(),
//     companyId: company[0].id?.toString()!,
//     company: company[0],
//     createdAt: faker.date.recent({ days: 30 }),
//     updatedAt: faker.date.recent({ days: 7 }),
//   };
// });

// const brl = new Intl.NumberFormat("pt-BR", {
//   style: "currency",
//   currency: "BRL",
// });
// export const services: unitOrderServiceType[] = Array.from({ length: 10 }).map((_, index) => {
//   return {
//     id: index + 1,
//     name: faker.person.fullName(),
//     document: faker.number
//       .int({ min: 10000000000, max: 99999999999 })
//       .toString(),
//     email: faker.internet.email(),
//     street: faker.location.streetAddress(),
//     city: faker.location.city(),
//     neighborhoodAddress: "Centro",
//     numberAddress: faker.number.int({ min: 1, max: 1000 }).toString(),
//     zipCode: faker.location.zipCode(),
//     description: faker.commerce.productDescription(),
//     phone: faker.phone.number(),
//     status: statusData[Math.floor(Math.random() * statusData.length)],
//     state: "RJ",
//     createdAt: faker.date.recent({ days: 30 }),
//     updatedAt: faker.date.recent({ days: 7 }),
//     amountValue: brl.format(faker.number.int({ min: 1000, max: 2000 })),
//     items: [
//       {
//         id: faker.number.int({ min: 1000, max: 2000 }),
//         name: faker.commerce.productName().split(" ")[2],
//         brand: "Marca",
//         model: "Modelo",
//         color: faker.color.human(),
//         accessories: [],
//         amountValue: brl.format(faker.number.int({ min: 1000, max: 2000 })),
//         coustAmountValue: brl.format(faker.number.int({ min: 200, max: 500 })),
//         images: [],
//         numberSerie: faker.number.int({ min: 100000, max: 2000000 }).toString(),
//         garantyDays: "30",
//         finallyDescription: faker.commerce.productDescription(),
//         occurrenceDescription: faker.commerce.productDescription(),
//         paymentType: "avista",
//         status: statusData[Math.floor(Math.random() * statusData.length)],
//         employeeId: faker.number.int({ min: 1000, max: 2000 }).toString(),
//       },
//     ],
//   };
// });

// company[0].units = units;

// export { company };
