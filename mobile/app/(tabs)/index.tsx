import { View, Button } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useAuthStore } from 'zustand/authStore';
import { router } from 'expo-router/build/exports';

const index = () => {

  const logout = useAuthStore((state) => state.logout);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Logout error:', e);
    }
  }

  useEffect(() => {
    if (!loggedIn) {
      router.replace('/(auth)');
    }
  }, [loggedIn]);

  return (
    <View className='flex-1 items-center justify-center'>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

export default index