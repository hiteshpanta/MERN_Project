import { mainApi } from "../../app/mainApi"


const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getTop5Product: builder.query({
      query: () => ({
        url: '/top-5',
        method: 'GET'
      }),
      providesTags: ['Product']
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),

    getProducts: builder.query({
      query: (query) => ({
        url: '/products',
        method: 'GET',
        params: query
      }),
      providesTags: ['Product']
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        headers: {
          Authorization: data.token
        },
        body: data.body
      }),
      invalidatesTags: ['Product']
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: 'PATCH',
        headers: {
          Authorization: data.token
        },
        body: data.body
      }),
      invalidatesTags: ['Product']
    }),

    removeProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: 'DELETE',
        headers: {
          Authorization: data.token
        },
      }),
      invalidatesTags: ['Product']
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/products/reviews/${data.id}`,
        method: 'POST',
        headers: {
          Authorization: data.token
        },
        body: data.body
      }),
      invalidatesTags: ['Product']
    }),

    getReviews: builder.query({
      query: (id) => ({
        url: `/products/reviews/${id}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),


  })
});


export const { useGetProductsQuery, useCreateProductMutation, useRemoveProductMutation, useGetProductQuery, useUpdateProductMutation, useAddReviewMutation, useGetReviewsQuery, useGetTop5ProductQuery } = productApi;