"use client";
import React from "react";
import { useUserdata } from "@/modules/authStatus";
import { UserContext } from "@/modules/authContext";

function LayoutClient({ children }: { children: React.ReactNode }) {
  const userData = useUserdata()
  return (
    <>
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
    </>
  );
}

export default LayoutClient;
