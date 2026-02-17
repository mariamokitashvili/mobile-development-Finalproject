import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Mariam",
    email: "mariam@example.com",
    phone: "555-00-11-22",
    image: null as string | null,
  });

  // გვერდის ჩატვირთვისას წამოვიღოთ შენახული ინფო
  useEffect(() => {
    const loadUser = async () => {
      const savedData = await AsyncStorage.getItem("user_profile");
      if (savedData) setUser(JSON.parse(savedData));
    };
    loadUser();
  }, []);

  // ინფორმაციის შენახვის ფუნქცია
  const saveProfile = async () => {
    await AsyncStorage.setItem("user_profile", JSON.stringify(user));
    setIsEditing(false);
    alert("Profile Updated!");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return alert("Need access!");

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) setUser({ ...user, image: result.assets[0].uri });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>MY PROFILE</Text>

        <TouchableOpacity onPress={pickImage} style={styles.avatarBox}>
          {user.image ? (
            <Image source={{ uri: user.image }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle-outline" size={120} color="#1A237E" />
          )}
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={18} color="#FFF" />
          </View>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabled]}
            editable={isEditing}
            value={user.name}
            onChangeText={(t) => setUser({ ...user, name: t })}
          />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabled]}
            editable={isEditing}
            value={user.email}
            onChangeText={(t) => setUser({ ...user, email: t })}
          />

          <Text style={styles.label}>PHONE</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabled]}
            editable={isEditing}
            value={user.phone}
            onChangeText={(t) => setUser({ ...user, phone: t })}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.mainBtn,
            { backgroundColor: isEditing ? "#4CAF50" : "#1A237E" },
          ]}
          onPress={isEditing ? saveProfile : () => setIsEditing(true)}
        >
          <Text style={styles.btnText}>
            {isEditing ? "SAVE INFO" : "EDIT PROFILE"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scroll: { alignItems: "center", padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1A237E",
    marginBottom: 30,
    letterSpacing: 2,
  },
  avatarBox: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: { width: 130, height: 130, borderRadius: 65 },
  editBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#C5A358",
    padding: 8,
    borderRadius: 20,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#F9F9F9",
    padding: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#C5A358",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 8,
    marginBottom: 20,
    color: "#333",
  },
  disabled: { borderColor: "transparent", color: "#777" },
  mainBtn: {
    width: "100%",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#FFF", fontWeight: "bold", letterSpacing: 1 },
});
