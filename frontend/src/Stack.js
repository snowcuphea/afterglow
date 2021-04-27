import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack' 
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/Home'
import OnTravelMain from './screens/onTravel/OnTravelMain';
import OnTravelAllPictures from './screens/onTravel/OnTravelAllPictures';
import OnTravelShare from './screens/onTravel/OnTravelShare';
import OnTravelSinglePicture from './screens/onTravel/OnTravelSinglePicture';
import AfterDaySelect from './screens/afterDay/AfterDaySelect';
import AfterDayMain from './screens/afterDay/AfterDayMain';
import AfterDayAllPictures from './screens/afterDay/AfterDayAllPictures';
import AfterDayShare from './screens/afterDay/AfterDayShare';
import AfterDaySinglePicture from './screens/afterDay/AfterDaySinglePicture';
import AfterTravelSelect from './screens/afterTravel/AfterTravelSelect';
import AfterTravelMain from './screens/afterTravel/AfterTravelMain';
import AfterTravelShare from './screens/afterTravel/AfterTravelShare';

import Pictures from './components/Pictures'

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

const StackComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        name="AfterDaySelect"
        component={AfterDaySelect}
        options={{
          title: "하루 끝 사진 저장"
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
        name="AfterDaySinglePicture"
        component={AfterDaySinglePicture}
        options={{
          title: "하루 끝 사진 하나보기"
        }}
      />
      <Stack.Screen 
        name="AfterTravelSelect"
        component={AfterTravelSelect}
        options={{
          title: "여행 끝 사진 저장"
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
        name="Pictures"
        component={Pictures}
        options={{
          title: '사진 업로드'
        }}
      />
      <Stack.Screen
        name="AfterTravelShare"
        component={AfterTravelShare}
        options={{
          title: "여행 끝 공유하기"
        }}
      />
    </Stack.Navigator>
  )
}

export default StackComponent 