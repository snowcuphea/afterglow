import React from 'react';
import { connect } from 'react-redux'
import ActionCreator from '../../store/actions'

import {StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

import { Card, Input  } from 'react-native-elements'


class AddMoneyItem extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      nowWhat:'',
      nowMuch:'',
      whatValid: false,
      muchValid: false,
    }
  }


  setName = async (t) => {
    await this.setState({ ...this.state, nowWhat: t });
    if (t.trim().length === 0) {
      // console.log("잘못된 사용처")
      this.setState({ ...this.state, whatValid: false });
    } else {
      this.setState({ ...this.state, whatValid: true });
    }
  }


  setMoney = async (t) => {
    await this.setState({ ...this.state, nowMuch: t });
    let pattern = /[0-9]/;

    if (!pattern.test(t)) {
      // console.log("잘못된금액")
      this.setState({ 
        ...this.state, muchValid: false });
    } else {
      this.setState({ 
        ...this.state, muchValid: true });
    }
  }


  addItem = () => {
    const moneyitem = {
      "day_id": this.props.todayTravel.dr_id,
      "consumption_name":this.state.nowWhat,
      "consumption_money": this.state.nowMuch,
      "consumption_time": new Date()
    }
    console.log("머니아이템", moneyitem)
    this.props.addMoneyItem(moneyitem)

    this.setState({ 
      nowWhat:'',
      nowMuch:'',
      whatValid: false,
      muchValid: false,
    });
  }

  render() { 
    return (
      <Card >
      <View styles={styles.inputContainer}>
        <View>
          <Input
            placeholder='사용처'
            value={this.state.nowWhat}
            onChangeText={(t) => this.setName(t)}
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
            onChangeText={(t) => this.setMoney(t)}
            keyboardType = 'numeric' />
        </View>
        {
        ( this.state.whatValid
          ? (this.state.muchValid ? <Text>OK</Text> : <Text>가격을 적어주세요.</Text> )
          : <Text>사용처를 적어주세요.</Text> ) 
        
        }

        <TouchableOpacity
          style={{backgroundColor:'beige', alignItems: 'center'}}
          onPress={ (this.state.whatValid && this.state.muchValid)
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
    todayTravel: state.accountRd.todayTravel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMoneyItem: (moneyitem) => {
      dispatch({
        type: "ADD_MONEY_ASYNC",
        payload: moneyitem
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMoneyItem)