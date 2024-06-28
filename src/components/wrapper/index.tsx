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
    if (params.unitSlug) {
      const html = document.querySelector("html");

      if (html) {
        html.classList.add("size-90");
      }
    }
  }, [params.unitSlug]);

  return <>{children}</>;
};

export default WrapperApp;