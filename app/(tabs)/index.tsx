import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductsScreen() {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    // მონაცემების წამოღება სერვერიდან
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((cats) => {
        setCategories(["all", ...cats]);
      });
  }, []);

  const filterCat = (cat: string) => {
    setSelected(cat);
    setFiltered(
      cat === "all" ? products : products.filter((p) => p.category === cat),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>SHOP</Text>

      {/* კატეგორიების სექცია */}
      <View style={{ height: 50 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => filterCat(c)}
              style={[styles.catBtn, selected === c && styles.activeCat]}
            >
              <Text
                style={[styles.catText, selected === c && styles.activeText]}
              >
                {c.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* აქ გადადის დეტალების გვერდზე */}
            <TouchableOpacity
              onPress={() => router.push(`/product/${item.id}`)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.img}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <View style={styles.row}>
              <Text style={styles.price}>${item.price}</Text>
              <View style={styles.actions}>
                {/* ფავორიტების ღილაკი */}
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Ionicons
                    name={isFavorite(item.id) ? "heart" : "heart-outline"}
                    size={22}
                    color={isFavorite(item.id) ? "red" : "#1A237E"}
                  />
                </TouchableOpacity>
                {/* ყიდვის ღილაკი */}
                <TouchableOpacity
                  style={styles.buyBtn}
                  onPress={() => {
                    addToCart(item);
                    alert("Added to Bag!");
                  }}
                >
                  <Text style={styles.buyBtnText}>BUY</Text>
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
  logo: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 10,
    letterSpacing: 4,
    color: "#1A237E",
  },
  catBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    height: 35,
  },
  activeCat: { backgroundColor: "#1A237E" },
  catText: { fontSize: 10, fontWeight: "bold", color: "#666" },
  activeText: { color: "#FFF" },
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: "#FDFDFD",
    borderRadius: 15,
    elevation: 3,
  },
  img: { width: "100%", height: 110 },
  title: { fontSize: 12, marginVertical: 8, fontWeight: "600" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontWeight: "bold", color: "#1A237E" },
  actions: { flexDirection: "row", alignItems: "center", gap: 8 },
  buyBtn: {
    backgroundColor: "#C5A358",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  buyBtnText: { color: "#FFF", fontSize: 10, fontWeight: "bold" },
});
