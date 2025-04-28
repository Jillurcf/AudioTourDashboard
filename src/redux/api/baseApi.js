import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ivs-dev.net/api",
    // baseUrl: "http://137.184.184.228/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("accept", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: [
    "Users",
    "Audio",
    "faqs",
    "Settings",
    "Notifications",
    "Categories",
    "Subscripton",
  ],
  endpoints: () => ({}),
});
