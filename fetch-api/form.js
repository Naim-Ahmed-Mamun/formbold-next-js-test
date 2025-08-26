import { redirect } from "next/navigation";
import getApiInstance from "../lib/axios";

export async function getAllFormAttempt() {
  const api = await getApiInstance();
  const endpoint = `/forms`;

  try {
    const response = await api.get(endpoint);
    return response.data || [];
  } catch (error) {
    if (error.response?.status === 401) {
      redirect("/auth/login");
    }
    console.error("Error fetching forms:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch forms");
  }
}

export async function getFormSubmissions(id, filters = {}) {
  const api = await getApiInstance();
  const endpoint = `/forms/${id}/submissions-list`;

  try {
    const response = await api.get(endpoint, { params: filters });
    return response.data || [];
  } catch (error) {
    if (error.response?.status === 401) {
      redirect("/auth/login");
    }
    console.error("Error fetching form submissions:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch submissions");
  }
}
