import { redirect } from "next/navigation";
import getApiInstance from "../lib/axios";

export default async function accountDashboard() {
  const api = await getApiInstance();
  const endpoint = `/account/dashboard`;

  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      redirect("/auth/login");
    }

    // Handle other errors
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}
