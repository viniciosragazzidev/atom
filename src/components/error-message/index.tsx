import React from "react";

const ErrorMessage = ({ errors, name }: any) => {
  return (
    <>
      {errors?.filter((err: any) => err.path[0] === name) && (
        <p className="text-red-500 text-xs">
          {errors?.filter((err: any) => err.path[0] === name)[0]?.message}
        </p>
      )}
    </>
  );
};

export default ErrorMessage;
