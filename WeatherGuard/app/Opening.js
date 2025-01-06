import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../components/GradientBackground';
import { useNavigation } from '@react-navigation/native';
import Logo from '../components/Logo';

const Opening = () => {
  const navigation = useNavigation();
  const [size] = useState(300);

  const handleGetStarted = () => {
    navigation.navigate('Login'); // This matches the route name in the navigator
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Logo size={size} />
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 350,
    height: 350
  },
  button: {
    backgroundColor: '#F9A825',
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Opening;
