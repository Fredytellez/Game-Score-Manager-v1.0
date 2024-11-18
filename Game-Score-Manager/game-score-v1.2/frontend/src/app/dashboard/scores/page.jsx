import DashboardScoresComponent from '@/components/dashboard-scores/DashboardScoresComponent'
import StoreProvider from '@/store/provider'
import React from 'react'

const dashboardScoresPage = () => {
  return (
    <StoreProvider>
        <DashboardScoresComponent/>
    </StoreProvider>
  )
}

export default dashboardScoresPage
