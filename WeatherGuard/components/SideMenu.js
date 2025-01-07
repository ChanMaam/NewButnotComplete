import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons

const SideMenu = ({ navigation }) => {
  const [size] = useState(200);

  const handleLogout = () => {
    // Implement the logout logic here
    navigation.navigate('Auth', { screen: 'Opening' });  // Assuming this is the login screen
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
        />
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

      {/* Logout Icon Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A3F',
    padding: 20,
    justifyContent: 'flex-start', // Ensure the container allows space for content
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  image: {
    width: 200,
    height: 200,
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
  logoutButton: {
    position: 'absolute',
    bottom: 20,  
    left: 20,    
    borderRadius: 50,  
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SideMenu;
