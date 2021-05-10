import React from 'react'

import { connect } from 'react-redux'
import ActionCreator from '../../store/actions'


import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Button, Overlay,Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';



class ModalStartTravel extends React.Component {

  constructor(props){
    super(props)
    this.state = { modalVisible: false, travelName: '' }
  }


  setModalVisible = (visible) => {
    this.setState({ travelName: '' })
    this.setState({ modalVisible: visible });
  }


  setText = (t) => {
    this.setState({ travelName: t });
  }


  startTravel = () => {
    this.props.navigation.navigate('OnTravelMain')
    this.props.changeStatus('onTravel')
    this.props.setDate()
    this.setState({ modalVisible: false });
    this.props.setTravelName(this.state.travelName)
  }


  render() {

    // const { modalVisible } = this.state;

    return (

      <View>
      <Button
      icon={<Ionicons name="airplane" size={25}/>} title="새로운 여행 시작" onPress={ () => this.setModalVisible(!this.state.modalVisible) } />

      <Overlay 
        overlayStyle={styles.container}
        isVisible={this.state.modalVisible}
        onBackdropPress={ () => this.setModalVisible(!this.state.modalVisible)}>
        {/* <View> */}
        <Text>여행 이름을 적어주세요!</Text>
        <Input 
            style={styles.textInputStyle}
            onChangeText={(t) => this.setText(t)}
            value={this.state.travelName}
             />

        <Text style={{textAlign:'center'}}>여행을 시작해볼까요?</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btnCancel} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
          <Text style={styles.txtCancel}>아니오</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStart}
        onPress={ (this.state.travelName.trim().length === 0)
          ? () => alert("여행 이름을 입력해주세요!")
          : this.startTravel}>
          <Text style={styles.txtStart}>시작해요!</Text>
        </TouchableOpacity>
        </View>
        {/* </View> */}
      </Overlay>
    </View>

    )
  }


}

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width


const styles= StyleSheet.create({
  container: {
    backgroundColor: '#f3ffff',
    width : screenWidth/1.5,
    paddingVertical: screenWidth/10,
    paddingHorizontal: screenWidth/30
  },
  textInputStyle : {
    // fontSize : 15,
    // width : '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btnCancel: {
    width: screenWidth/4,
    marginTop: 20,
    backgroundColor: "lightslategrey",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  btnStart: {
    width: screenWidth/4,
    marginTop: 20,
    backgroundColor: "mediumturquoise",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    
  },
  txtCancel: {
    color: "white",
    fontFamily: 'RIDIBatang',
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
  },
  txtStart: {
    color: "white",
    fontWeight: 'bold',
    fontFamily: 'RIDIBatang',
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",

  },
  
})

function mapStateToProps(state){

  return {
    isLogin: state.accountRd.isLogin,
    travelStatus: state.accountRd.travelStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatus: (status) => {
      dispatch(ActionCreator.changeStatus(status))
    },
    setDate: () => {
      dispatch(ActionCreator.setDate())
    },
    setTravelName: (travelname) => {
      dispatch(ActionCreator.setTravelName(travelname))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalStartTravel)