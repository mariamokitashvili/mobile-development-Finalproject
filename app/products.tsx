import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function Index() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const shortTitle = (title: string) => {
    if (title.length > 40) return title.slice(0, 40) + "...";
    return title;
  };

  const convertToGEL = (usd: number) => {
    return Math.floor(usd * 2.7);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("პროდუქტების ჩატვირთვა ვერ მოხერხდა");
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C4AB6" />
        <Text style={styles.loadingText}>იტვირთება...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id.toString() },
              })
            }
          >
            {/* Share Icon */}
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => Alert.alert("გაზიარება", item.title)}
            >
              <Feather name="share" size={20} color="#111" />
            </TouchableOpacity>

            {/* Heart Icon */}
            <TouchableOpacity
              style={[styles.iconBox, { top: 65 }]}
              onPress={() => Alert.alert("დამატებულია ფავორიტებში", item.title)}
            >
              <Ionicons name="heart-outline" size={22} color="#111" />
            </TouchableOpacity>

            {/* Product Image */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Title */}
            <Text style={styles.title} numberOfLines={2}>
              {shortTitle(item.title)}
            </Text>

            {/* Price */}
            <Text style={styles.price}>{convertToGEL(item.price)}₾</Text>

            {/* Buttons */}
            <View style={styles.bottomRow}>
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => Alert.alert("კალათაში დამატება", item.title)}
              >
                <Ionicons name="cart-outline" size={26} color="#111" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => Alert.alert("ყიდვა", item.title)}
              >
                <Text style={styles.buyText}>ყიდვა</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    padding: 10,
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 50,
    color: "#111",
    textAlign: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },

  errorText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    position: "relative",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  iconBox: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#fff",
    width: 42,
    height: 42,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    zIndex: 5,
  },

  image: {
    width: 170,
    height: 170,
    resizeMode: "contain",
    marginTop: 25,
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
    color: "#222",
  },

  price: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 18,
    color: "#000",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  cartButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },

  buyButton: {
    flex: 1,
    backgroundColor: "#6C4AB6",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  buyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
