import { baseApi } from "../api/baseApi";

// Update the API query to accept multiple filter parameters
const getAllProductListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProductList: builder.query({
      query: ({ search = "", category = "", min_price = 0, max_price = 10000 } = {}) => {
        // Construct the query string with the provided filters
        const params = new URLSearchParams({
          search,        // Add the search term
          category,      // Add the category filter
          min_price: min_price.toString(),  // Convert min_price to string
          max_price: max_price.toString(),  // Convert max_price to string
        });

        return {
          url: `/productList?${params.toString()}`, // Append the query parameters
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const { useAllProductListQuery } = getAllProductListApi;
