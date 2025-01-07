import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./firebaseConfig";

const Account = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(
    "default_avatar.png"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");

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
            setProfileImage(userData.profileImageURL || "default_avatar.png");
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    

    loadUserData();
  }, []);
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri;
  
        // Upload the image and get the download URL
        const uploadedUrl = await uploadImageToFirebase(selectedImageUri);
        setProfileImage(uploadedUrl);
  
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
  
          // Save the image URL to Firestore
          await setDoc(
            doc(db, "users", uid), // Firestore document reference
            { profileImageURL: uploadedUrl }, // Field to add
            { merge: true } // Merge with existing fields
          );
  
          Alert.alert("Success", "Profile image updated successfully!");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick or upload image.");
    }
  };
  
  
  const uploadImageToFirebase = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      if (!response.ok) {
        throw new Error("Failed to fetch the image URI.");
      }
      const blob = await response.blob();
  
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is logged in.");
      }
  
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, blob);
  
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      throw error;
    }
  };

  const handleSaveChanges = async () => {
    if (!auth.currentUser) {
      Alert.alert("Error", "No user is logged in.");
      return;
    }
  
    try {
      const user = auth.currentUser;
      const uid = user.uid;
  
      let uploadedUrl = profileImage;
  
      // If the profileImage is a local URI, upload it to Firebase Storage
      if (profileImage.startsWith("file://") || profileImage.startsWith("content://")) {
        uploadedUrl = await uploadImageToFirebase(profileImage);
      }
  
      // Save user details and the uploaded image URL to Firestore
      await setDoc(
        doc(db, "users", uid),
        {
          name: name || "Add User",
          phoneNumber: phoneNumber || "Add Phone Number",
          birthdate: birthdate || "Add Birthdate",
          profileImageURL: uploadedUrl,
        },
        { merge: true }
      );
  
      setProfileImage(uploadedUrl); // Update the local state with the uploaded image URL
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
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
                const userDoc = doc(db, "users", uid);
                await deleteDoc(userDoc);
                await user.delete();

                Alert.alert("Success", "Account deleted successfully!");
                navigation.navigate("Login");
              } catch (error) {
                console.error("Error deleting account:", error);
                Alert.alert(
                  "Error",
                  "Failed to delete account. Please try again."
                );
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
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.addButton} onPress={handleImagePick}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.emailText}>{name || "Add User"}</Text>
        </View>

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
              <Text style={styles.buttonText}>{name || "Add User"}</Text>
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
              <Text style={styles.buttonText}>
                {phoneNumber || "Add Phone Number"}
              </Text>
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
              <Text style={styles.buttonText}>
                {birthdate || "Add Birthdate"}
              </Text>
            )}
          </View>
        </View>

        {!isEditing && (
          <TouchableOpacity
            style={styles.editDetailsButton}
            onPress={handleEditAll}
          >
            <View style={styles.editDetailsRow}>
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.editDetailsText}>Edit Personal Details</Text>
            </View>
          </TouchableOpacity>
        )}

        {isEditing && (
          <TouchableOpacity
            style={styles.saveChangesButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveChangesText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
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
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
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
