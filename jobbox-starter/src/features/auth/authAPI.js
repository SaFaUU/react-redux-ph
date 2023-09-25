import apiSlice from "../api/apiSlice";

const authAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/user",
                method: "POST",
                body,
            }),
        })
    }),
})

export const { useRegisterMutation } = authAPI;