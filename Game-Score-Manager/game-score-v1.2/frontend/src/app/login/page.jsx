"use client";

import LoginComponent from "@/components/login-component/LoginComponent";
import StoreProvider from "@/store/provider";


export default function LoginUserPage() {

  return (
    <StoreProvider>
      <LoginComponent/>
    </StoreProvider>
  );
}
