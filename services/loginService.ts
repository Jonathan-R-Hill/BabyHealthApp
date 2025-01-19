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
      { userId: email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response.data);
    return response.data;
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

export { asyncLogin, asyncValidateUser, asyncCreateNewUser };
