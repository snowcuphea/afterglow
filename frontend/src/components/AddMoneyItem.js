import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';

import { Card, Input  } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class MoneyBook extends React.Component {

  constructor (props) {
    super(props)
  }

  render() {
    
    return (
      <Card >
      <View styles={styles.inputContainer}>
        <View style={{width:50}}>
          <Input 
            placeholder='HH'
            keyboardType = 'numeric'
            style={{fontSize:15}} />
        </View>
        <View>
          <Input
            placeholder='MM'
            keyboardType = 'numeric'
            style={{fontSize:15}} />
        </View>
        <View>
          <Input
            placeholder='사용처'
            style={{fontSize:15}} />
        </View>
        <View>
          <Input
            placeholder='비용(원)'
            style={{fontSize:15}}
            keyboardType = 'numeric' />
        </View>
        <TouchableOpacity
          style={{backgroundColor:'orange', alignItems: 'center'}}
          >
          <Text>추가</Text>
        </TouchableOpacity>
      </View>
      </Card>

    )
  }

}

const styles = StyleSheet.create({
 
  inputContainer: {
    flexDirection: 'row',
    // alignItems: 'center'
  },
  
  
})



