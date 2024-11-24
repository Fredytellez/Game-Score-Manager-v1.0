import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4001/api/v1/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    // Obtiene la imagen de perfil
    getProfile: builder.query({
      query: (userId) => `/users/profile/${userId}/upload-image`,
      providesTags: ["Profile"],
    }),
    // Para actualizar la imagen de perfil
    updateProfile: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/profile/${userId}/upload-image`,
        method: "PUT",
       /*  body: "form-data", */
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetProfileQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
} = userApi;
