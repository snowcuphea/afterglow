import React from 'react'

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'


const places = [
  { id: 1, name: "산방산", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
  { id: 2, name: "카멜리아 힐", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
  { id: 3, name: "사려니 숲", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
  { id: 4, name: "산방산", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
  { id: 5, name: "레이지박스", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
]

class RecPlaceList extends React.Component {

  constructor(props){
    super(props)
  }



  render() {

    const renderdata = ({item}) => {

      return (
        <TouchableOpacity onPress={() => console.log(item.name)}>
          <View style={styles.itemContainer}>
            <Text>{ item.name }</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (

      <View style={styles.container}>
        <FlatList
          data={places}
          renderItem={renderdata}
          keyExtractor = {(data) => data.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

    )
  }
}

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width


const styles= StyleSheet.create({
  container: {
  },
  itemContainer: {
    backgroundColor: '#BB88CC',
    justifyContent: 'center',
    marginHorizontal: screenWidth/40,
    marginVertical: screenHeight/60,
    paddingVertical: screenWidth/40,
    paddingHorizontal: screenHeight/50,
    borderRadius: 35,
  }
})

export default RecPlaceList