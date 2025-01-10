import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from "expo-router";

export default function CreateDiaryEntry() {
  const router = useRouter();
  // Remove useNavigation since we're using expo-router
  const handleNavigateToEntry = () => {
    console.log("Button pressed"); // Debug log
    try {
      router.push("./entry"); // Changed from relative path to absolute
      console.log("Navigation successful"); // Debug log
    } catch (error) {
      console.error("Navigation error:", error); // Debug log
      Alert.alert("Navigation Error", "Could not navigate to entry page");
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon Section */}
      <View style={styles.header}>
        <View style={styles.profileIcon}></View>
      </View>

      {/* Chart Buttons */}
      <View style={styles.chartButtonsContainer}>
        <TouchableOpacity style={styles.chartButton}>
          <Text style={styles.chartButtonText}>Weight Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chartButton}>
          <Text style={styles.chartButtonText}>Milk Chart</Text>
        </TouchableOpacity>
      </View>

      {/* Diary Entries */}
      <ScrollView style={styles.diaryContainer}>
        <TouchableOpacity 
          onPress={handleNavigateToEntry}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>+ Create a new entry</Text>
        </TouchableOpacity>

        {['Diary title', 'Title', 'Title'].map((entry, index) => (
          <TouchableOpacity key={index} style={styles.diaryEntry}>
            <Text style={styles.diaryText}>{entry}</Text>
            <Text style={styles.dateText}>DD/MM</Text>
          </TouchableOpacity>
        ))}

        {/* Divider and Year Section */}
        <View style={styles.divider}>
          <Text style={styles.yearText}>2025</Text>
        </View>

        {['Title', 'Title', 'Title', 'Title'].map((entry, index) => (
          <TouchableOpacity key={index} style={styles.diaryEntry}>
            <Text style={styles.diaryText}>{entry}</Text>
            <Text style={styles.dateText}>DD/MM</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text>Diary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text>Ask our Bot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text>More Options</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  chartButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  chartButton: {
    backgroundColor: '#5A4FCF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  chartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  diaryContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  diaryEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3498db',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  diaryText: {
    color: '#fff',
    fontSize: 16,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  yearText: {
    fontSize: 18,
    color: '#000',
    marginTop: -12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navButton: {
    alignItems: 'center',
  },
  headerButton: {
    backgroundColor: '#007AFF',  // iOS blue color, you can change this
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
