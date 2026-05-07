import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

export default function Header({ navigation, search, onSearch }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Naruto App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Text style={styles.text}>❤️ Favoritos</Text>
      </TouchableOpacity>

      <TextInput
        value={search}
        onChangeText={onSearch}
        placeholder="Buscar personagem..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    color: "#FF6B00",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    color: "#E63946",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
  },
});