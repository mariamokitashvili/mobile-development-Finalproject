import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function InputField({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  ...rest // იჭერს keyboardType-ს და ნებისმიერ სხვა პარამეტრს
}: any) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, error ? styles.errorInput : null]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...rest} // აქ "იშლება" ყველა დამატებითი პარამეტრი
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 55,
    borderRadius: 30,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#111",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  errorText: {
    marginTop: 6,
    marginLeft: 15,
    color: "#FF3B30",
    fontSize: 12,
    fontWeight: "500",
  },
});
