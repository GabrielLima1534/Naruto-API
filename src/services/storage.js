import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@naruto_favorites";

export async function getFavorites() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveFavorites(list) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}