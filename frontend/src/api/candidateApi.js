import axios from "axios";


const API_URL = "http://localhost:5001/api/candidates";


const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});


export const getCandidates = (params) => api.get("/", { params });


export const addCandidate = (candidateData) => api.post("/", candidateData);


export const updateCandidate = (id, updateData) =>
  api.put(`/${id}`, updateData);



export const getAnalytics = () => api.get("/analytics");


const candidateApi = {
  getCandidates,
  addCandidate,
  updateCandidate,
  getAnalytics,
  api 
};

export default candidateApi;