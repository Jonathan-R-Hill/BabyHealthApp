import axios from "axios";

const API_URL = "http://localhost:3000/api";

const fetchDiaryEntry = async (userId: string, title: string, date: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/get/diary/${encodeURIComponent(userId)}/${encodeURIComponent(
        title
      )}/${encodeURIComponent(date)}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diary entry"
    );
  }
};

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

module.exports = { fetchAllDiaryEntries, fetchDiaryEntry, postDiaryEntry };
