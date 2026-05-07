import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function CharacterCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {item.images?.[0] ? (
        <Image source={{ uri: item.images[0] }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text style={{ color: "#aaa" }}>Sem imagem</Text>
        </View>
      )}

      <View style={{ marginLeft: 10 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>ID: {item.id || "N/A"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  noImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sub: {
    color: "#aaa",
    fontSize: 12,
  },
});