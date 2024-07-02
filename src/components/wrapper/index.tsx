"use client";

import React, { useEffect } from "react";

const WrapperApp = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  useEffect(() => {
    console.log(params);

    const html = document.querySelector("html");
    if (params.unitSlug) {
      if (html) {
        html.classList.add("size-90");
      }
    } else {
      if (html) {
        html.classList.remove("size-90");
      }
    }
  }, [params.unitSlug]);

  return <>{children}</>;
};

export default WrapperApp;
