import ProfileComponent from '@/components/profile-component/ProfileComponent'
import StoreProvider from '@/store/provider'
import React from 'react'

const ProfilePage = () => {
  return (
    <StoreProvider>
        <ProfileComponent/>
    </StoreProvider>
  )
}

export default ProfilePage
