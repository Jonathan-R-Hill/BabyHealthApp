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
  technicalDetails: {
      entry_id: number //unique identifier for the carer
      user_id: string //unique identifier for the user
  };
  carerData: {
      firstName: string 
      surname: string
      title: string //title such as Sir, Dr, Mr, Miss, ect
      phoneNumber: string
      email: string
  }
}

const carer: Carers = {
  technicalDetails: {
    entry_id: 1,
    user_id: "test@test.test",
},
carerData: {
    firstName: "John",
    surname: "Jorhnson",
    title: "Dr",
    phoneNumber: "01642997884",
    email: "testCarer@test.test",
}
};

export const getDataOnCarers = async (
  userID: string,
  token: string
) => {
  var arr: Carers[] = [];
  arr.push(carer);
  return arr;
};

export const postNewCarer = async (
  userID: string,
  token: string,
  firstName: string,
  surname: string, 
  title: string,
  phoneNumber: string,
  email: string
) => {

};

export const getSingleCarer = async (
  userID: string,
  token: string,
  entry_id: number,
) => {
 return carer;
}
