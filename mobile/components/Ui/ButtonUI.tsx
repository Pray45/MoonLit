import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function ButtonUI({ title, link, icon, color }: { title: string; link: string; icon: IconName; color: string }) {
  return (
    <Pressable
      onPress={() => {
        router.replace(link as any);
      }}
      className={`w-full h-16 bg-${color} border-2 flex-row items-center justify-center gap-4`}>
        <Ionicons name={icon} size={24} color="black" />
      <Text className="text-black text-xl">{title}</Text>
    </Pressable>
  );
}