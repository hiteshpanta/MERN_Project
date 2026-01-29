import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const base = 'https://mern-project-ktld.onrender.com';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mern-project-ktld.onrender.com/api' }),
  endpoints: (builder) => ({})
  
});