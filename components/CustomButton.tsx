import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
    onPress,
    title="Click Me",
    style,
    textStyle,
    leftIcon,
    isLoading = false
, containerClassName}: CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style, containerClassName)} onPress={onPress}>
            {leftIcon}

            <View className="flex-center flex-row">
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ): (
                    <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton