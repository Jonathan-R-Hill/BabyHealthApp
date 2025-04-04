import axios from "axios";
import { targetURL } from "../config";
import { fetchWeightRecord, fetchMilkRecord } from "./chartServices";

const API_URL = targetURL;

export const fetchAiWeightAnalysis = async (userId: string, token: string) => {
  try {
    const weightRecords = await fetchWeightRecord(userId, token);

    if (!Array.isArray(weightRecords) || weightRecords.length === 0) {
      throw new Error("Invalid weight records received.");
    }

    const weights = weightRecords.map((record) => record.weight);
    const timestamps = weightRecords.map((record) => record.date);

    // console.log("Transformed weight data:", { weights, timestamps });

    const response = await axios.post(
      `${API_URL}/post/ai/analyseBabyWeight/${userId}/${token}`,
      {
        weight: weights,
        timestamps: timestamps,
        foodConsumed: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("AI analysis response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching AI weight analysis:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch weight analysis."
    );
  }
};

export const fetchAiFoodConsumptionAnalysis = async (
  userId: string,
  token: string
) => {
  try {
    const foodRecords = await fetchMilkRecord(userId, token);

    if (!Array.isArray(foodRecords) || foodRecords.length === 0) {
      throw new Error("Invalid weight records received.");
    }

    const foodAmounts = foodRecords.map((record) => record.foodAmount);
    const timestamps = foodRecords.map((record) => record.date);

    // console.log("Transformed weight data:", { weights, timestamps });

    const response = await axios.post(
      `${API_URL}/post/ai/analyseBabyFood/${userId}/${token}`,
      {
        timestamps: timestamps,
        foodConsumed: foodAmounts,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("AI analysis response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching AI weight analysis:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch food analysis."
    );
  }
};
