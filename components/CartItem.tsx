import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {images} from "@/constants";

const CartItem = ({ item }: { item: CartItemType }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();
    const imageSource = typeof item.image_url === 'string' 
        ? { uri: item.image_url }
        : item.image_url;

    return (
        <View className="flex-row items-center p-3 bg-white rounded-2xl mb-4 shadow-sm">
            <View className="bg-gray-50 p-2 rounded-xl mr-4">
                <Image
                    source={imageSource}
                    className="w-20 h-20"
                    resizeMode="contain"
                />
            </View>

            <View className="flex-1">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-800 mb-1">{item.name}</Text>
                        <Text className="text-sm text-gray-500 mb-2">{item.description}</Text>
                    </View>
                    <TouchableOpacity 
                        className="p-2" 
                        onPress={() => removeItem(item.id, item.customizations!)}
                    >
                        <Image 
                            source={images.trash}
                            className="w-5 h-5"
                            tintColor="#FF4B4B"
                        />
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold text-primary">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </Text>

                    <View className="flex-row items-center bg-gray-50 rounded-xl">
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.customizations!)}
                            className="p-2"
                        >
                            <Image
                                source={images.minus}
                                className="w-5 h-5"
                                resizeMode="contain"
                                tintColor="#FF9C01"
                            />
                        </TouchableOpacity>

                        <Text className="px-4 font-semibold">{item.quantity || 1}</Text>

                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.customizations!)}
                            className="p-2"
                        >
                            <Image
                                source={images.plus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => removeItem(item.id, item.customizations!)}
                className="flex-center"
            >
                <Image source={images.trash} className="size-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;
