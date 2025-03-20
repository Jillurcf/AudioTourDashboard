// import { baseApi } from "../api/baseApi";

import { baseApi } from "../api/baseApi";

// const putUpdateVolunteerApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         putUpdateVolunteer: builder.mutation({
//             query: ({ id, data }) => {
//                 console.log("Updating Volunteer with data:", data);

//                 return {
//                     url: `/volunteer/${id}`, // Endpoint with dynamic ID
//                     method: 'POST', // Use POST to allow `_method: "PUT"` in FormData
//                     body: data,
//                 };
//             },
//             invalidatesTags: ["Volunteers"], // Ensure this tag matches related queries
//         }),
//     }),
// });

// export const { usePutUpdateVolunteerMutation } = putUpdateVolunteerApi;

const putUpdateVolunteerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        putUpdateVolunteer: builder.mutation({
            query: ({ id, data }) => ({
                url: `/volunteer/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Volunteers'], // Invalidate 'Volunteers' tag on update
        }),
    }),
});

export const { usePutUpdateVolunteerMutation } = putUpdateVolunteerApi;