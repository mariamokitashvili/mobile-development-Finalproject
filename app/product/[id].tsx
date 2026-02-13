import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const convertToGEL = (usd: number) => {
    return Math.floor(usd * 2.7);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C4AB6" />
        <Text style={styles.loadingText}>იტვირთება...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>პროდუქტი ვერ მოიძებნა</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => Alert.alert("გაზიარება", product.title)}
          >
            <Ionicons name="share-outline" size={22} color="#111" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => Alert.alert("ფავორიტებში დამატება", product.title)}
          >
            <Ionicons name="heart-outline" size={22} color="#111" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* DETAILS BOX */}
        <View style={styles.detailsBox}>
          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.price}>{convertToGEL(product.price)}₾</Text>

          <Text style={styles.category}>Category: {product.category}</Text>

          <Text style={styles.description}>{product.description}</Text>

          {/* BUTTONS */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => Alert.alert("კალათაში დამატება", product.title)}
            >
              <Ionicons name="cart-outline" size={26} color="#111" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => Alert.alert("ყიდვა", product.title)}
            >
              <Text style={styles.buyText}>Buy now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 15,
    paddingTop: 60,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 20,
  },

  detailsBox: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 15,
  },

  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 10,
  },

  category: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 15,
  },

  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },

  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
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
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  buyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
