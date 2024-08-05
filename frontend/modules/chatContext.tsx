import { createContext } from "react";
import { ChatObject } from "./types";

export const ChatContext = createContext<ChatObject>({
  loading: false,
  chat: [],
});
