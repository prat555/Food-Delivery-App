import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';

const OrderConfirmationScreen = () => {
  const orderNumber = `FD${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Success Icon */}
        <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-8">
          <Text className="text-4xl">✓</Text>
        </View>

        {/* Success Message */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
          Order Confirmed!
        </Text>

        <Text className="text-gray-600 text-center mb-8 leading-6">
          Thank you for your order. Your delicious food is being prepared and will be delivered soon.
        </Text>

        {/* Order Details Card */}
        <View className="w-full bg-gray-50 rounded-2xl p-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-600">Order Number</Text>
            <Text className="font-semibold text-gray-900">#{orderNumber}</Text>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-600">Estimated Delivery</Text>
            <Text className="font-semibold text-gray-900">
              {formatTime(estimatedDelivery)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Status</Text>
            <View className="bg-orange-100 px-3 py-1 rounded-full">
              <Text className="text-orange-800 text-sm font-medium">
                Preparing
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery Tracking */}
        <View className="w-full mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Order Status
          </Text>
          
          <View className="space-y-4">
            {/* Step 1 - Completed */}
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-4">
                <Text className="text-white text-xs">✓</Text>
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900">Order Confirmed</Text>
                <Text className="text-gray-500 text-sm">Payment received</Text>
              </View>
            </View>

            {/* Step 2 - Current */}
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-orange-500 rounded-full items-center justify-center mr-4">
                <View className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900">Preparing Food</Text>
                <Text className="text-gray-500 text-sm">Chef is working on your order</Text>
              </View>
            </View>

            {/* Step 3 - Pending */}
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-gray-300 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="font-medium text-gray-500">On the way</Text>
                <Text className="text-gray-400 text-sm">Driver will pick up soon</Text>
              </View>
            </View>

            {/* Step 4 - Pending */}
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-gray-300 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="font-medium text-gray-500">Delivered</Text>
                <Text className="text-gray-400 text-sm">Enjoy your meal!</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-6 pb-8 space-y-4">
        <CustomButton
          title="Track Your Order"
          onPress={() => {
            // Navigate to order tracking screen
            router.push('/(tabs)/profile');
          }}
        />
        
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)')}
          className="py-4"
        >
          <Text className="text-center text-gray-600 font-medium">
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen;