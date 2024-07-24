"use client";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const STYLES: { [key: string]: string } = {
  Error: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
  Success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
  Warning: "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
  Info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
};

export default function ShowAlert(props: {
  title: string;
  handleAlert: Function;
  detail: string;
}) {
  const { title, detail } = props;

  useEffect(() => {
    if (title != "") {
      const interval = setInterval(() => {
        props.handleAlert("");
      }, 6000000);
      return () => clearInterval(interval);
    }
  }, [title, props]);
  return (
    title !== "" && (
      <Alert className={`${STYLES[title]} print:hidden my-4`}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{detail}</AlertDescription>
      </Alert>
    )
  );
}