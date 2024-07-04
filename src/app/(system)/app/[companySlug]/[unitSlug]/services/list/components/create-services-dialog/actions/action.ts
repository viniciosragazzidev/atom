"use server";

import {
  UnitOrderServiceClientType,
  UnitOrderServiceItemsType,
  unitOrderServiceType,
} from "@/lib/@types";
import db from "@/lib/services/db";
import { getCurrentUnit } from "@/lib/services/requisitions";
import { revalidatePath, revalidateTag } from "next/cache";

export const sendOrder = async (data: any) => {
  const unitSlug = data.unitSlug;
  const companySlug = data.companySlug;
  //console.log(data);

  const currentUnit = await getCurrentUnit({
    companySlug: companySlug,
    unitSlug: unitSlug,
  });
  const unitId = currentUnit?.id;
  const client: UnitOrderServiceClientType = {
    name: data.name,
    document: data.document,
    phone: data.phone,
    email: data.email,
    street: data.street,
    numberAddress: data.numberAddress,
    neighborhoodAddress: data.neighborhoodAddress,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
  };

  const order: unitOrderServiceType = {
    description: data.description,
    status: data.status,
  };

  const items: UnitOrderServiceItemsType[] = data.items;
  const totalItemsAmountValue = items.reduce(
    (acc: number, item: any) => acc + Number(item.amountValue),
    0
  );
  try {
    const createOrder = await db.unitOrderService.create({
      data: {
        // id: data.id || 1,
        description: order.description,
        amountValue: String(totalItemsAmountValue),
        status: order.status,

        unit: {
          connect: {
            id: unitId,
          },
        },
      },
    });

    const verifyClient = await db.unitOrderServiceClient.findUnique({
      where: {
        document: client.document,
      },
    });

    if (!verifyClient) {
      const createClient = await db.unitOrderServiceClient.create({
        data: {
          ...client,
          UnitOrderServices: {
            connect: {
              id: createOrder.id,
            },
          },
        },
      });
    } else {
      const updateClient = await db.unitOrderServiceClient.update({
        where: {
          id: verifyClient.id,
        },
        data: {
          ...client,
          UnitOrderServices: {
            connect: {
              id: createOrder.id,
            },
          },
        },
      });
    }

    const createItems = await db.unitOrderServiceItem.createMany({
      data: items.map((item: any) => ({
        ...item,

        unitOrderServiceId: createOrder.id,
      })),
    });

    revalidateTag("orders");
    return JSON.stringify({
      status: 200,
      message: "success",
      orderId: createOrder.id,
    });
  } catch (error) {
    //console.log(error);
    return [];
  }
};

export const updateOrder = async (data: any) => {
  // update
  const unitSlug = data.unitSlug;
  const companySlug = data.companySlug;
  //console.log(data);

  const currentUnit = await getCurrentUnit({
    companySlug: companySlug,
    unitSlug: unitSlug,
  });
  const unitId = currentUnit?.id;
  const client: UnitOrderServiceClientType = {
    id: data.clientId,
    name: data.name,
    document: data.document,
    phone: data.phone,
    email: data.email,
    street: data.street,
    numberAddress: data.numberAddress,
    neighborhoodAddress: data.neighborhoodAddress,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
  };

  const order: unitOrderServiceType = {
    id: data.id,
    description: data.description,
    status: data.status,
  };

  const items: UnitOrderServiceItemsType[] = data.items;
  const totalItemsAmountValue = items.reduce(
    (acc: number, item: any) => acc + Number(item.amountValue),
    0
  );

  try {
    const updateOrder = await db.unitOrderService.update({
      where: {
        id: order.id,
      },
      data: {
        description: order.description,
        amountValue: String(totalItemsAmountValue),
        status: order.status,
      },
    });

    const updateClient = await db.unitOrderServiceClient.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        document: client.document,
        phone: client.phone,
        email: client.email,
        street: client.street,
        numberAddress: client.numberAddress,
        neighborhoodAddress: client.neighborhoodAddress,
        city: client.city,
        state: client.state,
        zipCode: client.zipCode,
      },
    });

    const removeItems = await db.unitOrderServiceItem.deleteMany({
      where: {
        unitOrderServiceId: order.id,
      },
    });
    //console.log(items);

    const createItems = await db.unitOrderServiceItem.createMany({
      data: items.map((item: any) => ({
        ...item,
        unitOrderServiceId: order.id,
      })),
    });

    revalidateTag("orders");
    return JSON.stringify({
      status: 200,
      message: "success",
      orderId: updateOrder.id,
    });
  } catch (error) {
    //console.log(error);
    return [];
  }
};
