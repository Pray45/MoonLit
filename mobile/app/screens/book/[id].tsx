import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ButtonUI from "components/Ui/ButtonUI"
import { Ionicons } from '@expo/vector-icons';
import Title from 'components/Title';

export default function Listen({ Book }: any) {
  const book = Book || {
    "id": 2,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "genre": "Fiction",
    "cover": "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
    "description": "fhjksdajklfashjklfsdfhsd fshkf heiofhsofhsofdlskfjkls fjskldfjslkdfj klsdjf sdkfj lksdjf klsdj klfaj asdkl fsk jfasldk aslkd f fhjksdajklfashjklfsdfhsd fshkf heiofhsofhsofdlskfjkls fjskldfjslkdfj klsdjf sdkfj lksdjf klsdj klfaj asdkl fsk jfasldk aslkd f fhjksdajklfashjklfsdfhsd fshkf heiofhsofhsofdlskfjkls fjskldfjslkdfj klsdjf sdkfj lksdjf klsdj klfaj asdkl fsk jfasldk aslkd f fhjksdajklfashjklfsdfhsd fshkf heiofhsofhsofdlskfjkls fjskldfjslkdfj klsdjf sdkfj lksdjf klsdj klfaj asdkl fsk jfasldk aslkd f fhjksdajklfashjklfsdfhsd fshkf heiofhsofhsofdlskfjkls fjskldfjslkdfj klsdjf sdkfj lksdjf klsdj klfaj asdkl fsk jfasldk aslkd f fhjksdajklfashjklfsdfhsd fshkf heiofhsofhsofdlskfjkls fjskldfjslkdfj klsdjf sdkfj lksdjf klsdj klfaj asdkl fsk jfasldk aslkd f "
  };
  return (
    <View className="flex-1 bg-background">
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView>
          <Header heading={book.title} />
          <View className="p-10">

            <View className="flex-row bg-background items-center">
              <Image source={{ uri: book.cover }} className="w-36 h-48 border-2 mb-4" />
              <View className="flex justify-center ml-6">
                <Text className="text-2xl font-bold mb-4">{book.title}</Text>
                <Text className="pt-0.5 text-lg">by {book.author}</Text>
                <Text className="pt-0.5 text-md">Genre: {book.genre}</Text>
                <Text className="pt-0.5 text-md">language: {book.language}</Text>
                <Text className="pt-0.5 text-md">Publishing Year: {book.publishingyear}</Text>
              </View>
            </View>

            <View className="mt-4 flex gap-2">
              <ButtonUI title="Buy me a coffee" icon="cafe" link="/listen" color="background" />
              <ButtonUI title="Listen to the book" icon="play" link="/listen" color="org" />
            </View>

            <View className="mt-8 flex-row justify-center border-2 items-center ">
              <Ionicons name="cloud-download-outline" size={32} color="black" className='p-9 pr-12' />
              <Ionicons name="bookmark-outline" size={32} color="black" className='border-x-2 px-12 py-9' />
              <Ionicons name="list-outline" size={32} color="black" className='p-9 pl-12' />
            </View>

            <View className="mt-8">
              <Title title="Description" readmore={false} />
              <Text className="text-lg">{book.description}</Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
      <Footer highlight="home" />
    </View>
  );
}
