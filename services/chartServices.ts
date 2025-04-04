import axios from "axios"; // Import axios for making HTTP requests
import { targetURL } from "../config"; // Import the base API URL from the config file

const API_URL = targetURL; // Assign the imported URL to a constant

/**
 * Fetches the weight record of a user from the API.
 * @param userId - The ID of the user whose weight record is being retrieved.
 * @param token - The authentication token for accessing the API.
 * @returns The weight record data as a response from the API.
 * @throws An error if the request fails.
 */
export const fetchWeightRecord = async (userId: string, token: string) => {
  try {
    // Make a GET request to fetch the weight record
    const response = await axios.get(
      `${API_URL}/get/diaryweight/${encodeURIComponent(
        userId
      )}/${encodeURIComponent(token)}`
    );

    return response.data; // Return the retrieved data
  } catch (error: any) {
    // Handle errors and return a meaningful message
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch weight data at service level."
    );
  }
};

/**
 * Fetches the milk record of a user from the API.
 * @param userId - The ID of the user whose milk record is being retrieved.
 * @param token - The authentication token for accessing the API.
 * @returns The milk record data as a response from the API.
 * @throws An error if the request fails.
 */
export const fetchMilkRecord = async (userId: string, token: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/get/diarymilk/${encodeURIComponent(
        userId
      )}/${encodeURIComponent(token)}`
    );
    console.log("MILK DATA: " + response.data);
    return response.data; // Return the retrieved data
  } catch (error: any) {
    // Handle errors and return a meaningful message
    throw new Error(
      error.response?.data?.message ||
        `Failed to fetch milk record at service level: ${error.message}`
    );
  }
};
