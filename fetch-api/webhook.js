import getApiInstance from '../lib/axios';
import { redirect } from "next/navigation";

export async function getUserApiTokensData() {
    const api = await getApiInstance();
    const endpoint = `/api-tokens`;
  
    try {
      const response = await api.get(endpoint);
      return response.data || [];
    } catch (error) {
      if (error.response?.status === 401) {
        redirect("/auth/login");
      }
      console.error("Error fetching api tokens data:", error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch api tokens data");
    }
  }