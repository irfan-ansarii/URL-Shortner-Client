import { fetchApi } from "./fetch-api";
import { handleResponse } from "./utils";

/** profile route */
export const getProfile = async () => {
  const response = await fetchApi("/me", "GET");

  return handleResponse(response);
};

export const updateProfile = async (data: Record<string, any>) => {
  const response = await fetchApi("/me", "PUT", {
    ...data,
  });

  return handleResponse(response);
};

export const deleteProfile = async () => {
  const response = await fetchApi("/me", "DELETE");
  return handleResponse(response);
};

/** links api */
export const getLinks = async (query: Record<string, any>) => {
  const params = new URLSearchParams(query);

  const response = await fetchApi(`/links?${params}`, "GET");

  return handleResponse(response);
};

export const getLink = async (id: number) => {
  const response = await fetchApi(`/links/${id}`, "GET");
  return handleResponse(response);
};

export const getLinkByShortId = async (key: string) => {
  const response = await fetchApi(`/links/${key}/availability`, "GET");
  return handleResponse(response);
};

export const getLinksSummary = async () => {
  const response = await fetchApi(`/links/summary`, "GET");

  return handleResponse(response);
};

export const createLink = async (data: Record<string, any>) => {
  const response = await fetchApi(`/links`, "POST", {
    ...data,
  });
  return handleResponse(response);
};

export const updateLink = async (id: number, data: Record<string, any>) => {
  const response = await fetchApi(`/links/${id}`, "PUT", {
    ...data,
  });
  return handleResponse(response);
};

export const deleteLink = async (id: number) => {
  const response = await fetchApi(`/links/${id}`, "DELETE");

  return handleResponse(response);
};

/**
 * clicks api
 * @returns
 */
export const getClicks = async (query: Record<string, any>) => {
  const params = new URLSearchParams(query);
  const response = await fetchApi(`/clicks?${params}`, "GET");

  return handleResponse(response);
};
export const getClik = async (id: number) => {
  const response = await fetchApi(`/clicks/${id}`, "GET");

  return handleResponse(response);
};

/**
 * analytics routes starts here
 * @param query
 * @returns
 */
export const getAnalytics = async (query?: Record<string, any>) => {
  const params = new URLSearchParams(query);

  const response = await fetchApi(`/analytics?${params}`, "GET");

  return handleResponse(response);
};

export const getTimeseries = async (query?: Record<string, any>) => {
  const params = new URLSearchParams(query);

  const response = await fetchApi(`/analytics/timeseries?${params}`, "GET");

  return handleResponse(response);
};

export const getAnalytic = async (id: number, query?: Record<string, any>) => {
  const params = new URLSearchParams(query);

  const response = await fetchApi(`/analytics/${id}?${params}`, "GET");
  return handleResponse(response);
};

export const getSingleTimeseries = async (
  id: number,
  query?: Record<string, any>
) => {
  const params = new URLSearchParams(query);

  const response = await fetchApi(
    `/analytics/${id}/timeseries?${params}`,
    "GET"
  );

  return handleResponse(response);
};

/** get api tokens */
export const createToken = async (data: Record<string, any>) => {
  const response = await fetchApi(`/tokens`, "POST", {
    ...data,
  });

  return handleResponse(response);
};

export const getTokens = async () => {
  const response = await fetchApi(`/tokens`, "GET");

  return handleResponse(response);
};
export const getToken = async (id: number) => {
  const response = await fetchApi(`/tokens/${id}`, "GET");

  return handleResponse(response);
};

export const deactivateToken = async (id: number) => {
  const response = await fetchApi(`/tokens/${id}`, "PUT");

  return handleResponse(response);
};

export const deleteToken = async (id: number) => {
  const response = await fetchApi(`/tokens/${id}`, "DELETE");

  return handleResponse(response);
};

/** webhook */

/** get api tokens */
export const createWebhook = async (data: Record<string, any>) => {
  const response = await fetchApi(`/webhooks`, "POST", {
    ...data,
  });

  return handleResponse(response);
};

export const getWebhooks = async () => {
  const response = await fetchApi(`/webhooks`, "GET");

  return handleResponse(response);
};
export const getWebhook = async (id: number) => {
  const response = await fetchApi(`/webhooks/${id}`, "GET");

  return handleResponse(response);
};

export const updateWebhook = async (id: number) => {
  const response = await fetchApi(`/webhooks/${id}`, "PUT");

  return handleResponse(response);
};

export const deleteWebhook = async (id: number) => {
  const response = await fetchApi(`/webhooks/${id}`, "DELETE");

  return handleResponse(response);
};
