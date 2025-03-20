import { baseApi } from "../api/baseApi";


const getAllCategoriesApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        allCategories:builder.query({
            query:() => `/admin/category`,
            providesTags: ["Categories"],
        })
    })
})

export const {useAllCategoriesQuery} = getAllCategoriesApi;