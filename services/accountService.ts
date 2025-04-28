import axios from "axios";
import { targetURL } from "../config";

const API_URL = targetURL;

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

    //console.log(response.data);

    if (!response.data.token) {
      return false; // If no token, invalid login
    }

    return response.data.token;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to authenticate user"
    );
  }
};

const asyncLogoutUser = async (userId: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/accounts/logOut`, {
      userId,
    });

    //console.log("Logout response:", response.data);
    return true;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      //console.log("Error:", error.response?.data?.message);
    } else {
     //console.log("An unexpected error occurred");
    }
    return false;
  }
};

const asyncUpdateEmail = async (
  token: string,
  userId: string,
  password: string,
  newEmail: string
) => {
  try {
    
    const response = await axios.post(
      `${API_URL}/accounts/updateEmail/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`,
      {
        userId,
        password,
        newEmail
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    //console.log("Email Updated Successfully", response.data);
    return response.data;
  } catch (error: any) {
    //console.log("Error:", error.response?.data?.message);
    return false;
  }
};

const asyncChangePassword = async (
  token: string, 
  userId: string,
  currentPassword: string,
  newPassword: string ) => {
  try {
    const response = await axios.post(
      `${API_URL}/accounts/updatePassword/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`,
      {
        userId,
        password: currentPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    //console.log("Password change response:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to change password");
    }
    throw new Error("An unexpected error occurred during password change");
  }
};

export { asyncValidateUser, asyncLogoutUser, asyncUpdateEmail, asyncChangePassword};
