import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>OR</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9D9D9', 
    marginRight: 20,
    marginLeft: 20
  },
  textContainer: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 10,
  },
  text: {
    color: '#D9D9D9', 
    fontSize: 12,
  },
});

export default OrDivider;