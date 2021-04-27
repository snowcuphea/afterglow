import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';



class ToImgs extends React.Component {
    render() {
        return (
          <View>
            <FlatList 
              data={[
                require('../img/1.png'),
                require('../img/2.png'),
                require('../img/3.png'),
                require('../img/4.png'),
                require('../img/5.png'),
              ]}
              renderItem={({item}) => {
                <Image source={item}></Image>
              }}
              keyExtractor={
                (index) => {return index}
              }
            />
          </View>
        )
      }
    }
  
    
const data = [
    {
        src: 1,
    },
    {
        src: 2,
    },
    {
        src: 3,
    },
    {
        src: 4,
    },
    {
        src: 5,
    }

]



const styles = StyleSheet.create({
    Img: {
        flex: 1,
        padding: 10
    }
})


export default ToImgs;