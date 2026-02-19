import { Stack } from "expo-router";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: false, // თიშავს გვერდზე გაწევას iPhone-ზე და Android-ზე
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
      </CartProvider>
    </FavoritesProvider>
  );
}
