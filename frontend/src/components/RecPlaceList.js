import React from 'react'

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

import { connect } from 'react-redux'
import ActionCreator from '../store/actions';


// const places = [
//   { id: 1, name: "산방산", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
//   { id: 2, name: "카멜리아 힐", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
//   { id: 3, name: "사려니 숲", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
//   { id: 4, name: "산방산", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
//   { id: 5, name: "레이지박스", time: "12", location: { lat: 13, lon: 13}, memo: "asd" },
// ]

class RecPlaceList extends React.Component {

  constructor(props){
    super(props)
  }



  render() {

    const renderdata = ({item}) => {

      return (
        <TouchableOpacity onPress={() => console.log(item.td_name)}>
          <View style={styles.itemContainer}>
            <Text>{ item.td_name }</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (

      <View style={styles.container}>
        <FlatList
          data={this.props.recoPlace}
          renderItem={renderdata}
          keyExtractor = {(data) => data.td_id}
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
    marginHorizontal: 15,
    marginVertical: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
  }
})



function mapStateToProps(state){
  return {
    recoPlace : state.accountRd.recoPlace,
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     selectPin: (pinData) => {
//       dispatch(ActionCreator.selectPin(pinData))
//     },
//     getCurrentInfo: (dr_id)=>{
//       dispatch({
//         type: "GET_CURRENT_INFO_ASYNC",
//         payload: dr_id
//       })
//     },
//   };
// }



export default connect(mapStateToProps)(RecPlaceList)
