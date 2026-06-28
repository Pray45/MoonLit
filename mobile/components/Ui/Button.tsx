import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const Button = ({ link, icon }: { link: string; icon: IconName }) => {
  return (
    <Pressable
      onPress={() => {
        router.replace(link as any);
      }}
      className="h-12 w-12 items-center justify-center rounded-full bg-zinc-500">
      <Ionicons name={icon} size={24} color="white" />
    </Pressable>
  );
};

export default Button;
