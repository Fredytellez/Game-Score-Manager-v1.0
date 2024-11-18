import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      // Agregar el token de autenticación si existe
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Profile'], // agrega el tag profile
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "admin/users/",
    }),
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
      query: (userId) => `/users/profile/${userId}`,
      providesTags: ["Profile"],
    }),
    // Para actualizar la imagen de perfil
    updateProfile: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `/users/profile/${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
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
