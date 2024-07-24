import axios from "axios";

export const logout = async (token: string) => {
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
    localStorage.setItem("aT", "");
    console.log(res);
  } catch (error: any) {
    console.log(error);
  }
};
