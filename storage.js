import AsyncStorage from '@react-native-async-storage/async-storage';

// Saves a phrase to the user's "Mastered" list
export const markAsMastered = async (phraseId) => {
  try {
    const mastered = await AsyncStorage.getItem('mastered_phrases') || '[]';
    const list = JSON.parse(mastered);
    if (!list.includes(phraseId)) {
      list.push(phraseId);
      await AsyncStorage.setItem('mastered_phrases', JSON.stringify(list));
    }
  } catch (e) {
    console.error("Error saving progress", e);
  }
};