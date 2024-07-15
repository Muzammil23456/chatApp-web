"use client";

import Dashboard from "@/components/dashboard";
import LoginClient from "./login/client";
import { AuthCheck } from "@/modules/authCheck";

export default function Home() {
  return (
    <>
      <AuthCheck>
        <Dashboard />
      </AuthCheck>
    </>
  );
}
