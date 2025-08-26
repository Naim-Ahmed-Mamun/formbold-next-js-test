import { redirect } from "next/navigation";
import getApiInstance from "../lib/axios";


export async function getPricingPageData() {
  const api = await getApiInstance();
  const endpoint = `/pricing`;

  try {
    const response = await api.get(endpoint);
    return response.data || [];
  } catch (error) {
    if (error.response?.status === 401) {
      redirect("/auth/login");
    }
    console.error("Error fetching pricing page data:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch pricing page data");
  }
}
