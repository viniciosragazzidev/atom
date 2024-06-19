"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BiCheck, BiCheckCircle, BiUser } from "react-icons/bi";
import { AlertCircle } from "lucide-react";

interface CardStepAppProps {
  title: string;
  description: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  onOpenModal?: boolean;
  setOnOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  completed?: boolean;
}
const CardStepApp = ({
  title,
  description,
  buttonText,
  buttonIcon,
  onOpenModal,
  setOnOpenModal,
  disabled = true,
  completed = false,
}: CardStepAppProps) => {
  return (
    <Card
      className={`w-full sm:w-[340px] ${
        disabled || completed ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {!completed ? (
          <span className="h-4 w-4 text-muted-foreground">
            {" "}
            <AlertCircle />
          </span>
        ) : (
          <span className="h-4 w-4 text-[28px] text-green-500">
            <BiCheckCircle />
          </span>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button
          size={"sm"}
          disabled={disabled || completed}
          onClick={() => setOnOpenModal(!onOpenModal)}
          variant={"default"}
          className="mt-4 flex items-center justify-center gap-1"
        >
          {" "}
          {completed ? <BiCheck /> : buttonIcon} {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardStepApp;
