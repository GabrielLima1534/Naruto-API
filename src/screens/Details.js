import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { getFavorites, saveFavorites } from "../services/storage";
import { translateKey } from "../utils/translate";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details({ route }) {
  const { item } = route.params || {};

  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const entries = item ? Object.entries(item) : [];

  // carregar favoritos ao abrir tela
  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const favs = await getFavorites();
    setFavorites(favs);

    const exists = favs.some((p) => p.id === item.id);
    setIsFavorite(exists);
  }

  async function toggleFavorite() {
    let updatedFavorites = [];

    if (isFavorite) {
      // remover
      updatedFavorites = favorites.filter(
        (p) => p.id !== item.id
      );
    } else {
      // adicionar
      updatedFavorites = [...favorites, item];
    }

    setFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);

    await saveFavorites(updatedFavorites);
  }

  return (
    <ScrollView style={styles.container}>
      {/* IMAGEM */}
      <View style={styles.imageContainer}>
        {item?.images?.[0] ? (
          <Image
            source={{ uri: item.images[0] }}
            style={styles.image}
          />
        ) : (
          <View style={styles.noImage}>
            <Text style={{ color: "#aaa" }}>
              Sem imagem disponível
            </Text>
          </View>
        )}
      </View>

      {/* NOME */}
      <Text style={styles.title}>
        {item?.name}
      </Text>

      {/* BOTÃO FAVORITO */}
      <TouchableOpacity
        style={[
          styles.button,
          isFavorite && styles.buttonActive,
        ]}
        onPress={toggleFavorite}
      >
        <Text style={styles.buttonText}>
          {isFavorite ? "❤️ Remover favorito" : "🤍 Favoritar"}
        </Text>
      </TouchableOpacity>

      {/* ID */}
      <View style={styles.card}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.text}>{item?.id}</Text>
      </View>

      {/* DADOS DA API */}
      <View style={styles.card}>
        <Text style={styles.label}>Dados da API</Text>

        {entries.map(([key, value]) => {
          if (key === "images") return null;

          return (
            <View key={key} style={{ marginBottom: 8 }}>
              <Text style={styles.key}>
                {translateKey(key)}
              </Text>

              <Text style={styles.text}>
                {formatValue(value)}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

// formatador seguro
function formatValue(value) {
  if (!value) return "N/A";

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");
  }

  return String(value);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 15,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#FF6B00",
  },

  noImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    color: "#FF6B00",
    textAlign: "center",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: "center",
  },

  buttonActive: {
    backgroundColor: "#E63946",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  label: {
    color: "#FF6B00",
    fontWeight: "bold",
    marginBottom: 10,
  },

  key: {
    color: "#FF6B00",
    fontSize: 12,
  },

  text: {
    color: "#fff",
  },
});