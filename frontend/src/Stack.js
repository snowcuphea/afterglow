import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { createStackNavigator, CardStyleInterpolators, HeaderBackButton} from '@react-navigation/stack' 
import { NavigationContainer, DrawerActions, useNavigation, CommonActions } from '@react-navigation/native'
import { connect } from 'react-redux'

import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/account/Login';
import HomeScreen from './screens/Home';
import OnTravelMain from './screens/onTravel/OnTravelMain';
import SettingsMain from './screens/settingss/SettingsMain';
import TravelHistoryMain from './screens/travelHistory/TravelHistoryMain';
import SingleTravelHistory from './screens/travelHistory/SingleTravelHistory';
import SavePictures from './screens/common/SavePictures';
import SinglePicture from './screens/common/SinglePicture';
import ShowPictures from './screens/common/ShowPictures';
import EndTravelMain from './screens/endTravel/EndTravelMain';

import ActionCreator from './store/actions'

import Counter from './screens/Counter';

import Map_In_Main from './components/Map_In_Main'
import Maps_cluster from './screens/Maps_cluster'
import CurrentLocation from './screens/CurrentLocation'
import Test_Maps from './screens/Test_Maps'

const Stack = createStackNavigator();

const MenuBar = () => {
  const navigation = useNavigation();

  return(
    <View style={{flexDirection: 'row', paddingRight: 15}}>
      <TouchableOpacity 
        onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}
      >
        <Ionicons name={'menu'} size={20} style={{ color: "black"}}/>
      </TouchableOpacity>
    </View>

  )
}

const SavePicture = (props) => {

  const navigation = useNavigation();
  // const amount = 3
  const amount = props.selectedPictures.length
  const mode = props.mode
  const status = props.travelStatus

  const uploadPicture = () => {
    console.log(props.selectedPictures)
    if (status === "dayEndd") {
      props.changeStatus('dayEnd')
    } else if (status === "travelEndd") {
      props.changeStatus('travelEnd')
    }
    props.savePictures()
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'EndTravelMain'},
        ]
      })
    )
  }

  if ( mode === "save" ) {
    return(
      <View style={{flexDirection: 'row', paddingRight: 15}}>
        <TouchableOpacity 
          onPress={()=> uploadPicture() }
        >
          <Text>{amount} 저장</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return(
      <View style={{flexDirection: 'row', paddingRight: 15}}>
        { mode === "look" ? 
          <TouchableOpacity
            onPress={()=> {
              props.modePicture('share')
            }}
          >
            <Text>공유하기</Text>
          </TouchableOpacity> :
          <TouchableOpacity
            onPress={()=> {
              props.modePicture('look')
            }}
          >
            <Text>{amount} 공유</Text>
          </TouchableOpacity>  
        }
      </View>
    )
  }
}

const initialRouteName = (isLogin) => {

  if (isLogin) {
    return "Home"
  } else {
    return "Login"
  }
}

const StackComponent = (props) => {

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName(props.isLogin)}
      screenOptions = {{
        headerRight: () => <MenuBar />,
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {backgroundColor: 'ghostwhite'}
      }}
      headerMode="float"
      animation="fade"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={
          {
            headerShown: false
          }
        }
      />
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          title: "여운",
        }}
      />
      <Stack.Screen 
        name="OnTravelMain"
        component={OnTravelMain}
        options={{
          title: "여행 중"
        }}
      />
      <Stack.Screen
        name="SettingsMain"
        component={SettingsMain}
        options={{
          title: '설정',
          headerRight: false,
        }}
      />
      <Stack.Screen
        name="EndTravelMain"
        component={EndTravelMain}
        options={{
          title: <Text>하루 기록 보는 화면</Text>
        }}
      />
      <Stack.Screen
        name="TravelHistoryMain"
        component={TravelHistoryMain}
        options={{
          title: <Text>여행 전체 기록</Text>
        }}
      />
      <Stack.Screen
        name="SingleTravelHistory"
        component={SingleTravelHistory}
        options={{
          title: <Text>선택한 여행 상세 기록</Text>
        }}
      />
      <Stack.Screen 
        name="SavePictures"
        component={SavePictures}
        options={{
          title: "사진 저장",
          headerRight: () => <SavePicture {...props} />,
        }}
      />
      <Stack.Screen 
        name="SinglePicture"
        component={SinglePicture}
        options={{
          title: "사진 보기",
          headerRight: () => <SavePicture {...props} />,
        }}
      />
      <Stack.Screen 
        name="ShowPictures"
        component={ShowPictures}
        options={{
          title: props.mode === 'look' ? "사진 보기" : "사진 공유",
          headerRight: () => <SavePicture {...props} />,
        }}
      />
      <Stack.Screen
        name="CurrentLocation"
        component={CurrentLocation}
      />
      <Stack.Screen
        name="Map_In_Main"
        component={Map_In_Main}
      />
      <Stack.Screen
        name="Maps_cluster"
        component={Maps_cluster}
      />
      <Stack.Screen
        name="Test_Maps"
        component={Test_Maps}
      />
      <Stack.Screen
        name="Counter"
        component={Counter}
      />
      
    </Stack.Navigator>
  )
}

function mapStateToProps(state) {

  return {
    isLogin: state.accountRd.isLogin,
    user_nickname: state.accountRd.user.nickname,
    selectedPictures: state.pictureRd.pictures,
    travelStatus: state.accountRd.travelStatus,
    mode: state.pictureRd.mode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePictures: () => {
      dispatch(ActionCreator.savePictures())
    },
    changeStatus: (status) => {
      dispatch({
        type: "CHANGE_STATUS_ASYNC",
        payload: status
      })
    },
    modePicture: (mode) => {
      dispatch(ActionCreator.modePicture(mode))
    },
    dayEnd: () => {
      dispatch({
        type: "END_DAY_ASYNC"
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StackComponent) 