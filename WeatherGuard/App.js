import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './app/_layout'; // Adjust the path as necessary

const App = () => {
  return (
    <NavigationContainer>
      <RootLayout /> {/* Ensure RootLayout is used as a screen */}
    </NavigationContainer>
  );
};

export default App;