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

export default function Cart() {
  const { cart, addToCart, removeFromCart, deleteItem } = useCart();

  const totalPrice = cart
    .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>YOUR BAG</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.img}
              resizeMode="contain"
            />
            <View style={styles.info}>
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.price}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
              <View style={styles.row}>
                <View style={styles.qtyBox}>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={[styles.btn, item.quantity <= 1 && { opacity: 0.5 }]}
                    disabled={item.quantity <= 1}
                  >
                    <Ionicons name="remove" size={18} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => addToCart(item)}
                    style={styles.btn}
                  >
                    <Ionicons name="add" size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.checkoutBox}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>${totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => alert("Redirecting to Secure Payment...")}
        >
          <Ionicons
            name="card-outline"
            size={24}
            color="#FFF"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.payText}>PROCEED TO PAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 20,
    color: "#1A237E",
  },
  card: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  img: { width: 70, height: 70 },
  info: { flex: 1, marginLeft: 15 },
  title: { fontSize: 14, fontWeight: "bold" },
  price: { color: "#C5A358", marginVertical: 5, fontWeight: "700" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyBox: { flexDirection: "row", alignItems: "center", gap: 10 },
  btn: { backgroundColor: "#1A237E", borderRadius: 5, padding: 3 },
  qtyText: { fontWeight: "bold" },
  checkoutBox: {
    padding: 25,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalLabel: { fontSize: 16, color: "#666" },
  totalValue: { fontSize: 24, fontWeight: "900", color: "#1A237E" },
  payBtn: {
    backgroundColor: "#C5A358",
    flexDirection: "row",
    padding: 18,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  payText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
