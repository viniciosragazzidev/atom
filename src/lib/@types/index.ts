import { ServicesDialogSchema } from "@/app/(system)/app/[companySlug]/[unitSlug]/services/list/components/create-services-dialog/services-dialog-schema";
import { UserCompanySchemaType } from "@/app/(system)/components/(dialogs)/create-company-user/company-user-dialog-schema";
import { UnitSchemaType } from "@/app/(system)/components/(dialogs)/create-unit-dialog/unit-dialog-schema";
import { CompanySchemaType } from "@/app/(system)/components/(dialogs)/ingress-company-dialog/company-dialog-schema";

export interface CompanyType extends CompanySchemaType {
  slug: string;
  units: UnitType[];
}

export interface UnitType extends UnitSchemaType {
  companyId: string;
  company: CompanyType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyUserType extends UserCompanySchemaType {}

export interface OSType extends ServicesDialogSchema {
  createdAt: Date;
  updatedAt: Date;
  items: ItemsOsType[];
  amountValue: string;
}
export type ItemsOsType = {
  id: number;
  name: string;
  brand: string;
  model: string;
  numberSerie: string;
  color: string;
  status: string;
  occurrenceDescription: string;
  accessories: string[]; // Assuming accessories are represented as an array of strings
  images: string[]; // Assuming images are represented as an array of strings (URLs or paths)
  coustAmountValue: string; // Should this be number instead of string?
  amountValue: string; // Should this be number instead of string?
  garantyDays: string; // Assuming this represents the number of days as a string
  paymentType: string; // Could be an enum if there are specific allowed values
  employeeId: string;
  finallyDescription: string;
};
