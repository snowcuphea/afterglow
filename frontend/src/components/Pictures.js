import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';


export default class test extends React.Component {
    render () {
        const renderdata = ({ item }) => (
            <View>
                <Image style={{ width: screenWidth/3, height: screenHeight/8, marginTop: '5%', marginBottom: '5%' }}source={ item.src } />
            </View>
        )
        
    
        const test_data = [
            {
                src: require('../assets/pics/1.png')
            },
            {
                src: require('../assets/pics/2.png')
            },
            {
                src: require('../assets/pics/3.png')
            },
            {
                src: require('../assets/pics/4.png')
            },
            {
                src: require('../assets/pics/5.png')
            },
        ]

        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;


        return (
            <View>
                <FlatList 
                ListHeaderComponent = {
                    <View>
                        <Text style={{ fontSize: screenHeight/30 }}>날짜</Text>
                    </View>
                }
                data = {test_data}
                renderItem = {renderdata}
                keyExtractor = {(data) => data.src}
                numColumns = {3}
                
            
            
                />
                <FlatList />

            </View>


        )
    }
}