import axios from "axios";
import { targetUrl } from "../config.json";

const API_URL = targetUrl;

/**
 * Fetches a specific diary entry for a user by title and date.
 *
 * @param {string} userId - The ID of the user whose diary entry is being fetched.
 * @param {number} entry_id - The entry_id of the diary entry.
 * @returns {Promise<object>} A promise that resolves to the diary entry data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
const fetchSingleDiaryEntry = async (
  userId: string,
  entry_id: number | string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/get/diary/${encodeURIComponent(userId)}/${encodeURIComponent(
        entry_id
      )}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diary entry"
    );
  }
};

/**
 * Fetches all diary entries for a specific user.
 *
 * @param {string} userId - The ID of the user whose diary entries are being fetched.
 * @returns {Promise<object[]>} A promise that resolves to an array of diary entries.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
const fetchAllDiaryEntries = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/get/diary/${encodeURIComponent(userId)}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diary entry"
    );
  }
};

/**
 * Submits a new diary entry for a user.
 *
 * @param {string} userId - The ID of the user creating the diary entry.
 * @param {string} text - The diary entry text.
 * @param {number} weight - The user's weight associated with the diary entry.
 * @param {string} foodType - The type of food recorded in the diary entry.
 * @param {number} foodAmount - The amount of food recorded in the diary entry.
 * @returns {Promise<object>} A promise that resolves to the created diary entry.
 * @throws {Error} Throws an error if the submission fails.
 */
const postDiaryEntry = async (
  userId: string,
  text: string,
  weight: number,
  foodType: string,
  foodAmount: number
) => {
  try {
    const response = await axios.post(`${API_URL}/post/diary`, {
      userId,
      text,
      weight,
      foodType,
      foodAmount,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

module.exports = {
  fetchAllDiaryEntries,
  fetchSingleDiaryEntry,
  postDiaryEntry,
};
