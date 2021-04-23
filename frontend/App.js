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

import HelloWorld from "./components/HelloWorld"

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <HelloWorld />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT: 0,
    // paddingHorizontal: 10,
  },
})