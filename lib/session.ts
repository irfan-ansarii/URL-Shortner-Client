"use server";
import { cookies } from "next/headers";

export const setToken = async (token: string) => {
  const days = 7 * 24 * 60 * 60 * 1000;
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    expires: Date.now() + days,
  });
};

export const removeToken = async () => {
  cookies().set({
    name: "token",
    value: "",
    httpOnly: true,
    expires: 0,
  });
};
