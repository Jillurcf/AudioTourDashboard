import { baseApi } from "../api/baseApi";

const putUpdateFaqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateFaq: builder.mutation({
            query: ({id, data}) => {
                console.log("Updating Faq with data:", data);

                return {
                    url: `/admin/faq/${id}`, 
                    method: 'PUT', 
                    body: data,
                };
            },
            invalidatesTags: ["faqs"], 
        }),
    }),
});

export const { useUpdateFaqMutation } = putUpdateFaqApi;
