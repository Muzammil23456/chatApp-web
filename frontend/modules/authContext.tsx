import { createContext } from "react";
import { UserObject } from "./types";

export const UserContext = createContext<UserObject>({
  loading: false,
  user: null,
  aToken: "",
  setAToken: () => {},

});