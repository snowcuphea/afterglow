import React from 'react'

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import ActionCreator from '../store/actions';

import randomColor from 'randomcolor'

class PlaceList extends React.Component {

  constructor(props){
    super(props)
    this.state={
      pinList:[],
      colorList: [],
    }
  }

  giveToParentPin = (item) => {
    this.props.selectPin(item)
    this.props.newSelectPinFunc(item)

  }

  async componentDidMount() {
    await this.setState({
      ...this.state,
      pinList: this.props.todayTravel.routeRecs.filter(item => item.rr_name !== null && item.rr_name !== "" )
    })
    // console.log("placelist에서", JSON.stringify(this.state.pinList,null,2))

    const color = await randomColor({
      count: 20,
      luminosity: 'light',
      hue: 'blue'
    })

    await this.setState({
      ...this.state,
      colorList: color,
    })
  }

  render() {

    const renderdata = ({item, index}) => {

      return (
        <TouchableOpacity
            onPress={ () =>
              this.giveToParentPin(item)
              // this.props.newSelectPinFunc(item)
              // this.props.selectPin(item)
              }
            style={[styles.itemContainer, {backgroundColor: this.state.colorList[index] }]}
          >
          <Text>{ item.rr_name }</Text>
        </TouchableOpacity>
        )
    }

    return (

      <View style={styles.container}>
        <FlatList
          data={this.state.pinList}
          renderItem={renderdata}
          keyExtractor = {(data) => data.rr_id}
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
    justifyContent: 'center',
    marginHorizontal: screenWidth/40,
    marginVertical: screenHeight/60,
    paddingVertical: screenWidth/40,
    paddingHorizontal: screenHeight/50,
    borderRadius: 35,
  }
})



function mapStateToProps(state){
  return {
    todayTravel: state.accountRd.todayTravel
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectPin: (pinData) => {
      dispatch(ActionCreator.selectPin(pinData))
    }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(PlaceList)