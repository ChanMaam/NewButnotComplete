import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import GradientBackground from '../components/GradientBackground';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const API_KEY = 'ef615541865044029d3121919250401';
  const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: { key: API_KEY, q: 'Cagayan de Oro', days: 1 },
      });

      const condition = response.data.current.condition.text.toLowerCase();
      handleWeatherNotifications(condition);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Function to handle and add notifications
  const handleWeatherNotifications = (condition) => {
    let title = '';
    let message = '';

    switch (condition) {
      case 'rain':
      case 'light rain':
      case 'moderate rain':
        title = 'Rainy Weather';
        message = 'Don\'t forget to bring an umbrella!';
        break;
      case 'sunny':
      case 'clear':
        title = 'Sunny Weather';
        message = 'Stay hydrated and wear sunscreen!';
        break;
      case 'thunderstorm':
        title = 'Thunderstorm Alert';
        message = 'Stay indoors and avoid outdoor activities.';
        break;
      default:
        title = 'Weather Update';
        message = `Current condition: ${condition}`;
        break;
    }

    setNotifications((prev) => [
      { title, message, timestamp: new Date() },
      ...prev, 
    ]);
  };

  useEffect(() => {
    fetchWeatherData();

    const interval = setInterval(() => {
      fetchWeatherData();
    }, 800000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <GradientBackground>
        <ScrollView style={styles.scrollContainer}>
          {notifications.length === 0 ? (
            <Text style={styles.emptyMessage}>No notifications yet.</Text>
          ) : (
            notifications.map((notification, index) => (
              <View key={index} style={styles.notificationCard}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.message}>{notification.message}</Text>
                <Text style={styles.timestamp}>
                  {notification.timestamp.toLocaleString()}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2B48',
  },
  header: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  emptyMessage: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  notificationCard: {
    backgroundColor: 'white',
    padding: 15,
    width: 360,
    borderRadius: 10,
    marginBottom: 10,
    opacity: 0.8,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    color: 'black',
    fontSize: 16,
    marginVertical: 5,
  },
  timestamp: {
    color: 'black',
    fontSize: 12,
    textAlign: 'right',
  },
});

export default Notification;
