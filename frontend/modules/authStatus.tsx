import { useEffect, useState } from "react";
import { User } from "./types";
import axios from "axios";
import { logout } from "./common";
import { AccessTokenName } from "./constants";

export function useUserdata() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aToken, setAToken] = useState<string>(localStorage.getItem(AccessTokenName) || ""); // access token

  // Fetch user data
  useEffect(() => {
    (async () => {
      console.log(aToken)
      if (aToken.length > 0) {
        console.log("test2")
        try {
          const res = await axios.get(
            "http://localhost:4000/user/currentUser",
            {
              headers: {
                Authorization: `Bearer ${aToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          setUser(res.data.user);
          setLoading(true);
        } catch (error: any) {
          console.log(error);
        } finally {
          setLoading(true);
        }
      } else {
        console.log("test1")
        setUser(null);
        setLoading(true)
      }
    })();
  }, [aToken]);

  return {
    user,
    loading,
    aToken,
    setAToken,
  };
}
