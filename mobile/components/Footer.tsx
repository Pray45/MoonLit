import { View, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router/build/exports';

const Footer = ({ highlight }: { highlight: string }) => {
  return (
    <View className="absolute bottom-0 w-full">
      <Image className="absolute bottom-[-20] w-full" source={require('../assets/base.png')} />
      <View className="z-10 flex-row items-center justify-around py-8 pb-0.5">

        <Pressable className="w-12 h-12" onPress={() => router.replace('/(tabs)/Profile')}>
          <Ionicons
            className={highlight === 'profile' ? 'text-amber-400' : ''}
            name="book-outline"
            size={24}
            color="white"
          />
        </Pressable>


        <Pressable className="w-12 h-12 mb-4 pb-4" onPress={() => router.replace('/(tabs)/bookmark')}>
          <Ionicons
            className={highlight === 'bookmark' ? 'text-amber-400' : ''}
            name="bookmark-outline"
            size={24}
            color="white"
          />
        </Pressable>


        <Pressable className="w-12 h-12 mb-4" onPress={() => router.replace('/(tabs)')}>
          <Ionicons
            className={highlight === 'home' ? 'text-amber-400' : ''}
            name="home-outline"
            size={24}
            color="white"
          />
        </Pressable>


        <Pressable className="w-12 h-12 mb-4" onPress={() => router.replace('/(tabs)/Listen')}>
          <Ionicons
            className={highlight === 'listen' ? 'text-amber-400' : ''}
            name="headset-outline"
            size={24}
            color="white"
          />
        </Pressable>


        <Pressable className="w-12 h-12 mb-4" onPress={() => router.replace('/(tabs)/event')}>
          <Ionicons
            className={highlight === 'event' ? 'text-amber-400' : ''}
            name="sparkles-outline"
            size={24}
            color="white"
          />
        </Pressable>

      </View>
    </View>
  );
};

export default Footer;