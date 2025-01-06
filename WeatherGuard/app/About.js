import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image
        source={require('../assets/images/logo.png')} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.title}>Your All-in-One App</Text>

      {/* Features Section */}
      <View style={styles.featuresGrid}>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>✅</Text>
          <Text style={styles.featureText}>real-time weather updates</Text>
        </View>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>🔔</Text>
          <Text style={styles.featureText}>weather-related notifications</Text>
        </View>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>📍</Text>
          <Text style={styles.featureText}>map access for evacuation sites</Text>
        </View>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>👨‍👩‍👧‍👦</Text>
          <Text style={styles.featureText}>family connectivity</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A3F',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 230,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginVertical: 10,
    textAlign: 'center',
  },
  featuresGrid: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureBox: {
    backgroundColor: '#112B54',
    width: '45%', // Adjust for spacing
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  featureIcon: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default About;