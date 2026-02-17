import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "./components/InputField";
import { loginSchema } from "./schemas/authSchema";

export default function Login() {
  const router = useRouter();

  // ამით ვაკონტროლებ Remember Me ჩამრთველის სტატუსს
  const [rememberMe, setRememberMe] = useState(false);

  // ფორმის მართვა hook-form-ს ვაძლევთ ჩვენს yup სქემას ვალიდაციისთვის
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // როცა გვერდი იხსნება, ვამოწმებ AsyncStorage-ში თუ არის  დამახსოვრებული მეილი
  useEffect(() => {
    const checkSavedEmail = async () => {
      const savedEmail = await AsyncStorage.getItem("user_email");
      if (savedEmail) {
        setValue("email", savedEmail); // ავტომატურად ვავსებ ინფუტს
        setRememberMe(true);
      }
    };
    checkSavedEmail();
  }, [setValue]);

  // ფორმის დასაბამითება
  const onSubmit = async (data: any) => {
    if (rememberMe) {
      await AsyncStorage.setItem("user_email", data.email);
    } else {
      await AsyncStorage.removeItem("user_email");
    }

    console.log("Logged in with:", data);
    router.replace("/(tabs)" as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.welcomeTitle}>Welcome Back</Text>
        <Text style={styles.subTitle}>Sign in to your premium account</Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <InputField
              placeholder="Email"
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

        <View style={styles.rememberRow}>
          <View style={styles.switchBox}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: "#D1D1D1", true: "#C5A358" }}
              thumbColor="#fff"
            />
            <Text style={styles.rememberText}>Remember Me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotBtn}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>New member? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.signUpLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F7F6",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  headerBox: {
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A237E",
  },
  subTitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  formContainer: {
    width: "100%",
  },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  switchBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 8,
    color: "#444",
    fontSize: 14,
  },
  forgotBtn: {
    color: "#C5A358",
    fontWeight: "600",
  },
  loginBtn: {
    backgroundColor: "#1A237E",
    height: 58,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1A237E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
  },
  footerText: {
    color: "#777",
  },
  signUpLink: {
    color: "#1A237E",
    fontWeight: "bold",
  },
});
