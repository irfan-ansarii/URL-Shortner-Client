import { fetchApi } from "./fetch-api";

import { handleResponse } from "./utils";
import { removeToken, setToken } from "./session";

export const getSession = async () => {
  const response = await fetchApi("/auth/session", "GET");

  return handleResponse(response);
};

export const signin = async (data: Record<string, any>) => {
  const response = await fetchApi("/auth/signin", "POST", {
    ...data,
  });

  return handleResponse(response);
};

export const verify = async (data: Record<string, any>) => {
  const response = await fetchApi("/auth/verify", "POST", {
    ...data,
  });

  await setToken(response.token);

  return handleResponse(response);
};

export const signup = async (data: Record<string, any>) => {
  const response = await fetchApi("/auth/signup", "POST", {
    ...data,
  });

  setToken(response.token);
  return handleResponse(response);
};

export const signout = async () => {
  await removeToken();
  return true;
};
