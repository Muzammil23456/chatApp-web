import { useContext, useEffect, useState } from "react";
import LoginClient from "@/app/login/client";
import { UserContext } from "./authContext";
import Loading from "@/app/loading";

export const AuthCheck = (props: any) => {
  const { user, loading } = useContext(UserContext);
  console.log(user, loading);

  return (
    <>{!loading ? user ? props.children : <LoginClient /> : <Loading noFullScreen={false}/>}</>
  );
};
