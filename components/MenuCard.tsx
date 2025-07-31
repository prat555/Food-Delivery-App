import { appwriteConfig } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

const MenuCard = ({ item: { $id, image_url, name, price, description, rating, calories, protein }}: { item: MenuItem}) => {
    const imageSource = typeof image_url === 'string' 
        ? { uri: `${image_url}?project=${appwriteConfig.projectId}` }
        : image_url;
    const { addItem } = useCartStore();

    const handleCardPress = () => {
        router.push({
            pathname: '/food-detail/[id]',
            params: { 
                id: $id, 
                name, 
                description, 
                price: price.toString(),
                image_url: typeof image_url === 'string' ? image_url : '',
                rating: rating?.toString() || '4.5',
                calories: calories?.toString() || '500',
                protein: protein?.toString() || '20'
            }
        });
    };

    return (
        <TouchableOpacity 
            className="bg-white p-4 rounded-3xl" 
            style={Platform.OS === 'android' ? { elevation: 3, shadowColor: '#878787'}: {}}
            onPress={handleCardPress}
        >
            <View className="items-center justify-center mb-4">
                <Image 
                    source={imageSource} 
                    className="w-32 h-32" 
                    resizeMode="contain" 
                />
            </View>
            <View className="items-start">
                <Text className="text-lg font-semibold text-gray-800 mb-1" numberOfLines={1}>{name}</Text>
                <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>{description}</Text>
                <Text className="text-lg font-bold text-primary mb-3">${price.toFixed(2)}</Text>
                <TouchableOpacity 
                    className="bg-primary py-2 px-4 rounded-xl w-full items-center"
                    onPress={() => addItem({ id: $id, name, price, image_url, customizations: []})}
                >
                    <Text className="text-white font-semibold">Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
export default MenuCard
