import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import cn from "clsx";
import { router } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface PaymentInfoStripeProps {
    label: string;
    value: string;
    labelStyle?: string;
    valueStyle?: string;
}

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
    const { items, getTotalItems, getTotalPrice } = useCartStore();

    // Mock cart data for development
    const mockItems = [
        {
            id: '1',
            name: "Classic Cheeseburger",
            description: "Beef patty, cheese, lettuce, tomato",
            image_url: require('@/assets/images/burger-one.png'),
            price: 25.99,
            quantity: 2
        },
        {
            id: '2',
            name: "Pepperoni Pizza",
            description: "Loaded with cheese and pepperoni slices",
            image_url: require('@/assets/images/pizza-one.png'),
            price: 30.99,
            quantity: 1
        },
        {
            id: '3',
            name: "Classic Burrito",
            description: "Bean and cheese burrito",
            image_url: require('@/assets/images/buritto.png'),
            price: 22.99,
            quantity: 1
        },
        {
            id: '4',
            name: "Mozzarella Sticks",
            description: "Crispy breaded cheese sticks with marinara sauce",
            image_url: require('@/assets/images/mozarella-sticks.png'),
            price: 15.99,
            quantity: 1
        },
        {
            id: '5',
            name: "Fresh Garden Salad",
            description: "Mixed greens with avocado and dressing",
            image_url: require('@/assets/images/salad.png'),
            price: 18.99,
            quantity: 2
        }
    ];

    const totalItems = items.length > 0 ? getTotalItems() : mockItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.length > 0 ? getTotalPrice() : mockItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={items.length > 0 ? items : mockItems}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
                ListEmptyComponent={() => (
                    <View className="items-center justify-center mt-10">
                        <Image 
                            source={require("@/assets/images/empty-state.png")}
                            className="w-60 h-60"
                            resizeMode="contain"
                        />
                        <Text className="text-lg font-semibold text-gray-600 mt-4">
                            Your cart is empty
                        </Text>
                        <Text className="text-gray-400 text-center mt-2 px-10 mb-6">
                            Looks like you haven't added anything to your cart yet
                        </Text>
                        <CustomButton 
                            title="Browse Menu" 
                            onPress={() => router.push("/(tabs)")}
                            containerClassName="w-40"
                        />
                    </View>
                )}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100 mb-5">
                                Payment Summary
                            </Text>

                            <PaymentInfoStripe
                                label={`Total Items (${totalItems})`}
                                value={`$${totalPrice.toFixed(2)}`}
                            />
                            <PaymentInfoStripe
                                label={`Delivery Fee`}
                                value={`$5.00`}
                            />
                            <PaymentInfoStripe
                                label={`Discount`}
                                value={`- $0.50`}
                                valueStyle="!text-success"
                            />
                            <View className="border-t border-gray-300 my-2" />
                            <PaymentInfoStripe
                                label={`Total`}
                                value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                                labelStyle="base-bold !text-dark-100"
                                valueStyle="base-bold !text-dark-100 !text-right"
                            />
                        </View>

                        <CustomButton 
                            title="Proceed to Checkout" 
                            onPress={() => router.push('/checkout')}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Cart
