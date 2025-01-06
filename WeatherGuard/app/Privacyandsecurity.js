import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyAndSecurity = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>INTRODUCTION</Text>
      <Text style={styles.paragraph}>
        At WeatherGuard, your privacy and security are our top priorities. We are committed
        to protecting your personal information and ensuring a safe and trustworthy experience
        while using our app.
      </Text>

      <Text style={styles.title}>DATA COLLECTION</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>What data do we collect?</Text>{'\n'}
        - Personal Information: We collect your name, email address, and contact information to provide personalized services.{'\n'}
        - Location Data: We use your device's location to send real-time weather alerts and identify nearby shelters.{'\n'}
        - Device Information: Information about your device, such as operating system and browser type, helps us improve app performance.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Why do we collect this data?</Text>{'\n'}
        - To deliver accurate and timely weather alerts tailored to your location.{'\n'}
        - To connect you with relevant shelters and emergency contacts in your area.{'\n'}
        - To enhance user experience and app functionality based on usage patterns.
      </Text>

      <Text style={styles.title}>HOW WE USE YOUR DATA</Text>
      <Text style={styles.paragraph}>
        - Your data is used to:{'\n'}
        - Send personalized weather alerts.{'\n'}
        - Facilitate quick access to nearby shelters during severe weather.{'\n'}
        - Continuously improve our services and features based on your feedback and app usage.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A3F',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    color: '#ccc',
    marginVertical: 5,
    lineHeight: 20,
  },
  bold: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PrivacyAndSecurity;