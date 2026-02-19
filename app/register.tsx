import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage"; // დავამატეთ ეს
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "./components/InputField";
import { registerSchema } from "./schemas/authSchema";

export default function Register() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ფუნქცია, რომელიც ინახავს ინფოს და გადაგვიყვანს პროფილზე
  const onSubmit = async (data: any) => {
    try {
      // ვქმნით იუზერის ობიექტს
      const userProfile = {
        email: data.email,
        name: data.email.split("@")[0], // მეილის პირველ ნაწილს ვიყენებთ სახელად
        phone: "Not set",
        image: null,
      };

      // ვინახავთ AsyncStorage-ში
      await AsyncStorage.setItem("user_profile", JSON.stringify(userProfile));

      console.log("New User Registered and Saved:", userProfile);

      Alert.alert("Success", "Account created successfully!");

      // პირდაპირ ტაბებში გადავიყვანოთ, რომ პროფილი უკვე შევსებული დახვდეს
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Could not save profile");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our premium shopping club</Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <InputField
              placeholder="Email Address"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <InputField
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <InputField
              placeholder="Repeat Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <TouchableOpacity
          style={styles.regBtn}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.regBtnText}>REGISTER</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.backText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F7F6",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: "bold", color: "#1A237E" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 5 },
  form: { width: "100%" },
  regBtn: {
    backgroundColor: "#C5A358",
    height: 58,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#C5A358",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  regBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  backBtn: { marginTop: 30, alignItems: "center" },
  backText: { color: "#777", fontSize: 15 },
  loginLink: { color: "#1A237E", fontWeight: "bold" },
});
