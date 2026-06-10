import { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
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
      <Text className="mb-2 ml-3 text-xl font-medium text-black">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        secureTextEntry={secureTextEntry}
        className="rounded-2xl border border-white/10 bg-[#FFE3BF] px-4 py-4 text-base text-black"
      />
    </View>
  );
}

export default function AuthRoute() {
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
        <Image className="h-3/5 w-full" source={require('../../assets/login.png')} />

        <View className={`flex-1 justify-center px-6 ${keyboardOpen ? 'mt-20' : ''}`}>
          <Field label="Email" placeholder="you@example.com" />

          <Field label="Password" placeholder="Your password" secureTextEntry />

          <Pressable
            onPress={() => router.replace('/(tabs)')}
            className="mt-5 rounded-2xl bg-black px-4 py-4">
            <Text className="text-center text-xl font-bold text-white">Sign in</Text>
          </Pressable>
          <View className="mt-6 flex-row justify-center">
            <Text className="text-base text-black/70">Don't have an account? </Text>
            <Pressable onPress={() => router.replace('/(auth)/register')}>
              <Text className="text-base font-bold text-orange-600">Register</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
