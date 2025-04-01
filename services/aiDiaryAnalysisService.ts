import axios from "axios"; // Import axios for making HTTP requests
import { targetURL } from "../config"; // Import the base API URL from the config file
import { fetchWeightRecord } from "./chartServices";

const API_URL = targetURL; // Assign the imported URL to a constant

export const fetchAiWeightAnalysis = async (userId: string, token: string) => {
    try {
        const weightRecord = await fetchWeightRecord(userId, token);
        const response = await axios.get(
            `${API_URL}/post/ai/analyseBabyWeight/${encodeURIComponent(
                weightRecord
            )}`
        )
        return response.data; // Return the retrieved data
    } catch (error: any) {
      // Handle errors and return a meaningful message
      throw new Error(
        error.response?.data?.message || "Failed to fetch weight analysis at service level."
      );
    }
}