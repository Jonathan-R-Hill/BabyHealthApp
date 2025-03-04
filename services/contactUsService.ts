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

/**
 * Fetches all carers for a specific user.
 *
 * @param {string} userId - The ID of the user whose diary entries are being fetched.
 * @returns {Promise<object[]>} A promise that resolves to an array of diary entries.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
interface Carers {
  details: {
      carerId: number //unique identifier for the carer
      userId: string //unique identifier for the user
  };
  data: {
      name: string
      title: string //title such as Sir, Dr, Mr, Miss, ect
      phone: string
      email: string
  }
}

export const getDataOnCarers = async (
  userId: string,
  token: string
) => {
  try {
    const response = await axios.get(`${API_URL}/carers/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`);
    return response.data.carers;
  } catch(error: any){
    throw new Error(
      error.response ? error.response.data.message : error.message);
  }
};

export const postNewCarer = async (
  userId: string,
  token: string,
  name: string,
  title: string,
  email: string,
  phone: string
) => {
  try {
    const response = await axios.post(`${API_URL}/carers/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`,
  {
    userId, title, name, email, phone
  });
  console.log(userId, title, name, email, phone);
  return response.data;
  } catch (error: any){
    throw new Error(
      error.response ? error.response.data.message : error.message);
  }
};
