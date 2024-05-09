"use server";

import { cookies } from "next/headers";

const getApiUrl = (endpoint: string) => {
  const baseURL = process.env.API_URL;
  if (endpoint.startsWith("http")) {
    return endpoint;
  }
  const url = baseURL + endpoint;

  return url.replace("//", "/");
};

export const fetchApi = async (
  endpoint: string,
  method: string = "get",
  data?: any
) => {
  const apiUrl = getApiUrl(endpoint);
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    return await response.json();
  } catch (error: any) {
    throw error;
  }
};
