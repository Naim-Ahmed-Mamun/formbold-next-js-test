import getApiInstance from '../lib/axios';
import { redirect } from "next/navigation";

export async function getUserInvoices() {
    const api = await getApiInstance();
    const endpoint = `/invoice`;
  
    try {
      const response = await api.get(endpoint);
      return response.data || [];
    } catch (error) {
      if (error.response?.status === 401) {
        redirect("/auth/login");
      }
      console.error("Error fetching user invoices:", error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch user invoices");
    }
  }