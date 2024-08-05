"use client";
import React from "react";
import { useUserdata } from "@/modules/authStatus";
import { UserContext } from "@/modules/authContext";
import { ChatContext } from "@/modules/chatContext";
import { useChat } from "@/modules/chat";
function LayoutClient({ children }: { children: React.ReactNode }) {
  const userData = useUserdata();
  const chatData = useChat();

  return (
    <>
      <UserContext.Provider value={userData}>
        <ChatContext.Provider value={chatData}>{children}</ChatContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default LayoutClient;
