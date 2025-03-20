import { baseApi } from "../api/baseApi";

const getAllAudio = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllAudios:builder.query({
            query:()=>`/admin/audio?language=english`,
            providesTags:["Audio"],
        })
    })
})

export const {useGetAllAudiosQuery} =getAllAudio;