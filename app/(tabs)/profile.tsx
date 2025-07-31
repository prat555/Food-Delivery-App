import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { router } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileOption = ({ icon, title, onPress }: { icon: any, title: string, onPress?: () => void }) => (
  <TouchableOpacity 
    className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-3"
    onPress={onPress}
  >
    <Image 
      source={icon}
      className="w-6 h-6"
      resizeMode="contain"
      tintColor="#5D5F6D"
    />
    <Text className="ml-3 text-base font-medium text-gray-700">{title}</Text>
  </TouchableOpacity>
)

const Profile = () => {
  const { user, setIsAuthenticated, setUser } = useAuthStore();

  // Mock user data for development
  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Food Street, Cuisine City"
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-5">
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="relative">
            <Image 
              source={require("@/assets/images/avatar.png")}
              className="w-24 h-24 rounded-full mb-3"
            />
            <TouchableOpacity 
              className="absolute bottom-2 right-0 bg-primary p-2 rounded-full"
              onPress={() => {}}
            >
              <Image 
                source={images.pencil}
                className="w-4 h-4"
                tintColor="white"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-semibold text-dark-100">{user?.name || mockUser.name}</Text>
          <Text className="text-gray-500">{user?.email || mockUser.email}</Text>
        </View>

        {/* Profile Options */}
        <View>
          <Text className="text-lg font-semibold mb-4">Account Settings</Text>
          
          <ProfileOption 
            icon={images.person}
            title="Edit Profile"
            onPress={() => {}}
          />
          <ProfileOption 
            icon={images.location}
            title="Saved Addresses"
            onPress={() => {}}
          />
          <ProfileOption 
            icon={images.clock}
            title="Order History"
            onPress={() => {}}
          />
          <ProfileOption 
            icon={images.dollar}
            title="Payment Methods"
            onPress={() => {}}
          />
          
          <View className="h-6" />
          
          <ProfileOption 
            icon={images.logout}
            title="Logout"
            onPress={() => {
              setIsAuthenticated(false);
              setUser(null);
              router.push("/(auth)/signin");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile