import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleResponse = (response: any) => {
  const isError = !response || response.status >= 400;

  if (isError) throw response;

  return response;
};

export const generateNanoId = (length = 7) => {
  const randomString = nanoid(length);
  return randomString;
};

export function capitalize(text: string) {
  if (!text || text.length === 0) {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const getCountryName = (code: string) => {
  try {
    const capitalizedCode = code.toUpperCase();
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    const name = regionNames.of(capitalizedCode);
    return name;
  } catch (error) {
    return "Unknown";
  }
};

export const COLORS = [
  "#fb6f92",
  "#ffd60a",
  "#f95738",
  "#06d6a0",
  "#b23a48",
  "#6247aa",
];
