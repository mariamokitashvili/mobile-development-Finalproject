import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
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

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  if (!product)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );

  const activeFav = isFavorite(product.id);

  return (
    <SafeAreaView style={styles.container}>
      {/*ზედა ზოლი*/}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#1A237E" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => {
            toggleFavorite(product);
            if (!activeFav) alert("Added to Favorites! ❤️");
          }}
        >
          <Ionicons
            name={activeFav ? "heart" : "heart-outline"}
            size={24}
            color={activeFav ? "#FF3B30" : "#1A237E"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/*სურათის ბლოკი*/}
        <View style={styles.imgCard}>
          <Image
            source={{ uri: product.image }}
            style={styles.img}
            resizeMode="contain"
          />
        </View>

        {/*ინფორმაციის ბლოკი */}
        <View style={styles.infoBox}>
          <View style={styles.headerRow}>
            <Text style={styles.category}>
              {product.category.toUpperCase()}
            </Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#C5A358" />
              <Text style={styles.ratingText}>
                {product.rating?.rate || "4.5"}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.desc}>{product.description}</Text>

          {/*ფუტერი*/}
          <View style={styles.footerRow}>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>${product.price}</Text>
            </View>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                addToCart(product);
                alert("Added to Bag! 🛍️");
              }}
            >
              <Text style={styles.addBtnText}>ADD TO BAG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  iconCircle: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 15,
  },
  scroll: {
    flexGrow: 1,
  },
  imgCard: {
    width: "100%",
    height: 420,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "80%",
    height: "80%",
  },
  infoBox: {
    padding: 30,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    color: "#C5A358",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 2,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 5,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1A237E",
    marginVertical: 15,
  },
  desc: {
    color: "#777",
    lineHeight: 22,
    marginBottom: 20,
    fontSize: 14,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: 10,
    paddingTop: 20,
  },
  priceLabel: { color: "#AAA", fontSize: 13, marginBottom: 2 },
  price: { fontSize: 28, fontWeight: "900", color: "#1A237E" },
  addBtn: {
    backgroundColor: "#1A237E",
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 20,
  },
  addBtnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
