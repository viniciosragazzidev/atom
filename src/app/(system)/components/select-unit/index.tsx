"use server";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BiBuilding, BiSend } from "react-icons/bi";
import { permanentRedirect } from "next/navigation";
import { getCompanyAndUnits } from "./action";
import { ButtonSubmit } from "../button-form-submit";

interface SelectUnitProps {
  params?: any;
}
export async function SelectUnitAndAccess({ params = "" }: SelectUnitProps) {
  const data = await getCompanyAndUnits();
  const units = data?.units;
  const company = data?.company;
  ////console.log(company);

  const handleSelectUnit = async (data: FormData) => {
    "use server";

    const unitSlug = data.get("unit");

    permanentRedirect(`/app/${company![0].slug!}/${unitSlug}`);
  };

  return (
    <form
      className="relative flex items-center gap-2 text-sm"
      action={handleSelectUnit}
    >
      <span className="absolute left-[5px] top-1/2 -translate-y-1/2 ">
        <BiBuilding className="text-secondary-foreground" />
      </span>
      <Select
        defaultValue={params.unitSlug}
        disabled={units?.length === 0}
        name="unit"
      >
        <SelectTrigger className="w-[200px] pl-7 ">
          <SelectValue placeholder="Selecione a unidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {units?.map((unit: any) => (
              <SelectItem
                key={unit.id}
                value={unit.slug}
                className="cursor-pointer px-2"
              >
                {unit.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ButtonSubmit
        type="submit"
        disabled={units?.length === 0}
        className="text-base"
        variant={"default"}
        size={"icon"}
      >
        <BiSend />
      </ButtonSubmit>
    </form>
  );
}
