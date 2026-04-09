import AsyncStorage from '@react-native-async-storage/async-storage';

// This function saves a phrase ID to local storage when a user clicks 'Mark as Learned'
export const markAsLearned = async (phraseId: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@learned_phrases');
    const learnedPhrases = jsonValue != null ? JSON.parse(jsonValue) : [];
    
    if (!learnedPhrases.includes(phraseId)) {
      learnedPhrases.push(phraseId);
      await AsyncStorage.setItem('@learned_phrases', JSON.stringify(learnedPhrases));
      console.log("Phrase saved successfully!");
    }
  } catch (e) {
    console.error("Error saving phrase logic", e);
  }
};