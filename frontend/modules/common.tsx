import axios from "axios";
import { AccessTokenName } from "./constants";
import { User } from "./types";

export const logout = async (
  user: User | null,
  setAToken: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const res = await axios.post("http://localhost:4000/user/logout", {
      userId: user?._id,
    });
    // get token from local storage
    localStorage.setItem(AccessTokenName, "");
    setAToken("");
  } catch (error: any) {
    console.error(error);
  }
};

export const users = async (aToken: string) => {
  try {
    const res = await axios.get("http://localhost:4000/user/all-users", {
      headers: {
        Authorization: `Bearer ${aToken}`,
      },
    });
    return res.data.users;
  } catch (error: any) {
    console.error(error);
  }
};

export const userWithId = async (aToken: string, id: string) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/user/user-with-id",
      {
        userId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );
    return res.data.user
  } catch (error: any) {
    console.error(error);
  }
};
