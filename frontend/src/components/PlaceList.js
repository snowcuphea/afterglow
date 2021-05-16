import React from 'react'

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import ThemedListItem from 'react-native-elements/dist/list/ListItem';
import { connect } from 'react-redux'
import ActionCreator from '../store/actions';


class PlaceList extends React.Component {

  constructor(props){
    super(props)
    this.state={
      pinList:[]
    }
  }

  async componentDidMount() {
    await this.setState({
      ...this.state,
      pinList: this.props.todayTravel.routeRecs.filter(item => item.rr_name !== null && item.rr_name !== "" )
    })

    console.log("placelist에서", JSON.stringify(this.state.pinList,null,2))
  }


  render() {
  

    const renderdata = ({item, index}) => {

      return (
        <TouchableOpacity
            onPress={() => 
              this.props.newSelectPinFunc(item)
              }
          >
          <View style={styles.itemContainer}>
            <Text>{ item.rr_name }</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (

      <View style={styles.container}>
        <FlatList
          data={this.state.pinList}
          renderItem={renderdata}
          keyExtractor = {(data) => data}
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
    backgroundColor: 'green',
    justifyContent: 'center',
    marginHorizontal: screenWidth/40,
    marginVertical: screenHeight/60,
    paddingVertical: screenWidth/40,
    paddingHorizontal: screenHeight/50,
    borderRadius: 35,
  }
})



function mapStateToProps(state){
  // console.log("visitedPlacE?", state.accountRd.visitedPlace)
  return {
    todayTravel: state.accountRd.todayTravel
  }
}



export default connect(mapStateToProps)(PlaceList)