import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const Account = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        try {
          const userDoc = await getDoc(doc(db, "users", uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name || "Add User");
            setPhoneNumber(userData.phoneNumber || "Add Phone Number");
            setBirthdate(userData.birthdate || "Add Birthdate");
          } else {
            setName("Add Username");
            setPhoneNumber("Add Phone Number");
            setBirthdate("Add Birthdate");
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };

    loadUserData();
  }, []);

  const handleSaveChanges = async () => {
    setIsEditing(false);

    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        const userDoc = doc(db, "users", uid);

        const updatedData = {
          name: name || "Add User",
          phoneNumber: phoneNumber || "Add Phone Number",
          birthdate: birthdate || "Add Birthdate",
        };

        // Save to Firebase
        await setDoc(userDoc, updatedData);

        // Save the updated username to AsyncStorage for SideMenu
        Alert.alert("Success", "Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
        Alert.alert("Error", "Failed to save data. Please try again.");
      }
    } else {
      Alert.alert("Error", "No user logged in.");
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                // Delete user data from Firestore
                const userDoc = doc(db, "users", uid);
                await deleteDoc(userDoc);

                // Delete user account from Firebase Auth
                await user.delete();

                Alert.alert("Success", "Account deleted successfully!");
                navigation.navigate("Auth", { screen: "Login" }); // Correct navigation to Login screen
              } catch (error) {
                console.error("Error deleting account:", error);
                Alert.alert("Error", "Failed to delete account. Please try again.");
              }
            },
          },
        ]
      );
    } else {
      Alert.alert("Error", "No user logged in.");
    }
  };

  const handleEditAll = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.sectionTitle}>Personal Details</Text>

        <View style={styles.editableContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.editableRow}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter Username"
                autoFocus
              />
            ) : (
              <Text style={styles.buttonText}>{name || 'Add User'}</Text>
            )}
          </View>
        </View>

        <View style={styles.editableContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.editableRow}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
              />
            ) : (
              <Text style={styles.buttonText}>{phoneNumber || 'Add Phone Number'}</Text>
            )}
          </View>
        </View>

        <View style={styles.editableContainer}>
          <Text style={styles.label}>Birthdate</Text>
          <View style={styles.editableRow}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={birthdate}
                onChangeText={setBirthdate}
                placeholder="YYYY-MM-DD"
              />
            ) : (
              <Text style={styles.buttonText}>{birthdate || 'Add Birthdate'}</Text>
            )}
          </View>
        </View>

        {!isEditing && (
          <TouchableOpacity style={styles.editDetailsButton} onPress={handleEditAll}>
            <View style={styles.editDetailsRow}>
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.editDetailsText}>Edit Personal Details</Text>
            </View>
          </TouchableOpacity>
        )}

        {isEditing && (
          <TouchableOpacity style={styles.saveChangesButton} onPress={handleSaveChanges}>
            <Text style={styles.saveChangesText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A3F',
  },
  scrollContent: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emailText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  editableContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  editableRow: {
    backgroundColor: '#123264',
    borderRadius: 8,
    padding: 15,
  },
  input: {
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 10,
    color: '#000',
  },
  buttonText: {
    color: '#fff',
  },
  editDetailsButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
  },
  editDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editDetailsText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  saveChangesButton: {
    marginTop: 20,
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 15,
  },
  saveChangesText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    padding: 15,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Account;
