import { baseApi } from "../api/baseApi";

const getAllAudioSpanish = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllAudioSpanish:builder.query({
            query:()=>`/admin/audio?language=spanish`,
            providesTags:["Audio"],
        })
    })
})

export const {useGetAllAudioSpanishQuery} =getAllAudioSpanish;