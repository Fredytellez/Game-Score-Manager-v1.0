"use client"
import RegisterComponent from '@/components/register-component/RegisterComponent'
import StoreProvider from '@/store/provider'
import React from 'react'

const registerPage = () => {
  return (
    <StoreProvider>
        <RegisterComponent/>
    </StoreProvider>
  )
}

export default registerPage
