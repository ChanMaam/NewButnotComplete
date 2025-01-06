import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const Logo = ({ size }) => {
  return (
    <View style={styles.container}>
        <Image
        source={require('../assets/images/logo.png')}
        style={[styles.image, { width : size, height : size}]}
        />
    </View>
  )
}

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center'
    },
    image: {
        resizeMode: 'contain'
    }
})
export default Logo