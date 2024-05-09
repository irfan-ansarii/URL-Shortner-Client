export interface Link {
  id: number;
  title: string;
  shortId: string;
  longUrl: string;
  shortUrl: string;
  status: "active" | "archived";
  comments: string | undefined;
  favicon: string | undefined;
  clickCount: number;
  lastClickedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Click {
  id: number;
  linkId: number;
  userId: number;
  ipAddress: string;
  referrer: string;
  country: string;
  state: string;
  browser: string;
  deviceType: string;
  operatingSystem: string;
  createdAt: string;
  updatedAt: string;
  link: Link;
}

export interface User {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  email: string;
  status: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface Token {
  id: number;
  name: string;
  token: string;
  userId: string;
  lastUsedAt: string | undefined;
  expireAt: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface Webhook {
  id: number;
  events: string[];
  url: string;
  userId: string;
  lastActiveAt: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  size: number;
  pages: number;
  total: number;
}
