import { mainApi } from "../../app/mainApi";





const authApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({


    userLogin: builder.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body: body
      })
    }),

    userRegister: builder.mutation({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body: body
      })
    }),











  })

});
export const { useUserLoginMutation, useUserRegisterMutation } = authApi;