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
import { units } from "@/lib/data/company";

interface SelectUnitProps {
  companyAndUnits: any;
}
export async function SelectUnitAndAccess({
  companyAndUnits,
}: SelectUnitProps) {
  const handleSelectUnit = async (data: FormData) => {
    "use server";

    const unitSlug = data.get("unit");
    console.log();

    if (unitSlug) {
      const unit = units.find((unit: any) => unit.slug === unitSlug);
      console.log(unit);

      permanentRedirect(`/app/${unit?.company.slug}/${unitSlug}`);
    }
  };

  return (
    <form
      className="relative flex items-center gap-2"
      action={handleSelectUnit}
    >
      <span className="absolute left-[5px] top-1/2 -translate-y-1/2 ">
        <BiBuilding className="text-secondary-foreground" />
      </span>
      <Select disabled={units.length === 0} name="unit">
        <SelectTrigger className="w-[200px] pl-7">
          <SelectValue placeholder="Selecione a unidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {units.map((unit: any) => (
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
      <Button
        disabled={units.length === 0}
        className="text-lg "
        variant={"default"}
        size={"icon"}
        type="submit"
      >
        <BiSend />
      </Button>
    </form>
  );
}
