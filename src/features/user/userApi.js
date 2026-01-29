import { mainApi } from "../../app/mainApi";






const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({


    getUser: builder.query({
      query: (token) => ({
        url: `/users`,
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['User']
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: 'PATCH',
        headers: {
          Authorization: data.token
        },
        body: data.body
      }),
      invalidatesTags: ['User']
    }),


  })
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;