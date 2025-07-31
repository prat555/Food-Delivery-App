import { Stack } from 'expo-router';

export default function FoodDetailLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{
          headerShown: false,
        }} 
      />
    </Stack>
  );
}