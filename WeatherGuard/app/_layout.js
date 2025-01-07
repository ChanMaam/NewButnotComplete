import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

import Login from './Login';
import Signup from './Signup';
import Homepage from './Homepage';
import Notification from './Notification';
import SideMenu from '../components/SideMenu';
import Opening from './Opening';
import Map from './MapScreen';
import Settings from './Settings';
import Account from './Account';
import About from './About';
import Privacyandsecurity from './Privacyandsecurity';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Navigator
const BottomTabs = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#FCB316',
      tabBarInactiveTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: '#091A3F',
      },
      headerStyle: {
        backgroundColor: '#091A3F',
      },
      headerTintColor: '#fff',
    }}
  >
    <Tab.Screen
      name="Home"
      component={Homepage}
      options={{
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'home' : 'home-outline'}
            size={24}
            color="#FCB316"
          />
        ),
        headerShown: false, // Hide header for Home screen
      }}
    />
    <Tab.Screen
      name="Notification"
      component={Notification}
      options={{
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'bell' : 'bell-outline'}
            size={24}
            color="#FCB316"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Map"
      component={Map}
      options={{
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'map' : 'map-outline'}
            size={24}
            color="#FCB316"
          />
        ),
      }}
    />
    <Tab.Screen
      name="DrawerToggle"
      component={() => null} // Placeholder
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          navigation.openDrawer(); // Open drawer on tab press
        },
      }}
      options={{
        title: 'Menu',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="menu" size={24} color="#FCB316" />
        ),
      }}
    />
  </Tab.Navigator>
);

// Auth Stack Navigator
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Opening"
    screenOptions={{
      headerStyle: { backgroundColor: '#091A3F' },
      headerTintColor: '#fff',
    }}
  >
    <Stack.Screen
      name="Opening"
      component={Opening}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{ title: 'Create an Account' }}
    />
  </Stack.Navigator>
);

// Settings Stack Navigator
const SettingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#091A3F' },
      headerTintColor: '#fff',
    }}
  >
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={({ navigation }) => ({
        title: 'Settings',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MainApp')}
            style={{ paddingHorizontal: 10 }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen name="Account" component={Account} />
    <Stack.Screen name="Privacyandsecurity" component={Privacyandsecurity} />
    <Stack.Screen name="About" component={About} />
    <Stack.Screen
      name="EmailPass"
      component={require('./EmailPass').default} // Dynamically import EmailPass
    />
  </Stack.Navigator>
);

// Root Drawer Navigator
const RootLayout = () => (
  <Drawer.Navigator
    initialRouteName="Auth"
    drawerContent={(props) => <SideMenu {...props} />}
    screenOptions={{
      drawerStyle: { backgroundColor: 'rgba(9, 26, 63, 0.😎' },
      drawerPosition: 'right',
      headerShown: false,
    }}
  >
    <Drawer.Screen name="Auth" component={AuthStack} />
    <Drawer.Screen name="MainApp" component={BottomTabs} />
    <Drawer.Screen name="Settings" component={SettingsStack} />
  </Drawer.Navigator>
);

export default RootLayout;