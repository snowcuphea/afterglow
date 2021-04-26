import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


export default function HelloWorld() {

  return (
    <View style={styles.container}>
      <Text>
        Hello World
      </Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})