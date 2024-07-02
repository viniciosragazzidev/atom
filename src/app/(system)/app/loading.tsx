import React from "react";
import { BiLoader } from "react-icons/bi";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center">
      <BiLoader className="w-10 h-10 text-8xl animate-spin text-primary" />
    </div>
  );
}
