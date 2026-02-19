import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const router = useRouter();

  //Empty State თუ ფავორიტები ცარიელია
  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Ionicons name="heart-dislike-outline" size={100} color="#DDD" />
        <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart icon on any product to save it here.
        </Text>
        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={styles.shopBtnText}>DISCOVER PRODUCTS</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>MY FAVORITES</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.favCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.favImg}
              resizeMode="contain"
            />
            <View style={styles.favInfo}>
              <Text numberOfLines={1} style={styles.favTitle}>
                {item.title}
              </Text>
              <Text style={styles.favPrice}>${item.price}</Text>
              <View style={styles.favBtns}>
                <TouchableOpacity
                  onPress={() => {
                    addToCart(item);
                    alert("Added to bag! 🛍️");
                  }}
                  style={styles.addBtn}
                >
                  <Text style={styles.addBtnText}>ADD TO BAG</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 20,
    color: "#1A237E",
    letterSpacing: 2,
  },
  favCard: {
    flexDirection: "row",
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  favImg: { width: 80, height: 80 },
  favInfo: { flex: 1, marginLeft: 15, justifyContent: "center" },
  favTitle: { fontSize: 14, fontWeight: "600", color: "#333" },
  favPrice: { color: "#C5A358", fontWeight: "bold", marginVertical: 5 },
  favBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#1A237E",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addBtnText: { color: "#FFF", fontSize: 10, fontWeight: "bold" },
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A237E",
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#AAA",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  shopBtn: {
    backgroundColor: "#C5A358",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  shopBtnText: { color: "#FFF", fontWeight: "bold" },
});
