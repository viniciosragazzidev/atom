"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { FiLoader } from "react-icons/fi";

interface ButtonFormSubmitProps extends ComponentProps<"button">, ButtonProps {
  children: React.ReactNode;
}
export function ButtonSubmit(props: ButtonFormSubmitProps) {
  const status = useFormStatus();
  return (
    <>
      <Button {...props}>
        {status.pending ? (
          <FiLoader className="w-4 h-4 animate-spin" />
        ) : (
          props.children
        )}
      </Button>
    </>
  );
}
