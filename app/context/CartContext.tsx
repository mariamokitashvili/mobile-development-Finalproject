import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";

// ვქმნით კონტექსტს
const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);

  // კალათაში დამატება
  const addToCart = async (product: any) => {
    let newCart = [...cart];
    const existingIndex = newCart.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    setCart(newCart);
    await AsyncStorage.setItem("user_cart", JSON.stringify(newCart));
  };

  // რაოდენობის დაკლება (1-ზე ნაკლები არ გახდება)
  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // ნივთის სრული ამოშლა კალათიდან (ნაგვის ურნაზე დაჭერისას)
  const deleteItem = async (productId: number) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    await AsyncStorage.setItem("user_cart", JSON.stringify(newCart));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ჰუკი, რომელსაც სხვა ფაილებში გამოვიყენებთ
export const useCart = () => useContext(CartContext);
