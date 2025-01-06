import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'

const InputField: React.FC<InputFieldProps> = ({ title, label, secureTextEntry, style }) => {
  const [value, setValue] = useState(''); 

  return (
    <View style={[styles.container, style]}> 
      {title && <Text style={styles.title}>{title}</Text>} 
      <TextInput 
        mode="flat"
        label={label}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={text => setValue(text)} 
        style={styles.input}
        theme={{
          colors: {
            primary: '#D9D9D9',
            background: 'rgba(255, 255, 255, 0.5)',
          }
        }}
        textColor="black"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 10,
  },
  title: {
    marginBottom: 5,
    color: 'white'
  },
  input: {
    width: '100%',
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
  },
});

export default InputField;