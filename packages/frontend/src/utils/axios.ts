// Axios
import axios from "axios";
// Base Server URL
import { baseUrl } from "@/config";

const axiosInstance = axios.create({ baseURL: baseUrl, withCredentials: true });

export default axiosInstance;
