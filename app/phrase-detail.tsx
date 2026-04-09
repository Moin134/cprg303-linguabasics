import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhraseDetailScreen() {
  const { id, phrase, translation, meaning, icon } = useLocalSearchParams();

  const handleMarkAsLearned = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@learned_phrases');
      const learnedList = storedData ? JSON.parse(storedData) : [];
      
      if (!learnedList.includes(id)) {
        learnedList.push(id);
        await AsyncStorage.setItem('@learned_phrases', JSON.stringify(learnedList));
        Alert.alert("Success", "Phrase marked as learned!");
      } else {
        Alert.alert("Notice", "You have already learned this phrase.");
      }
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Phrase Detail</Text>
      <Text style={styles.subtitle}>Detailed View of the selected phrase</Text>

      <View style={styles.card}>
        <Text style={styles.phraseTitle}>
          {icon} {phrase} #{id}
        </Text>
        <Text style={styles.translation}>{translation}</Text>

        <Text style={styles.meaningLabel}>Meaning:</Text>
        <Text style={styles.meaningText}>{meaning}</Text>

        <TouchableOpacity style={styles.button} onPress={handleMarkAsLearned}>
          <Text style={styles.buttonText}>Mark as Learned</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <Text style={styles.inactiveTab} onPress={() => router.push("/")}>
          Categories
        </Text>
        <Text
          style={styles.inactiveTab}
          onPress={() => router.push("/progress")}
        >
          Progress
        </Text>
        <Text
          style={styles.inactiveTab}
          onPress={() => router.push("/settings")}
        >
          Settings
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2B1F66",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#7A7A8C",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#EDE7FF",
    borderRadius: 18,
    padding: 20,
    marginTop: 10,
  },
  phraseTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B1F66",
    marginBottom: 10,
  },
  translation: {
    fontSize: 18,
    color: "#6C4DFF",
    fontWeight: "600",
    marginBottom: 16,
  },
  meaningLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2B1F66",
    marginBottom: 6,
  },
  meaningText: {
    fontSize: 14,
    color: "#7A7A8C",
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#6C4DFF",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inactiveTab: {
    color: "#8E8E9C",
    fontSize: 14,
    fontWeight: "500",
  },
});