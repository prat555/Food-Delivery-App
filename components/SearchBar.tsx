import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const Searchbar = () => {
    const params = useLocalSearchParams<{ query: string }>();
    const [query, setQuery] = useState(params.query);

    const handleSearch = (text: string) => {
        setQuery(text);

        if(!text) router.setParams({ query: undefined });
    };

    const handleSubmit = () => {
        if(query.trim()) router.setParams({ query });
    }

    return (
        <View className="flex-row items-center bg-gray-50 rounded-2xl">
            <TouchableOpacity
                className="pl-4"
                onPress={() => router.setParams({ query })}
            >
                <Image
                    source={images.search}
                    className="size-5"
                    resizeMode="contain"
                    tintColor="#5D5F6D"
                />
            </TouchableOpacity>
            <TextInput
                className="flex-1 py-3 px-3"
                placeholder="Search for pizzas, burgers..."
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                placeholderTextColor="#A0A0A0"
                returnKeyType="search"
            />
        </View>
    );
};

export default Searchbar;
