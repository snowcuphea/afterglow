import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions,} from 'react-native';

import { Card, ListItem, Input  } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux'
import ActionCreator from '../store/actions';

import RoutePicturesHorz from './picture/RoutePictureHorz'

class PinClickPage extends React.Component {

  constructor (props) {
    //부모 컴포넌트로부터 선택된 방문정보 객체로 받아온상태
    //this.props.selectedPin 하면 정보 쫙나옴
    super(props)
		this.state = {
			modifyStatus: false,
			memoText:'',
			newMemoText:'',
		}
  }


	setText = (t) => {
    this.setState({ ...this.state, newMemoText: t });
		console.log("memoText", this.state.memoText)
		console.log("newMemoText", this.state.newMemoText)
  }

//   selectPinFunc = () => {
// 		this.setState({ clickPin: false });
//   }

	switchStatus = (val) => {
		this.setState({ ...this.state, modifyStatus: val });
	}

	modifyCancel = () => {
		const memoText = this.state.memoText
		this.setState({ ...this.state, newMemoText: memoText });
		this.switchStatus(false)
	}

	modifyComplete = () => {
		this.switchStatus(false)
    const memoItem = {
      "Rr_id" : this.props.rdPin.rr_id,
      "memo_content": this.state.newMemoText
    }
    // console.log("memotiem?", memoItem)
    this.props.updateMemo(memoItem)
	}



	componentDidUpdate() {
    const rr_memo = this.props.rdPin.rr_memo
    this.setState({
      ...this.state,
      memoText: rr_memo,
      newMemoText: rr_memo });
  }


  render() {
  
    
    
    return (
      <View>
          <TouchableOpacity onPress={() => this.props.selectPinFunc(false)}>
            <Ionicons name={"close-outline"} size={40}/>
          </TouchableOpacity>

          <Text style={{textAlign:'center'}}>{this.props.rdPin.rr_name} </Text>
            <View style={styles.container}>
              <TextInput
                editable={this.state.modifyStatus}
            		multiline={true}
								style={styles.memoInput}
								value={(this.state.newMemoText)}
								onChangeText={(t) => this.setText(t)}
            	/>
							<View style={styles.btnContainer}>
							
							{
								!(this.state.modifyStatus)
								? <Button title={"수정"} onPress={()=>this.switchStatus(true)}/>
								: <View style={styles.btnContainer}>
									<Button title={"취소"} onPress={this.modifyCancel}/>
									<Button title={"완료"} onPress={this.modifyComplete}/>
									</View>
							}
							
							</View>
        		</View>
      </View>
    )
  }

}

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: screenWidth/8,
        marginVertical:screenHeight/20
    },
    
    memoInput:{
        height: screenHeight/8,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
				color: 'black'
    },
		btnContainer:{
			flexDirection:'row',
			justifyContent:'flex-end'
		}
  
  
})

function mapStateToProps(state) {

  return {
    isLogin: state.accountRd.isLogin,
    user_nickname: state.accountRd.user.usr_nickname,
    rdPin : state.accountRd.selectedPin
  }
}


function mapDispatchToProps(dispatch) {
  return {
    updateMemo: (memoItem) => {
      // console.log("mapDispatchToProps")
      dispatch({
        type: "SAVE_MEMO_ASYNC",
        payload: memoItem
      })
    },
    selectPin: () => {
      dispatch(ActionCreator.selectPin(pinData))
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PinClickPage) 


