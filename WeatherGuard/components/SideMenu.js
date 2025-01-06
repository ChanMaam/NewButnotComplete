import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Added for handling focus effect

const SideMenu = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('Username'); // Default name

  useFocusEffect(
    useCallback(() => {
      const loadProfileData = async () => {
        try {
          const savedImage = await AsyncStorage.getItem('profileImage');
          const savedUsername = await AsyncStorage.getItem('username');

          setProfileImage(savedImage || 'https://via.placeholder.com/80'); // Default placeholder if no image
          setUsername(savedUsername || 'Username'); // Default if no username
        } catch (error) {
          console.error('Error loading profile data:', error);
        }
      };

      loadProfileData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.profileName}>{username}</Text>
      </View>

      {/* Menu Items */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('MainApp', { screen: 'Homepage' })}
      >
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Auth', { screen: 'Opening' })}
      >
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A3F',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
    marginTop: 100,
  },
  profileName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default SideMenu;
