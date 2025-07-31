import { useLocalSearchParams, router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@/store/cart.store';
import { appwriteConfig } from '@/lib/appwrite';
import { useState } from 'react';

const FoodDetail = () => {
    const { id, name, description, price, image_url, rating, calories, protein } = useLocalSearchParams();
    const { addItem } = useCartStore();
    const [quantity, setQuantity] = useState(1);

    // Mock data for when parameters are not available
    const mockItems = [
        {
            $id: '1',
            name: "Classic Cheeseburger",
            description: "A juicy beef patty topped with melted cheese, crisp lettuce, fresh tomato, and our signature sauce on a toasted sesame bun. Made with premium ingredients and grilled to perfection.",
            image_url: require('@/assets/images/burger-one.png'),
            price: 25.99,
            rating: 4.5,
            calories: 550,
            protein: 25,
            category_name: "Burgers"
        },
        {
            $id: '2',
            name: "Deluxe Burger",
            description: "Double beef patty with extra cheese, bacon, caramelized onions, pickles, and special sauce. The ultimate burger experience.",
            image_url: require('@/assets/images/burger-two.png'),
            price: 29.99,
            rating: 4.8,
            calories: 750,
            protein: 35,
            category_name: "Burgers"
        },
        {
            $id: '3',
            name: "Pepperoni Pizza",
            description: "Classic Italian-style pizza loaded with premium pepperoni and mozzarella cheese on a hand-tossed crust.",
            image_url: require('@/assets/images/pizza-one.png'),
            price: 30.99,
            rating: 4.7,
            calories: 700,
            protein: 30,
            category_name: "Pizzas"
        }
    ];

    // Find item by id or use first mock item as fallback
    const currentItem = mockItems.find(item => item.$id === id) || mockItems[0];
    
    const displayName = name || currentItem.name;
    const displayDescription = description || currentItem.description;
    const displayPrice = price ? parseFloat(price as string) : currentItem.price;
    const displayImageUrl = image_url || currentItem.image_url;
    const displayRating = rating ? parseFloat(rating as string) : currentItem.rating;
    const displayCalories = calories ? parseInt(calories as string) : currentItem.calories;
    const displayProtein = protein ? parseInt(protein as string) : currentItem.protein;

    const imageSource = typeof displayImageUrl === 'string' 
        ? { uri: `${displayImageUrl}?project=${appwriteConfig.projectId}` }
        : displayImageUrl;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: id as string || currentItem.$id,
                name: displayName,
                price: displayPrice,
                image_url: displayImageUrl,
                customizations: []
            });
        }
        router.back();
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                >
                    <Text className="text-lg font-semibold">←</Text>
                </TouchableOpacity>
                <Text className="text-lg font-semibold">Food Details</Text>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                    <Text className="text-lg">♡</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Food Image */}
                <View className="items-center px-5 mb-6">
                    <View 
                        className="w-full h-80 rounded-3xl bg-gray-50 items-center justify-center p-8"
                        style={Platform.OS === 'android' ? { elevation: 2 } : {}}
                    >
                        <Image 
                            source={imageSource}
                            className="w-full h-full"
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View className="px-5">
                    {/* Food Info */}
                    <View className="mb-6">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-2xl font-bold text-gray-800 flex-1" numberOfLines={2}>
                                {displayName}
                            </Text>
                            <View className="flex-row items-center ml-4">
                                <Text className="text-yellow-500 mr-1">★</Text>
                                <Text className="text-gray-600 font-medium">{displayRating}</Text>
                            </View>
                        </View>
                        
                        <Text className="text-3xl font-bold text-primary mb-4">
                            ${displayPrice.toFixed(2)}
                        </Text>
                        
                        <Text className="text-gray-600 text-base leading-6">
                            {displayDescription}
                        </Text>
                    </View>

                    {/* Nutritional Info */}
                    <View className="mb-8">
                        <Text className="text-lg font-semibold text-gray-800 mb-4">Nutritional Information</Text>
                        <View className="flex-row justify-between">
                            <View className="bg-gray-50 px-4 py-3 rounded-xl flex-1 mr-3">
                                <Text className="text-sm text-gray-500 mb-1">Calories</Text>
                                <Text className="text-lg font-semibold text-gray-800">{displayCalories}</Text>
                            </View>
                            <View className="bg-gray-50 px-4 py-3 rounded-xl flex-1 ml-3">
                                <Text className="text-sm text-gray-500 mb-1">Protein</Text>
                                <Text className="text-lg font-semibold text-gray-800">{displayProtein}g</Text>
                            </View>
                        </View>
                    </View>

                    {/* Quantity Selector */}
                    <View className="mb-6">
                        <Text className="text-lg font-semibold text-gray-800 mb-3">Quantity</Text>
                        <View className="flex-row items-center">
                            <TouchableOpacity 
                                onPress={decreaseQuantity}
                                className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"
                            >
                                <Text className="text-xl font-semibold text-gray-600">-</Text>
                            </TouchableOpacity>
                            <Text className="text-xl font-semibold mx-6 min-w-[30px] text-center">
                                {quantity}
                            </Text>
                            <TouchableOpacity 
                                onPress={increaseQuantity}
                                className="w-12 h-12 rounded-full bg-primary items-center justify-center"
                            >
                                <Text className="text-xl font-semibold text-white">+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View className="px-5 pb-8 pt-4">
                <TouchableOpacity 
                    className="bg-primary py-4 rounded-2xl items-center"
                    onPress={handleAddToCart}
                    style={Platform.OS === 'android' ? { elevation: 2 } : {}}
                >
                    <Text className="text-white text-lg font-semibold">
                        Add {quantity} to Cart - ${(displayPrice * quantity).toFixed(2)}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FoodDetail;