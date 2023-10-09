import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (body) => ({
                url: "/job",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Jobs"]
        }),
        apply: builder.mutation({
            query: (body) => ({
                url: "/apply",
                method: "PATCH",
                body,
            }),
        }),
        question: builder.mutation({
            query: (body) => ({
                url: "/query",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Job"]
        }),
        reply: builder.mutation({
            query: (body) => ({
                url: "/reply",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Job"]
        }),
        getJobs: builder.query({
            query: () => ({
                url: "/jobs",
                method: "GET",
            }),
            providesTags: ["Jobs"]
        }),
        jobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`,
                method: "GET",
            })
        }),
        getAppliedJobs: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
                method: "GET",
            }),
            providesTags: ["Job"]
        })
    })
})


export const { usePostJobMutation, useGetJobsQuery, useJobByIdQuery, useApplyMutation, useGetAppliedJobsQuery, useQuestionMutation, useReplyMutation } = jobApi;