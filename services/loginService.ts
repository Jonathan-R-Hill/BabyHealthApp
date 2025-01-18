import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const asyncLogin = async (email: string, password: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/get/user/${encodeURIComponent(email)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};
