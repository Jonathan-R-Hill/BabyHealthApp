import axios from "axios";

const API_URL = "http://localhost:3000/api";

const asyncLogin = async (email: string, password: string) => {
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

    if (password === response.data._id.password) {
      return response.data;
    } else {
      console.log(response.data);
      throw new Error("Invalid password");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

const asyncValidateUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/get/validateUser`,
      { email, password }, // Sending data in the body
      {
        headers: {
          "Content-Type": "application/json", // Make sure the content type is JSON
        },
        withCredentials: true, // If you are using cookies for authentication/session
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export { asyncLogin, asyncValidateUser };
