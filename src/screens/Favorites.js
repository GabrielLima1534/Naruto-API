import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { getFavorites, saveFavorites } from "../services/storage";

export default function Favorites({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();

    // recarrega sempre que voltar pra tela
    const unsubscribe = navigation.addListener("focus", () => {
      loadFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  async function loadFavorites() {
    const data = await getFavorites();
    setFavorites(data);
  }

  async function removeFavorite(id) {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    await saveFavorites(updated);
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>
          Nenhum favorito ainda 💔
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", { item })
            }
          >
            {/* imagem */}
            {item.images?.[0] && (
              <Image
                source={{ uri: item.images[0] }}
                style={styles.image}
              />
            )}

            {/* nome */}
            <Text style={styles.name}>
              {item.name}
            </Text>

            {/* botão remover */}
            <TouchableOpacity
              onPress={() => removeFavorite(item.id)}
            >
              <Text style={styles.remove}>
                Remover
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },

  title: {
    fontSize: 22,
    color: "#FF6B00",
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  name: {
    color: "#fff",
    flex: 1,
    marginLeft: 10,
  },

  remove: {
    color: "#E63946",
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },

  empty: {
    color: "#aaa",
    fontSize: 16,
  },
});