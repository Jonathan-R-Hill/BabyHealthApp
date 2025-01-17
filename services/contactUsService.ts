import axios from "axios";

const API_URL = "http://localhost:3000/api/push";

/**
 * Submits a bug report to the server.
 *
 * @param {string} userId - The user ID submitting the bug.
 * @param {string} bugDetails - The details of the bug.
 * @returns {Promise<object>} The response from the server.
 */
export const submitBug = async (userId: string, bugDetails: string) => {
  try {
    const response = await axios.post(`${API_URL}/submitBug`, {
      userId,
      bugDetails,
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
export const submitFeature = async (userId: string, featureDetails: string) => {
  try {
    const response = await axios.post(`${API_URL}/submitFeature`, {
      userId,
      featureDetails,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
