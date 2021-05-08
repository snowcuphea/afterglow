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
      timeValid: true,
      whatValid: false,
      muchValid: false,
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
    let pattern = /^([1-9]|[01][0-9]|2[0-3])$/;
    if (!pattern.test(t)){
      console.log("잘못된 시간(시).")
      this.setState({ timeValid: false });
    }else {
      this.setState({ timeValid: true });
    }
  }
  setMin = (t) => {
    this.setState({ nowMin: t });
    let pattern = /^([0-5][0-9])$/;
    if (!pattern.test(t)){
      console.log("잘못된 시간(분).")
      this.setState({ timeValid: false });
    }else {
      this.setState({ timeValid: true });
    }
  }
  setWhat = (t) => {
    this.setState({ nowWhat: t });
    if (t.trim().length === 0) {
      console.log("잘못된 사용처")
      this.setState({ whatValid: false });
    } else {
      this.setState({ whatValid: true });
    }
  }
  setMuch = (t) => {
    this.setState({ nowMuch: t });
    let pattern = /[0-9]/;
    if (!pattern.test(t)) {
      console.log("잘못된금액")
      this.setState({ muchValid: false });
    } else {
      this.setState({ muchValid: true });
    }
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
            onEndEditting={() => console.log("onEndEditting")}
            onSubmitEditing={() => console.log("onSubmitEditing")}
            returnKeyType="next"
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
        { this.state.timeValid
        ? ( this.state.whatValid ? (this.state.muchValid ? <Text>OK</Text> : <Text>가격을 적어주세요.</Text> ) : <Text>사용처를 적어주세요.</Text> ) 
        : <Text>올바른 시간을 적어주세요. </Text>
        }
        <TouchableOpacity
          style={{backgroundColor:'beige', alignItems: 'center'}}
          onPress={ (this.state.timeValid && this.state.whatValid && this.state.muchValid)
          ? this.addItem
          : ()=> {console.log("가계부추가실패")}}
          >
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