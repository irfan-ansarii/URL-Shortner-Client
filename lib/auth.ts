"use server";
import { fetchApi } from "./fetch-api";
import { cookies } from "next/headers";
import { handleResponse } from "./utils";

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

  setToken(response.token);

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
  removeToken();
  return true;
};

const setToken = (token: string) => {
  const days = 7 * 24 * 60 * 60 * 1000;
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    expires: Date.now() + days,
  });
};

const removeToken = () => {
  cookies().set({
    name: "token",
    value: "",
    httpOnly: true,
    expires: 0,
  });
};
