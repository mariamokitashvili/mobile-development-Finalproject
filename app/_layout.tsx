import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Login */}
      <Stack.Screen
        name="login"
        options={{
          gestureEnabled: false,
        }}
      />

      {/* Register */}
      <Stack.Screen
        name="register"
        options={{
          gestureEnabled: false,
        }}
      />

      {/* Products */}
      <Stack.Screen
        name="products"
        options={{
          gestureEnabled: true,
        }}
      />

      {/* Product Details */}
      <Stack.Screen
        name="product/[id]"
        options={{
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
