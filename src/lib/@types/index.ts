import { ServicesDialogSchema } from "@/app/(system)/app/[companySlug]/[unitSlug]/services/list/components/create-services-dialog/services-dialog-schema";
import { EmployeeCompanySchemaType } from "@/app/(system)/components/(dialogs)/create-company-user/company-user-dialog-schema";
import { UnitSchemaType } from "@/app/(system)/components/(dialogs)/create-unit-dialog/unit-dialog-schema";
import { CompanySchemaType } from "@/app/(system)/components/(dialogs)/ingress-company-dialog/company-dialog-schema";
import { Account, Session } from "@prisma/client";

export type UserType = {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  accounts?: Account[];
  sessions?: Session[];
  profile?: ProfileType;
  profileId?: string;
};

export type ProfileType = {
  id?: string;
  name: string;
  surname: string;
  password?: string;
  birthdate: Date;
  gender: string;
  document: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  User?: UserType[];
  Company?: CompanyType[];
  Unit?: UnitType[];
  companyId?: string;
};

export interface CompanyType extends CompanySchemaType {
  slug?: string;
  createdAt?: Date;
  CompanyEmployees?: EmployeeCompanyType[];
  units?: UnitType[];
  ownerId?: string;
  owner?: UserType;
}

export interface UnitType extends UnitSchemaType {
  companyId: string;
  company: CompanyType;
  unitCompanyEmployees?: UnitCompanyEmployeesType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeCompanyType extends EmployeeCompanySchemaType {
  companyId?: string;
  company?: CompanyType;
  companyEmployeeUnits?: UnitCompanyEmployeesType[];
  units?: UnitType[];
}

type UnitCompanyEmployeesType = {
  id?: string;
  companyId?: string;
  unitId?: string;
  companyEmployeeId?: string;

  company?: CompanyType;
  unit?: UnitType;
  companyEmployee?: UserType;
};

export interface unitOrderServiceType {
  id: number;
  description: string;
  status: string;
  unitid: string;
  createdAt: string;
  updatedAt: string;
  amountValue: string;
  unitOrderServiceClientId: number;
  UnitOrderServiceClient?: UnitOrderServiceClientType;
  UnitOrderServiceItems?: UnitOrderServiceItemsType[];
}

export type UnitOrderServiceClientType = {
  id: number;
  name: string;
  document: string;
  phone: string;
  email: string;
  street: string;
  numberAddress: string;
  neighborhoodAddress: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
};

export type UnitOrderServiceItemsType = {
  id: number;
  name: string;
  brand: string;
  model: string;
  numberSerie: string;
  color: string;
  status: string;
  occurrenceDescription: string;
  accessories: string[];
  images: string[];
  coustAmountValue: string;
  amountValue: string;
  garantyDays: string;
  paymentType: string;
  employeeId: string;
  finallyDescription: string;
  createdAt: string;
  updatedAt: string;
  unitOrderServiceId: number;
};
