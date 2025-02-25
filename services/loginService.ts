import axios from "axios";
import { targetURL } from "../config";

const API_URL = targetURL;

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
      { userId: email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response.data);

    if (!response.data.token) {
      return false; // If no token, invalid login
    }

    return response.data.token;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

const asyncCreateNewUser = async (email: string, password: string) => {
  try {
    // Check if the user already exists
    const existingUserResponse = await axios.get(
      `${API_URL}/get/user/${encodeURIComponent(email)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Existing user:", existingUserResponse.data);

    // If a user is found, return false
    if (existingUserResponse) {
      console.log("User already exists:", existingUserResponse.data);
      return false;
    }
  } catch (error: any) {
    // If the error "User not found"
    if (error.response?.status === 404) {
      console.log("No existing user found. Proceeding to create a new user...");

      // Create a new user
      try {
        const response = await axios.post(
          `${API_URL}/push/newuser`,
          {
            userId: email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("User created successfully:", response.data);
        return response.data;
      } catch (creationError: any) {
        throw new Error(
          creationError.response?.data?.message || "Failed to create user"
        );
      }
    } else {
      throw new Error(
        error.response?.data?.message || "Failed to validate user"
      );
    }
  }

  // If user exists
  return false;
};

const asyncValidateAuthCode = async (email: string, code: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/post/verifyAccount`,
      {
        userId: email,
        code
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Code authenticated successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("Error:", error.response?.data?.message
    )
    return false;
  }
};

const asyncResetPassword = async (email: string, password: string) => {
  try {
    const existingUserResponse = await axios.get(
      `${API_URL}/get/user/${encodeURIComponent(email)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Existing user:", existingUserResponse.data);
    if (!existingUserResponse) {
      console.log("Unable to verify user exists with email: ", email);
      return false;
    } else {
      const response = await axios.post(
        `${API_URL}/put/updatePassword`,
        {
          userId: existingUserResponse.data.details.userId,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update user password"
    );
  }
};

export { asyncLogin, asyncValidateUser, asyncCreateNewUser, asyncResetPassword, asyncValidateAuthCode };
