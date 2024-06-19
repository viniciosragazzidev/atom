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