import { Stack } from "expo-router";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <CartProvider>
        {/* headerShown false აქრობს ზედა ზოლს მთელ აპლიკაციაში */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        </Stack>
      </CartProvider>
    </FavoritesProvider>
  );
}
