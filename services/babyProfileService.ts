import axios from "axios";
import { targetURL } from "../config";
import { Baby } from "../app/appPages/babyLog/main";

const API_URL = targetURL;

/** 
 * Fetch baby
 * 
* @param {string} userId 
* @param {number} babyId
* @returns {Promise<object>} 
* @throws {Error}
*/

export const fetchBaby = async (
    userId: string,
    babyId: number | string,
    token: string
) => {
    try {
        const response = await axios.get<Baby[]>(
            `${API_URL}/get/baby/${encodeURIComponent(userId)}/${encodeURIComponent(
                babyId
        )}/${encodeURIComponent(token)}`
        );
        return response.data;        
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch baby"
        );
    }
};

/**
 * Fetch Babies
 * 
 * @param {string} userId
 * @returns {Promise<object[]>}
 * @throws {Error}
 */

export const fetchBabies = async (userId: string, token: string) => {
    try {
        const response = await axios.get(
            `${API_URL}/get/baby/${encodeURIComponent(userId)}/${encodeURIComponent(
                token
            )}`
        );
        return response.data;   
    } catch (error: any) {
        console.log(error);
    }
};

/**
 * Submits new baby for a user
 * 
 * @param {string} userId
 * @param {string} name
 * @param {string} gender
 * @param {Date} dateOfBirth
 */
export const addBaby = async (
    userId: string,
    name: string,
    gender: string,
    dateOfBirth: Date
) => {
    try {
        const response = await axios.post(`${API_URL}/post/baby`, {
            userId,
            name,
            gender,
            dateOfBirth
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response ? error.response.data.message: error.message
        );
    }
};