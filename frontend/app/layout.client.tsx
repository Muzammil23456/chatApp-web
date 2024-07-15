"use client";
import React from "react";
import { Providers } from "./GlobalRedux/provider";

function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}

export default LayoutClient;
