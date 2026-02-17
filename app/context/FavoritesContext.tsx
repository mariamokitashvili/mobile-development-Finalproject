import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({ children }: any) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  // ჩატვირთვისას წამოვიღოთ შენახული ფავორიტები
  useEffect(() => {
    const loadFavs = async () => {
      const saved = await AsyncStorage.getItem("user_favs");
      if (saved) setFavorites(JSON.parse(saved));
    };
    loadFavs();
  }, []);

  const toggleFavorite = async (product: any) => {
    let newFavs = [...favorites];
    const index = newFavs.findIndex((item) => item.id === product.id);

    if (index > -1) {
      newFavs.splice(index, 1); // თუ უკვე არის ვშლით
    } else {
      newFavs.push(product); // თუ არაა ვამატებთ
    }

    setFavorites(newFavs);
    await AsyncStorage.setItem("user_favs", JSON.stringify(newFavs));
  };

  const isFavorite = (productId: number) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
