import { Ionicons } from "@expo/vector-icons";
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

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="heart-dislike-outline" size={80} color="#DDD" />
        <Text style={styles.emptyText}>No items saved yet.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>MY FAVORITES</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
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
                    alert("Added to bag!");
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
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#AAA", marginTop: 10, fontSize: 16 },
  favCard: {
    flexDirection: "row",
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    marginBottom: 15,
  },
  favImg: { width: 80, height: 80 },
  favInfo: { flex: 1, marginLeft: 15, justifyContent: "center" },
  favTitle: { fontSize: 14, fontWeight: "600" },
  favPrice: { color: "#C5A358", fontWeight: "bold", marginVertical: 5 },
  favBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#1A237E",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addBtnText: { color: "#FFF", fontSize: 10, fontWeight: "bold" },
});
