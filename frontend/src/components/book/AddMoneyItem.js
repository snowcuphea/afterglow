import React from 'react';
import { connect } from 'react-redux'
import ActionCreator from '../../store/actions'

import {StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

import { Card, Input  } from 'react-native-elements'



class AddMoneyItem extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      nowHour:'',
      nowMin:'',
      nowWhat:'',
      nowMuch:'',
    }
  }

  componentDidMount() {
    const nowTime = new Date()
    this.setState({
      nowHour: nowTime.getHours(),
      nowMin: nowTime.getMinutes(),
      nowWhat:'',
      nowMuch:'',
    });
  }

  setHour = (t) => {
    this.setState({ nowHour: t });
  }
  setMin = (t) => {
    this.setState({ nowMin: t });
  }
  setWhat = (t) => {
    this.setState({ nowWhat: t });
  }
  setMuch = (t) => {
    this.setState({ nowMuch: t });
  }

  addItem = () => {
    const moneyitem = {
      hour: parseInt(this.state.nowHour),
      min: parseInt(this.state.nowMin),
      what: this.state.nowWhat,
      much: this.state.nowMuch
    }
    console.log("머니아이템", moneyitem)
    this.props.addMoneyItem(moneyitem)

    const nowTime = new Date()
    this.setState({ 
      nowHour: nowTime.getHours(),
      nowMin: nowTime.getMinutes(),
      nowWhat:'',
      nowMuch:'', 
    });
  }

  render() { 
    return (
      <Card >
      <View styles={styles.inputContainer}>
        <View style={{width:50}}>
          <Input 
            placeholder='HH'
            keyboardType = 'numeric'
            value={String(this.state.nowHour)}
            onChangeText={(t) => this.setHour(t)}
            style={{fontSize:15}} />
        </View>
        <View>
          <Input
            placeholder='MM'
            keyboardType = 'numeric'
            value={String(this.state.nowMin)}
            onChangeText={(t) => this.setMin(t)}
            style={{fontSize:15}} />
        </View>
        <View>
          <Input
            placeholder='사용처'
            value={this.state.nowWhat}
            onChangeText={(t) => this.setWhat(t)}
            style={{fontSize:15}} />
        </View>
        <View>
          <Input
            placeholder='비용(원)'
            style={{fontSize:15}}
            value={String(this.state.nowMuch)}
            onChangeText={(t) => this.setMuch(t)}
            keyboardType = 'numeric' />
        </View>
        <TouchableOpacity
          style={{backgroundColor:'orange', alignItems: 'center'}}
          onPress={this.addItem} >
          <Text>추가</Text>
        </TouchableOpacity>
      </View>
      </Card>

    )
  }

}

const styles = StyleSheet.create({
 
  inputContainer: {
    flexDirection: 'row',
    // alignItems: 'center'
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
    addMoneyItem: (moneyitem) => {
      dispatch(ActionCreator.addMoneyItem(moneyitem))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMoneyItem)