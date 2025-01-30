import axios from "axios";
import { targetURL } from "../config";

const API_URL = targetURL;

export const fetchWeightRecord = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/get/diaryweight/${encodeURIComponent(userId)}`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch weight data"
        );
    }
}

export const fetchMilkRecord = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/get/diary/milk/${encodeURIComponent(userId)}`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch milk data"
        );
    }
}