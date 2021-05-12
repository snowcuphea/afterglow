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

  constructor(props) {
    super(props)
  }


  toSingleHistory = () => {
    this.props.navigation.navigate("SingleTravelHistory")
  }


  render() {

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    const renderdata = ({ item }) => {

      return (
        <View>
          <TouchableOpacity style={{ margin: 10}} onPress={() => this.toSingleHistory()}>
            <Image 
              style={{ width: (screenWidth-100)/2, height: (screenWidth-8)/2, backgroundColor: "pink"}} 
              source={{ uri: "../assets/pics/1.png" }}/>
              <View style={styles.imageTextContainer}>
                <Text>{item.date}</Text>
                <Text>{item.name}</Text>
              </View>
          </TouchableOpacity>
        </View>
      )
    }

    return(
      <FlatList
        style={{ marginHorizontal:20 }}
        data={tempList}
        numColumns={2}
        renderItem={renderdata}
        keyExtractor={(data) => data.name }
      />
    )
  }
}

const styles = StyleSheet.create({
  imageTextContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  }
})


export default MainList