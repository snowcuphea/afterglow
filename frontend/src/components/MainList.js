import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'


const tempList = [
  { name: "제주도", image: require("../assets/pics/1.png"), date: "2021-04" },
  { name: "양양", image: require("../assets/pics/2.png"), date: "2021-04" },
  { name: "수원", image: require("../assets/pics/3.png"), date: "2021-04" },
  { name: "일산", image: require("../assets/pics/4.png"), date: "2021-04" },
  { name: "속초", image: require("../assets/pics/5.png"), date: "2021-04" },
]




class MainList extends React.Component{


  render() {

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    const renderdata = ({ item }) => {

      return (
        <View>
          <TouchableOpacity>
            <Image 
              style={{ width: (screenWidth-100)/2, height: (screenWidth-8)/2, margin: 10, backgroundColor: "pink"}} 
              source={{ uri: "../assets/pics/1.png" }}/>
          </TouchableOpacity>
        </View>
      )
    }

    return(
      <FlatList
        style={{ marginHorizontal: 20 }}
        data={tempList}
        numColumns={2}
        renderItem={renderdata}
        keyExtractor={(data) => data.name }
      />
    )
  }
}

const styles = StyleSheet.create({

})


export default MainList