import React , { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Card, ListItem,  Icon } from 'react-native-elements'


const list = [
    {
        title : '첫 번째 공지입니다.',
        content : '1번'
    },
    {
        title : '두 번째 공지입니다.',
        content : '2번'
    },
    {
        title : '세 번째 공지입니다.',
        content : '3번'
    },

]


export default class SettingsNotice extends Component {

    render () {

        return (

            <View
                style={{ paddingHorizontal: 20}}
            >
                
            </View>

        )
    }


}