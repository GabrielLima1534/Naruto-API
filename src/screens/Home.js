import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";

import api from "../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/theme";

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/characters");

      const characters = response.data.characters || [];

      setData(characters);
      setFilteredData(characters);
    } catch (err) {
      console.log("Erro API:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(text) {
    setSearch(text);

    if (!text) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredData(filtered);
  }

  // ⏳ LOADING
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>Carregando personagens...</Text>
      </View>
    );
  }

  // ❌ ERRO
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Falha ao carregar dados 😢
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadCharacters}
        >
          <Text style={styles.retryText}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        
        <Text style={styles.title}>Naruto App</Text>

        <TouchableOpacity
          style={styles.favButton}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Text style={styles.favText}>❤️ Ver Favoritos</Text>
        </TouchableOpacity>

        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Buscar personagem..."
          placeholderTextColor="#aaa"
          style={styles.search}
        />

        <FlatList
          data={filteredData}
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
              {item.images?.[0] ? (
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.image}
                />
              ) : (
                <View style={styles.noImage}>
                  <Text style={{ color: "#aaa" }}>Sem imagem</Text>
                </View>
              )}

              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>
                  ID: {item.id || "N/A"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },

  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  search: {
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 10,
    color: colors.text,
    marginBottom: 10,
  },

  card: {
    backgroundColor: colors.card,
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
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },

  sub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  favButton: {
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  favText: {
    color: colors.danger,
    fontWeight: "bold",
  },
  errorText: {
  color: colors.danger,
  fontSize: 16,
  marginBottom: 10,
  textAlign: "center",
},

retryButton: {
  backgroundColor: colors.primary,
  padding: 10,
  borderRadius: 10,
},

retryText: {
  color: "#fff",
  fontWeight: "bold",
},

text: {
  color: "#fff",
  marginTop: 10,
},
});