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
    console.log("Fetching from URL:", `${API_URL}/get/singlebaby/${encodeURIComponent(userId)}/${encodeURIComponent(babyId)}/${encodeURIComponent(token)}`);

    try {
        const response = await axios.get<Baby>(
            `${API_URL}/get/singlebaby/${encodeURIComponent(userId)}/${encodeURIComponent(
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

export const fetchBabies = async (userId: string,  token: string) => {
    try {
        const response = await axios.get(
            `${API_URL}/get/babies/${encodeURIComponent(userId)}/${encodeURIComponent(
                token
            )}`
        );
        return response.data;   
    } catch (error: any) {
        console.log(error);
        return false;
    }
};

/**
 * Submits new baby for a user
 * 
 * @param {string} userId
 * @param {string} name
 * @param {string} gender
 * @param {Date} dateOfBirth
 * @param {number} weight
 * @returns {Promise<object>}
 * @throws {Error}
 */
export const postBaby = async (
    userId: string,
    token: string,
    name: string,
    gender: string,
    dateOfBirth: Date,
    weight: number
) => {
    try {
        const response = await axios.post(`${API_URL}/post/newbaby/${userId}/${token}`, {
            userId,
            token,
            name,
            gender,
            dateOfBirth,
            weight,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response ? error.response.data.message: error.message
        );
    }
};

export const updateBaby = async (
    userId: string,
    babyId: string,
    token: string,
    name: string,
    gender: string,
    dateOfBirth: Date,
    weight: number
) => {
    try {
        const response = await axios.put(`${API_URL}/put/updatebaby/${userId}/${babyId}/${token}`, {
            name,
            gender,
            dateOfBirth,
            weight,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response ? error.response.data.message: error.message
        );
    }
};

export const deleteBaby = async (
    userId: string,
    babyId: string,
    token: string
) => {
    try {
        const url =
            `${API_URL}/delete/singlebaby/${encodeURIComponent(userId)}/${encodeURIComponent(
                babyId
            )}/${encodeURIComponent(token)}`;
        const response = await axios.delete(url)
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to delete baby."
        );
    }
};