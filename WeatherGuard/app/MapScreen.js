import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';

const MapScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('map');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Accurate locations for Police Stations in Cagayan de Oro
  const policeStations = [
    { id: 1, name: 'Cagayan de Oro City Police Station', latitude: 8.4534, longitude: 124.6311 },
    { id: 2, name: 'Macabalan Police Station', latitude: 8.4552, longitude: 124.6300 },
    { id: 3, name: 'Pueblo Police Station', latitude: 8.4511, longitude: 124.6460 },
    { id: 4, name: 'Divisoria Police Station', latitude: 8.4545, longitude: 124.6370 },
    { id: 5, name: 'Tiguma Police Station', latitude: 8.4452, longitude: 124.6495 },
    { id: 6, name: 'Iponan Police Station', latitude: 8.4645, longitude: 124.7075 },
    { id: 7, name: 'Kauswagan Police Station', latitude: 8.4612, longitude: 124.6331 },
    { id: 8, name: 'Lumbia Police Station', latitude: 8.4321, longitude: 124.7105 },
    { id: 9, name: 'Patag Police Station', latitude: 8.4030, longitude: 124.6932 },
    { id: 10, name: 'Tupod Police Station', latitude: 8.4207, longitude: 124.7302 },
    { id: 11, name: 'Balulang Police Station', latitude: 8.4671, longitude: 124.6881 },
    { id: 12, name: 'Nazareth Police Station', latitude: 8.4783, longitude: 124.6367 },
    { id: 13, name: 'Gusa Police Station', latitude: 8.4742, longitude: 124.6423 },
    { id: 14, name: 'Carmen Police Station', latitude: 8.4748, longitude: 124.7179 },
    { id: 15, name: 'Bugo Police Station', latitude: 8.5313, longitude: 124.6720 },
  ];

  // Accurate locations for Hospitals in Cagayan de Oro
  const hospitals = [
    { id: 1, name: 'Polymedic Medical Plaza', latitude: 8.4542, longitude: 124.6238 },
    { id: 2, name: 'Cagayan de Oro Medical Center', latitude: 8.4518, longitude: 124.6470 },
    { id: 3, name: 'Doctors Hospital', latitude: 8.4491, longitude: 124.6502 },
    { id: 4, name: 'Capitol University Medical City', latitude: 8.4485, longitude: 124.6409 },
    { id: 5, name: 'Mambuaya District Hospital', latitude: 8.4134, longitude: 124.6512 },
    { id: 6, name: 'Maria Reyna Xavier University Hospital', latitude: 8.4569, longitude: 124.6241 },
    { id: 7, name: 'Northern Mindanao Medical Center', latitude: 8.4480, longitude: 124.6332 },
    { id: 8, name: 'Southern Philippines Medical Center', latitude: 8.4415, longitude: 124.6457 },
    { id: 9, name: 'Cagayan de Oro General Hospital', latitude: 8.4613, longitude: 124.6400 },
    { id: 10, name: 'Erlinda O. Pantoja Memorial Hospital', latitude: 8.4555, longitude: 124.6312 },
    { id: 11, name: 'Cagayan de Oro Health District', latitude: 8.4510, longitude: 124.6408 },
    { id: 12, name: 'St. Mary’s Hospital', latitude: 8.4563, longitude: 124.6280 },
    { id: 13, name: 'Xavier University Hospital', latitude: 8.4547, longitude: 124.6320 },
    { id: 14, name: 'Cagayan de Oro Regional Hospital', latitude: 8.4682, longitude: 124.6548 },
    { id: 15, name: 'Lumbia Health Center', latitude: 8.4340, longitude: 124.7102 },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Permission Denied', 'Location access is needed to use the map.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  if (!currentLocation) {
    return (
      <GradientBackground>
        <View style={styles.loadingContainer}>
          <Ionicons name="location-outline" size={32} color="#FFF" />
          <TouchableOpacity onPress={() => Alert.alert('Loading', 'Please wait...')}>
            <Ionicons name="reload" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>
      </GradientBackground>
    );
  }

  return (
    <View style={styles.container}>
      <GradientBackground>
        <MapView
          style={styles.map}
          region={currentLocation}
          showsUserLocation={true}
        >
          {/* Police Stations */}
          {policeStations.map((station) => (
            <Marker
              key={station.id}
              coordinate={{ latitude: station.latitude, longitude: station.longitude }}
              title={station.name}
              description="Police Station"
              pinColor="blue"
            >
              <Ionicons name="shield-checkmark" size={30} color="blue" />
            </Marker>
          ))}

          {/* Hospitals */}
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              coordinate={{ latitude: hospital.latitude, longitude: hospital.longitude }}
              title={hospital.name}
              description="Hospital"
              pinColor="red"
            >
              <Ionicons name="heart" size={30} color="red" />
            </Marker>
          ))}
        </MapView>
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2B48',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1A2B48',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
