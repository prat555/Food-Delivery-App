import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  CardField,
  useStripe,
  CardFieldInput,
} from '@stripe/stripe-react-native';
import { useCartStore } from '@/store/cart.store';
import CustomButton from '@/components/CustomButton';
import CustomHeader from '@/components/CustomHeader';
import { createMockPaymentIntent } from '@/lib/stripe';

interface PaymentSummaryProps {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}

const PaymentSummary = ({ label, value, labelStyle, valueStyle }: PaymentSummaryProps) => (
  <View className="flex-row justify-between items-center py-2">
    <Text className={`text-gray-600 ${labelStyle || ''}`}>{label}</Text>
    <Text className={`font-semibold text-gray-900 ${valueStyle || ''}`}>{value}</Text>
  </View>
);

const CheckoutScreen = () => {
  const { confirmPayment, loading } = useStripe();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');

  const subtotal = getTotalPrice();
  const deliveryFee = 5.00;
  const discount = 0.50;
  const total = subtotal + deliveryFee - discount;

  useEffect(() => {
    // Create payment intent when screen loads
    const createPaymentIntent = async () => {
      try {
        const response = await createMockPaymentIntent(total);
        setClientSecret(response.client_secret);
      } catch (error) {
        Alert.alert('Error', 'Failed to initialize payment');
      }
    };

    if (total > 0) {
      createPaymentIntent();
    }
  }, [total]);

  const handlePayment = async () => {
    if (!cardDetails?.complete || !clientSecret) {
      Alert.alert('Error', 'Please enter complete card details');
      return;
    }

    setIsProcessing(true);

    try {
      // In a real app with actual Stripe integration, you would use:
      // const { error, paymentIntent } = await confirmPayment(clientSecret, {
      //   paymentMethodType: 'Card',
      // });

      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful payment
      Alert.alert(
        'Payment Successful!',
        'Your order has been placed successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              router.replace('/order-confirmation');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an error processing your payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Your cart is empty
          </Text>
          <CustomButton
            title="Go Back to Menu"
            onPress={() => router.replace('/(tabs)')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-5 pt-5">
          <CustomHeader title="Checkout" />
        </View>

        <View className="px-5 mt-6">
          {/* Order Summary */}
          <View className="bg-gray-50 rounded-2xl p-5 mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </Text>
            
            <PaymentSummary
              label={`Items (${items.length})`}
              value={`$${subtotal.toFixed(2)}`}
            />
            <PaymentSummary
              label="Delivery Fee"
              value={`$${deliveryFee.toFixed(2)}`}
            />
            <PaymentSummary
              label="Discount"
              value={`-$${discount.toFixed(2)}`}
              valueStyle="text-green-600"
            />
            
            <View className="border-t border-gray-300 mt-3 pt-3">
              <PaymentSummary
                label="Total"
                value={`$${total.toFixed(2)}`}
                labelStyle="font-bold text-lg"
                valueStyle="font-bold text-lg text-primary"
              />
            </View>
          </View>

          {/* Payment Information */}
          <View className="bg-gray-50 rounded-2xl p-5 mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Payment Information
            </Text>

            <Text className="text-gray-600 mb-3">Card Details</Text>
            
            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
                expiration: 'MM/YY',
                cvc: 'CVC',
                postalCode: 'ZIP',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                borderRadius: 8,
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 10,
              }}
              onCardChange={(cardDetails) => {
                setCardDetails(cardDetails);
              }}
            />

            <Text className="text-xs text-gray-500 mt-2">
              Use test card: 4242 4242 4242 4242
            </Text>
          </View>

          {/* Security Notice */}
          <View className="bg-blue-50 rounded-2xl p-4 mb-6">
            <Text className="text-blue-800 text-sm">
              🔒 Your payment information is secure and encrypted
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Now Button */}
      <View className="px-5 pb-8 pt-4 bg-white border-t border-gray-200">
        <CustomButton
          title={isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          onPress={handlePayment}
          disabled={isProcessing || !cardDetails?.complete || loading}
          containerClassName={
            isProcessing || !cardDetails?.complete
              ? 'opacity-50'
              : ''
          }
        />
        
        {isProcessing && (
          <View className="flex-row justify-center items-center mt-3">
            <ActivityIndicator size="small" color="#6366F1" />
            <Text className="ml-2 text-gray-600">Processing your payment...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;