import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bmgum.onrender.com/api",
});

// =======================
// User APIs
// =======================

// Submit Complaint
export const submitComplaint = async (data) => {
  const response = await API.post("/complaints", data);
  return response.data;
};

// Track Complaint
export const trackComplaint = async (trackingId) => {
  const response = await API.get(
    `/complaints/track/${trackingId}`
  );
  return response.data;
};

// =======================
// Admin APIs
// =======================

// Get All Complaints
export const getAllComplaints = async () => {
  const response = await API.get("/complaints");
  return response.data;
};

// Update Complaint
export const updateComplaint = async (id, data) => {
  const response = await API.put(
    `/complaints/${id}`,
    data
  );
  return response.data;
};

// Delete Complaint
export const deleteComplaint = async (id) => {
  const response = await API.delete(
    `/complaints/${id}`
  );
  return response.data;
};