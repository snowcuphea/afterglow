import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';

import { Card, ListItem, Input  } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux'


class MoneyBook extends React.Component {

  constructor (props) {
    super(props)
  }

  deleteMoney = (item_id) => {
    console.log("삭제할 item_id", item_id)
    const moneyitem = {
      "consumption_id": item_id
    }
    console.log("삭제할인덱스랑같이", moneyitem)
    this.props.deleteMoneyItem(moneyitem)

  }

  render() {
    
    return (
      <View >
        
        <Card >
          <View style={styles.container}>
            <Card.Title style={{flex:2}}>No</Card.Title>
            <Card.Title style={{flex:6}}>사용처</Card.Title>
            <Card.Title style={{flex:4}}>비용</Card.Title>
          </View>
        {
        this.props.conRecs.map((item, i) => {
          return (
          <View key={i} style={styles.listContainer} >
            <View style={styles.itemWhen} >
              <Text style={styles.moenyText}>{i+1}</Text>
            </View>
            <View style={styles.itemWhat} >
              <Text style={styles.moenyText}>{item.cr_name}</Text>
            </View>
            <View style={styles.itemMuch}>
              <Text style={styles.moenyText}>{item.cr_money}</Text>
            </View>
            <TouchableOpacity style={styles.itemDelete}
              onPress={this.deleteMoney(item.cr_id)}
              >
              <Ionicons name="close" size={20}/>
            </TouchableOpacity>
          </View>
          );
         })
        }
      </Card>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  container:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  listContainer: {
    flexDirection: 'row',
    marginBottom:5,
  },
  moneyText:{
    fontSize: 20,
  },
  itemWhen:{flex:2, alignItems:'center',
              // backgroundColor:'pink', 
            },
  itemWhat:{flex:6, alignItems:'center',
              // backgroundColor:'yellow', 
            },
  itemMuch:{flex:3, alignItems:'flex-end',
              // backgroundColor:'beige', 
            },
  itemDelete:{ flex:1, alignItems:'center',
              justifyContent: 'center'
              // backgroundColor:'lime',
            },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  
})

function mapStateToProps(state) {

  return {
    isLogin: state.accountRd.isLogin,
    user_nickname: state.accountRd.user.usr_nickname,
    conRecs: state.accountRd.todayTravel.conRecs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteMoneyItem: (moneyItem) => {
      dispatch({
        type: "DELETE_MONEY_ASYNC",
        payload: moneyItem
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyBook) 


