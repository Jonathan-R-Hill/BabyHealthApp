import axios from "axios";
import { targetURL } from "../config";

const API_URL = targetURL;

/**
 * Submits a bug report to the server.
 *
 * @param {string} userId - The user ID submitting the bug.
 * @param {string} bugDetails - The details of the bug.
 * @returns {Promise<object>} The response from the server.
 */
export const submitBug = async (
  userId: string,
  bugDetails: string,
  token: string
) => {
  try {
    const response = await axios.post(`${API_URL}/push/submitBug`, {
      userId,
      bugDetails,
      token,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

/**
 * Submits a feature request to the server.
 *
 * @param {string} userId - The user ID submitting the feature request.
 * @param {string} featureDetails - The details of the feature.
 * @returns {Promise<object>} The response from the server.
 */
export const submitFeature = async (
  userId: string,
  featureDetails: string,
  token: string
) => {
  try {
    const response = await axios.post(`${API_URL}/push/submitFeature`, {
      userId,
      featureDetails,
      token,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
