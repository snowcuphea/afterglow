import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack' 
import { NavigationContainer, DrawerActions, useNavigation, CommonActions } from '@react-navigation/native'
import { connect } from 'react-redux'

import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/account/Login';
import HomeScreen from './screens/Home';
import OnTravelMain from './screens/onTravel/OnTravelMain';
import OnTravelAllPictures from './screens/onTravel/OnTravelAllPictures';
import OnTravelShare from './screens/onTravel/OnTravelShare';
import OnTravelSinglePicture from './screens/onTravel/OnTravelSinglePicture';
import AfterDayMain from './screens/afterDay/AfterDayMain';
import AfterDayAllPictures from './screens/afterDay/AfterDayAllPictures';
import AfterDayShare from './screens/afterDay/AfterDayShare';
import AfterTravelMain from './screens/afterTravel/AfterTravelMain';
import AfterTravelShare from './screens/afterTravel/AfterTravelShare';
import SettingsMain from './screens/settingss/SettingsMain';
import TravelHistoryMain from './screens/travelHistory/TravelHistoryMain'
import SingleTravelHistory from './screens/travelHistory/SingleTravelHistory'
import SelectPictures from './screens/common/SelectPictures';
import SinglePicture from './screens/common/SinglePicture';

import ActionCreator from './store/actions'

import Counter from './screens/Counter';

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

  function save() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'AfterDayMain'},
        ]
      })
    )
  }

  return(
    <View style={{flexDirection: 'row', paddingRight: 15}}>
      <TouchableOpacity 
        onPress={save}
      >
        <Text>{amount} 저장</Text>
      </TouchableOpacity>
    </View>

  )
}

const initialRouteName = (isLogin) => {

  if (isLogin) {
    return "Home"
  } else {
    return "Login"
  }
}

const travelTitle = "100일 기념 제주도"

const StackComponent = (props) => {

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName(props.isLogin)}
      screenOptions = {{
        headerRight: () => <MenuBar />,
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
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
        name="OnTravelAllPictures"
        component={OnTravelAllPictures}
        options={{
          title: "여행 중 사진모아보기"
        }}
      />
      <Stack.Screen 
        name="OnTravelSinglePicture"
        component={OnTravelSinglePicture}
        options={{
          title: "여행 중 사진하나보기"
        }}
      />
      <Stack.Screen 
        name="OnTravelShare"
        component={OnTravelShare}
        options={{
          title: "여행 중 사진공유"
        }}
      />
      <Stack.Screen 
        name="AfterDayMain"
        component={AfterDayMain}
        options={{
          title: "하루 끝"
        }}
      />
      <Stack.Screen 
        name="AfterDayAllPictures"
        component={AfterDayAllPictures}
        options={{
          title: "하루 끝 사진 모아보기"
        }}
      />
      <Stack.Screen 
        name="AfterDayShare"
        component={AfterDayShare}
        options={{
          title: "하루 끝 사진 공유하기"
        }}
      />
      <Stack.Screen 
        name="AfterTravelMain"
        component={AfterTravelMain}
        options={{
          title: "여행 끝"
        }}
      />
      <Stack.Screen
        name="AfterTravelShare"
        component={AfterTravelShare}
        options={{
          title: <Text>여행 끝 공유하기</Text>
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
        name="SelectPicture"
        component={SelectPictures}
        options={{
          title: `하루 끝: ${travelTitle}`,
          headerRight: () => <SavePicture {...props} />,
        }}
      />
      <Stack.Screen 
        name="SinglePicture"
        component={SinglePicture}
        options={{
          title: "하루 끝 사진 하나보기",
          headerRight: () => <SavePicture {...props} />,
        }}
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
    user_nickname: state.accountRd.user_nickname,
    selectedPictures: state.pictureRd.pictures,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePictures: () => {
      dispatch(ActionCreator.savePictures())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StackComponent) 