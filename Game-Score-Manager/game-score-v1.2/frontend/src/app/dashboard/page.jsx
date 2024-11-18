import DashboardPageComponent from '@/components/dashboard-component/DashboardComponent'
import StoreProvider from '@/store/provider'
import React from 'react'

const dashboardPage = () => {
  return (
    <StoreProvider>
      <DashboardPageComponent/>
    </StoreProvider>
  )
}

export default dashboardPage

