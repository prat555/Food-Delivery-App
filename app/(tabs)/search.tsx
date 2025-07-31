import CartButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";

const Search = () => {
    const { category, query } = useLocalSearchParams<{query: string; category: string}>()

    // Mock data for development
    const mockMenu = [
        {
            $id: '1',
            name: "Classic Cheeseburger",
            description: "Beef patty, cheese, lettuce, tomato",
            image_url: require('@/assets/images/burger-one.png'),
            price: 25.99,
            rating: 4.5,
            calories: 550,
            category_name: "Burgers"
        },
        {
            $id: '2',
            name: "Deluxe Burger",
            description: "Double patty with extra toppings",
            image_url: require('@/assets/images/burger-two.png'),
            price: 29.99,
            rating: 4.8,
            calories: 750,
            category_name: "Burgers"
        },
        {
            $id: '3',
            name: "Pepperoni Pizza",
            description: "Loaded with cheese and pepperoni",
            image_url: require('@/assets/images/pizza-one.png'),
            price: 30.99,
            rating: 4.7,
            calories: 700,
            category_name: "Pizzas"
        },
        {
            $id: '4',
            name: "Fresh Salad",
            description: "Mixed greens with avocado",
            image_url: require('@/assets/images/salad.png'),
            price: 18.99,
            rating: 4.5,
            calories: 320,
            category_name: "Salads"
        },
        {
            $id: '5',
            name: "Classic Burrito",
            description: "Bean and cheese burrito",
            image_url: require('@/assets/images/buritto.png'),
            price: 22.99,
            rating: 4.6,
            calories: 550,
            category_name: "Burritos"
        },
        {
            $id: '6',
            name: "Mozzarella Sticks",
            description: "Crispy breaded cheese sticks with marinara sauce",
            image_url: require('@/assets/images/mozarella-sticks.png'),
            price: 15.99,
            rating: 4.4,
            calories: 380,
            category_name: "Sides"
        },
        {
            $id: '7',
            name: "BBQ Bacon Burger",
            description: "Smoky BBQ sauce with crispy bacon",
            image_url: require('@/assets/images/burger-one.png'),
            price: 28.99,
            rating: 4.6,
            calories: 680,
            category_name: "Burgers"
        },
        {
            $id: '8',
            name: "Margherita Pizza",
            description: "Fresh tomatoes, mozzarella, and basil",
            image_url: require('@/assets/images/pizza-one.png'),
            price: 26.99,
            rating: 4.5,
            calories: 580,
            category_name: "Pizzas"
        },
        {
            $id: '9',
            name: "Chicken Caesar Salad",
            description: "Grilled chicken with crispy romaine and parmesan",
            image_url: require('@/assets/images/salad.png'),
            price: 21.99,
            rating: 4.7,
            calories: 420,
            category_name: "Salads"
        },
        {
            $id: '10',
            name: "Beef Burrito Supreme",
            description: "Seasoned beef with sour cream and guacamole",
            image_url: require('@/assets/images/buritto.png'),
            price: 24.99,
            rating: 4.8,
            calories: 640,
            category_name: "Burritos"
        },
        {
            $id: '11',
            name: "Chicken Wings",
            description: "Spicy buffalo wings with ranch dipping sauce",
            image_url: require('@/assets/images/burger-one.png'),
            price: 19.99,
            rating: 4.6,
            calories: 520,
            category_name: "Sides"
        },
        {
            $id: '12',
            name: "Fish Tacos",
            description: "Grilled fish with cabbage slaw and lime",
            image_url: require('@/assets/images/buritto.png'),
            price: 23.99,
            rating: 4.5,
            calories: 480,
            category_name: "Tacos"
        }
    ];

    const mockCategories = [
        { $id: '1', name: "Burgers", description: "Juicy grilled burgers" },
        { $id: '2', name: "Pizzas", description: "Oven-baked cheesy pizzas" },
        { $id: '3', name: "Burritos", description: "Rolled Mexican delights" },
        { $id: '4', name: "Salads", description: "Fresh and healthy salads" },
        { $id: '5', name: "Sides", description: "Tasty appetizers and sides" },
        { $id: '6', name: "Tacos", description: "Authentic Mexican tacos" }
    ];

    const { data, refetch, loading } = useAppwrite({ fn: getMenu, params: { category, query, limit: 6 } });
    const { data: categories } = useAppwrite({ fn: getCategories });

    const filteredMockMenu = mockMenu.filter(item => {
        if (category) return item.category_name.toLowerCase() === category.toLowerCase();
        if (query) return item.name.toLowerCase().includes(query.toLowerCase());
        return true;
    });

    useEffect(() => {
        refetch({ category, query, limit: 6})
    }, [category, query]);

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={(data || filteredMockMenu) as any}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;

                    return (
                        <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? 'mt-10': 'mt-0')}>
                            <MenuCard item={item as unknown as MenuItem} />
                        </View>
                    )
                }}
                keyExtractor={item => item.$id}
                numColumns={2}
                columnWrapperClassName="gap-7"
                contentContainerClassName="gap-7 px-5 pb-32"
                ListHeaderComponent={() => (
                    <View className="my-5 gap-5">
                        <View className="flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className="small-bold uppercase text-primary">Search</Text>
                                <View className="flex-start flex-row gap-x-1 mt-0.5">
                                    <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                                </View>
                            </View>

                            <CartButton />
                        </View>

                        <SearchBar />

                        <Filter categories={categories || mockCategories} />
                    </View>
                )}
                ListEmptyComponent={() => (
                    !loading && (
                        <View className="items-center justify-center mt-10">
                            <Image 
                                source={require("@/assets/images/empty-state.png")}
                                className="w-60 h-60"
                                resizeMode="contain"
                            />
                            <Text className="text-lg font-semibold text-gray-600 mt-4">
                                No food items found
                            </Text>
                            <Text className="text-gray-400 text-center mt-2 px-10">
                                Try searching with different keywords or browse through our categories
                            </Text>
                        </View>
                    )
                )}
            />
        </SafeAreaView>
    )
}

export default Search
