import axios from "axios";
import { AccessTokenName } from "./constants";

export const logout = async (
  token: string,
  setAToken: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // get token from local storage
    localStorage.setItem(AccessTokenName, "");
    setAToken("");
    console.log(res);
  } catch (error: any) {
    console.log(error);
  }
};
