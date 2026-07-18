import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// ======================================
// Get Recent Donations
// ======================================

export const getRecentDonations = async () => {
  try {
    const response = await API.get("/donations/recent");
    return response.data;
  } catch (error) {
    console.error("Error fetching recent donations:", error);
    throw error;
  }
};