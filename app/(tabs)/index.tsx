import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchBar from '@/components/SearchBar';
import { images } from "@/constants";
import useAuthStore from '@/store/auth.store';

const CategoryCard = ({ title, image, onPress }: { title: string, image: any, onPress?: () => void }) => (
  <TouchableOpacity 
    className="items-center mr-6"
    onPress={onPress}
  >
    <View className="w-16 h-16 rounded-2xl bg-gray-50 items-center justify-center mb-2">
      <Image 
        source={image}
        className="w-8 h-8"
        resizeMode="contain"
      />
    </View>
    <Text className="text-sm font-medium text-gray-700">{title}</Text>
  </TouchableOpacity>
);

const PopularItem = ({ item, onPress }: { item: any, onPress?: () => void }) => (
  <TouchableOpacity 
    className="w-44 mr-6"
    onPress={onPress}
  >
    <View className="w-full h-44 rounded-3xl bg-gray-50 mb-3 p-4">
      <Image 
        source={item.image}
        className="w-full h-full"
        resizeMode="contain"
      />
    </View>
    <View>
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      <Text className="text-sm text-gray-500 mb-2">{item.description}</Text>
      <Text className="text-base font-semibold text-primary">${item.price}</Text>
    </View>
  </TouchableOpacity>
);

export default function Index() {
  const { user } = useAuthStore();
  
  // Mock data
  const mockCategories = [
    { 
      id: '1', 
      name: "Burgers", 
      icon: require('@/assets/images/burger-one.png')
    },
    { 
      id: '2', 
      name: "Pizza", 
      icon: require('@/assets/images/pizza-one.png')
    },
    { 
      id: '3', 
      name: "Salads", 
      icon: require('@/assets/images/salad.png')
    },
    { 
      id: '4', 
      name: "Sides", 
      icon: require('@/assets/images/fries.png')
    },
  ];

  const mockPopularItems = [
    {
      id: '1',
      name: "Classic Cheeseburger",
      description: "Beef patty with cheese",
      image: require('@/assets/images/burger-one.png'),
      price: 25.99
    },
    {
      id: '2',
      name: "Pepperoni Pizza",
      description: "Classic pepperoni pizza",
      image: require('@/assets/images/pizza-one.png'),
      price: 30.99
    },
    {
      id: '3',
      name: "Mozzarella Sticks",
      description: "Crispy cheese sticks",
      image: require('@/assets/images/mozarella-sticks.png'),
      price: 15.99
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5">
          {/* Header */}
          <View className="flex-row items-center justify-between mt-5 mb-8">
            <View>
              <Text className="text-gray-500 text-base mb-1">Deliver to</Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-lg font-semibold mr-2">Home</Text>
                <Image source={images.arrowDown} className="w-4 h-4" resizeMode="contain" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
              <Image 
                source={require("@/assets/images/avatar.png")}
                className="w-12 h-12 rounded-full"
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="mb-8">
            <SearchBar />
          </View>

          {/* Categories */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-semibold">Categories</Text>
              <TouchableOpacity>
                <Text className="text-primary">See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
            >
              {mockCategories.map(category => (
                <CategoryCard 
                  key={category.id}
                  title={category.name}
                  image={category.icon}
                  onPress={() => router.push(`/(tabs)/search?category=${category.name.toLowerCase()}`)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Popular Items */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-semibold">Popular Now</Text>
              <TouchableOpacity>
                <Text className="text-primary">See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
            >
              {mockPopularItems.map(item => (
                <PopularItem 
                  key={item.id}
                  item={item}
                  onPress={() => router.push({
                    pathname: '/food-detail/[id]',
                    params: { 
                      id: item.id, 
                      name: item.name, 
                      description: item.description, 
                      price: item.price.toString(),
                      image_url: '',
                      rating: '4.5',
                      calories: '500',
                      protein: '20'
                    }
                  })}
                />
              ))}
            </ScrollView>
          </View>

          {/* Special Offers */}
          <View>
            <Text className="text-xl font-semibold mb-4">Special Offers</Text>
            
            <View className="bg-primary/10 p-4 rounded-3xl mb-8">
              <View className="flex-row items-center">
                <View className="flex-1 pr-4">
                  <Text className="text-2xl font-bold text-primary mb-2">
                    30% OFF
                  </Text>
                  <Text className="text-base text-gray-700 mb-4">
                    On your first order
                  </Text>
                  <TouchableOpacity className="bg-primary py-3 px-6 rounded-xl self-start">
                    <Text className="text-white font-semibold">Order Now</Text>
                  </TouchableOpacity>
                </View>
                
                <Image 
                  source={require("@/assets/images/burger-one.png")}
                  className="w-32 h-32"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}