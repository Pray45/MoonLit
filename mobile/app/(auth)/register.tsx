import { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';

function Field({
  label,
  placeholder,
  secureTextEntry,
}: {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
}) {
  return (
    <View className="my-2 space-y-2">
      <Text className="mb-2 ml-3 text-lg font-medium text-black">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        secureTextEntry={secureTextEntry}
        className="rounded-2xl border border-white/10 bg-[#FFE3BF] px-4 py-4 text-base text-black"
      />
    </View>
  );
}

export default function RegisterRoute() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      className="bg-background flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <Image
          className="h-[42%] w-full"
          source={require('../../assets/login.png')}
          resizeMode="cover"
        />

        <View className={`flex-1 px-6 ${keyboardOpen ? 'mt-10' : 'mt-2'}`}>
          <Text className="text-4xl font-bold text-black">Create New Account</Text>

          <View className="mt-8">
            <Field label="First Name" placeholder="Enter your name" />
            <Field label="Email Address" placeholder="Enter your email" />
            <Field label="Password" placeholder="Enter your password" secureTextEntry />

            <Pressable
              onPress={() => router.replace('/(tabs)')}
              className="mt-6 rounded-2xl bg-black px-4 py-4">
              <Text className="text-center text-xl font-bold text-white">Next</Text>
            </Pressable>

            <View className="mt-6 flex-row justify-center">
              <Text className="text-base text-black/70">Already have an account? </Text>
              <Pressable onPress={() => router.replace('/(auth)')}>
                <Text className="text-base font-bold text-orange-600">Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
