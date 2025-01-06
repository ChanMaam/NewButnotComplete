import React, { useState } from 'react';
import { TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import Logo from '../components/Logo'; // Import the Logo component
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase methods
import { auth } from './firebaseConfig'; // Import Firebase auth instance

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      // Firebase authentication: Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Alert on successful registration
      Alert.alert('Success', 'Your account has been created.');
      navigation.navigate('Login'); // Navigate to the Login screen
    } catch (error) {
      // Handle registration errors
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <Logo size={200} /> {/* Added Logo component */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255,255, 0.2)',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: 'white',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#FCB316',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#FCB316',
    fontWeight: 'bold',
  },
});

export default Signup;
