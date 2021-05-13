import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions,} from 'react-native';

import { Card, ListItem, Input  } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux'


class PinClickPage extends React.Component {

  constructor (props) {
    super(props)
		this.state = {
			modifyStatus: false,
			memoText:'우리의 추억',
			newMemoText:'',
		}
  }


	setText = (t) => {
    this.setState({ newMemoText: t });
		console.log("memoText", this.state.memoText)
		console.log("newMemoText", this.state.newMemoText)
  }

  childFunction = () => {
		this.setState({ clickPin: val });
  }

	switchStatus = (val) => {
		this.setState({ modifyStatus: val });
	}

	modifyCancel = () => {
		const memoText = this.state.memoText
		this.setState({ newMemoText: memoText });
		this.switchStatus(false)
	}

	modifyComplete = () => {
		this.switchStatus(false)
		//이제 여기에 메모 저장하는 디스패치 필요 
	}

	componentDidMount() {
		const memoText = this.state.memoText
    this.setState({ newMemoText: memoText });
  }


  render() {
    
    return (
      <View>
          <Text>여기는 핀 눌렀을 때 페이지 </Text>
          <Button title={"핀창 끄고싶을때 "} onPress={this.childFunction}/>

          <Text>장소이름: </Text>
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
									<Button title={"완료"} onPress={()=>this.switchStatus(false)}/>
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
  }
}

export default connect(mapStateToProps)(PinClickPage) 


