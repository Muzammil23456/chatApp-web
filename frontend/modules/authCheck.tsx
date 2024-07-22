import { useContext, useEffect, useState } from "react";
import LoginClient from "@/app/login/client";
import { UserContext } from "./authContext";

export const AuthCheck = (props: any) => {
  const { user, loading } = useContext(UserContext);
  console.log(user, loading);

  return <>{!loading ? user ? props.children : <LoginClient /> : "loading"}</>;
};
