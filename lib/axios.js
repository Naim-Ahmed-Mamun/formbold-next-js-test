import axios from "axios";
import { cookies } from "next/headers";

function makeHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

function makeHeaderWithToken(options) {
  const { token, ContentType } = options;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": ContentType,
  };
}

export async function getApiInstance() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value || null;

  // if (!token) {
  //   console.error('No access token found in cookies');
  //   throw new Error('No access token found in cookies');
  // }
  const options = { ContentType: "application/json" };
  const newOptions = { ...options, token };

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: token ? makeHeaderWithToken(newOptions) : makeHeaders(),
  });
}

export default getApiInstance;