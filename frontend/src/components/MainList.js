import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import ActionCreator from '../store/actions';




class MainList extends React.Component{

  constructor(props) {
    super(props)
  }


  toSingleHistory = (index) => {
    this.props.selectIndex(index)
    this.props.navigation.navigate("SingleTravelHistory")
  }


  render() {

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    const renderdata = ({ item, index }) => {
      if (item.dayRecs[0].dr_date === null) {
        console.log("아직 여행중인 item", item["@id"])
      }
      else {
        // console.log("아이템:",JSON.stringify(item,null,2))
        const travelName = item.rec_name
        const travelStartDay = item.dayRecs[0].dr_date
        const len = (item.dayRecs).length
        const travelEndDay = item.dayRecs[len-1].dr_date
        // const travelEndDay = item.dr_end_time
        // console.log("item에 대한 로그",JSON.stringify(item.dayRecs[0],null,2))

        return (
          <View>
            <TouchableOpacity style={{ margin: 10}} onPress={() => this.toSingleHistory(index)}>
              <Image 
                style={{ width: (screenWidth-80)/2, height: (screenWidth+30)/2, backgroundColor: "pink"}} 
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
        showsVerticalScrollIndicator={false}
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

function mapDispatchToProps(dispatch) {
  return {
    selectIndex: (index) => {
      dispatch(ActionCreator.selectIndex(index));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainList)