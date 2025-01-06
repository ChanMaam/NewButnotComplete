import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import GradientBackground from '../components/GradientBackground';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Homepage = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const scrollViewRef = useRef(null);

  // API Key and Base URL
  const API_KEY = 'ef615541865044029d3121919250401'; 
  const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

  // Map Weather Conditions to Local Images
  const getWeatherImage = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return require('../assets/images/sun.png');
      case 'cloudy':
      case 'partly cloudy':
        return require('../assets/images/cloud.png');
      case 'rain':
      case 'light rain':
      case 'moderate rain':
        return require('../assets/images/rainy.png');
      case 'thunderstorm':
        return require('../assets/images/thunder.png');
      case 'snow':
        return require('../assets/images/snow.png');
      default:
        return require('../assets/images/cloud.png'); 
    }
  };

  // Fetch Weather Data
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: 'Cagayan de Oro',
          days: 7,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Scroll Functions
  const scrollToRight = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 300, animated: true });
    }
  };

  const scrollToLeft = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: -300, animated: true });
    }
  };

  return (
    <GradientBackground>
      {/* Top Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Location Section */}
      <View style={styles.header}>
        <Text style={styles.locationText}>{weatherData?.location?.name || 'Loading...'}</Text>
      </View>

      {/* Weather Icon and Temperature */}
      <View style={styles.weatherSection}>
        <Image
          source={
            weatherData
              ? getWeatherImage(weatherData.current.condition.text)
              : require('../assets/images/cloud.png')
          }
          style={styles.weatherIcon}
        />
        <Text style={styles.temperatureText}>
          {weatherData ? `${weatherData.current.temp_c}°C` : '...'}
        </Text>
        <Text style={styles.weatherConditionText}>
          {weatherData ? weatherData.current.condition.text : 'Loading...'}
        </Text>
        <Text style={styles.dateTimeText}>
          {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
        </Text>
      </View>

      {/* Scrollable Weather Forecast */}
      <Text style={styles.weekly}>Weekly Forecast</Text>
      <View style={styles.forecastSection}>
        {/* Left Arrow */}
        <TouchableOpacity onPress={scrollToLeft} style={[styles.arrowButton, { left: 10 }]}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {weatherData?.forecast?.forecastday.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
              <Image
                source={getWeatherImage(day.day.condition.text)}
                style={styles.forecastIcon}
              />
              <Text style={styles.tempText}>
                {Math.round(day.day.avgtemp_c)}°C
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Right Arrow */}
        <TouchableOpacity onPress={scrollToRight} style={[styles.arrowButton, { right: 10 }]}>
          <Ionicons name="arrow-forward-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  header: {
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 0,
  },
  weatherSection: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  temperatureText: {
    fontSize: 54,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherConditionText: {
    fontSize: 18,
    color: 'white',
    marginVertical: 5,
  },
  dateTimeText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  forecastSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
    marginLeft: 50,
  },
  dayContainer: {
    backgroundColor: '#1844A5',
    borderRadius: 50,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 75,
    height: 150,
    marginRight: 8,
  },
  dayText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  forecastIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginVertical: 9,
  },
  tempText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  weekly: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
  },
  arrowButton: {
    position: 'absolute',
    top: '35%',
    zIndex: 1,
    padding: 10,
  },
});

export default Homepage;
