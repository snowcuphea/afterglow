import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'

import { connect } from 'react-redux'




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
      if (item.dayRecs[0].dr_date === null) {
        console.log("아직 여행중인 item", item["@id"])
      }
      else {
      console.log("아이템:",JSON.stringify(item,null,2))
      const travelName = item.rec_name
      const travelStartDay = item.dayRecs[0].dr_date
      const len = (item.dayRecs).length
      const travelEndDay = item.dayRecs[len-1].dr_date
      // const travelEndDay = item.dr_end_time
      // console.log("item에 대한 로그",JSON.stringify(item.dayRecs[0],null,2))

      return (
        <View>
          <TouchableOpacity style={{ margin: 10}} onPress={() => this.toSingleHistory()}>
            <Image 
              style={{ width: (screenWidth-100)/2, height: (screenWidth-8)/2, backgroundColor: "pink"}} 
              source={{ uri: "../assets/pics/1.png" }}/>
              <View style={styles.imageTextContainer}>

                <Text>{travelStartDay}~</Text>
                <Text>{travelEndDay}</Text>
                <Text>{travelName}</Text>
              </View>
          </TouchableOpacity>
        </View>
      )
    }
    }

    return(
      <FlatList
        style={{ marginHorizontal:20, marginTop: 40 }}
        data={this.props.traveledList}
        numColumns={2}
        renderItem={renderdata}
        keyExtractor={(data) => data.rec_name }
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


function mapStateToProps(state){
  return {
    traveledList: state.accountRd.traveledList
  }
}

export default connect(mapStateToProps)(MainList)