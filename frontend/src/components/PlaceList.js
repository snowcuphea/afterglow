import React from 'react'

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'


const places = [
  { id: 1, name: "애월 해변", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
  { id: 2, name: "하르방 밀면", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
  { id: 3, name: "한라산", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
  { id: 4, name: "비밀의 숲", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
  { id: 5, name: "우도", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
]

class PlaceList extends React.Component {

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
        <Text>
          여행한 곳 보여준다
        </Text>
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
    backgroundColor: 'orange'
  },
  itemContainer: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    marginHorizontal: screenWidth/40,
    marginVertical: screenHeight/60,
    paddingVertical: screenWidth/40,
    paddingHorizontal: screenHeight/50,
    borderRadius: 35,
  }
})

export default PlaceList