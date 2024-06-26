import React from "react";

const UnitPage = ({
  params,
}: {
  params: { unitSlug: string; companySlug: string };
}) => {
  return (
    <div>
      <h1>Unit {params.unitSlug}</h1>
    </div>
  );
};

export default UnitPage;
