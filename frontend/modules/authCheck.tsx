import { useState } from "react";
import LoginClient from "@/app/login/client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import axios from "axios";

export const AuthCheck = (props: any) => {
  const token = useSelector((state: RootState) => state.user.token);
  console.log(token)
  const user = async () => {
    if (token) {
      try {
        const res = await axios.get("http://localhost:4000/user/currentUser", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        return true
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    else{
      return false
    }
  };

 user()
  return <>{ false ? props.children : <LoginClient />}</>;
};
