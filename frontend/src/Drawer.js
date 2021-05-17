import React, { useCallback, useEffect, useRef, useState } from 'react';

import { View, TouchableOpacity, Text, Button, StyleSheet, Image, FlatList, PermissionsAndroid, Platform, ToastAndroid  } from 'react-native'

import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import appConfig from '../app.json';

import { 
  createDrawerNavigator,
  DrawerContentScrollView,

 } from '@react-navigation/drawer'

 import { DrawerActions } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, ListItem,  Icon, Avatar } from 'react-native-elements'

import StackComponent from './Stack'

import { connect, useSelector, useDispatch } from 'react-redux'
import ActionCreator from './store/actions'

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  
  const userDetail = useSelector(state => state.accountRd )
  // console.log(JSON.stringify(userDetail,null,2))

  const naviInfo = [
    {
      title: "공지사항",
      icon: "notifications-sharp",
      url: "SettingsNotice"
    },
    {
      title: "고객센터",
      icon: "people-sharp",
      url: "SettingsContact"
    },
    {
      title: "튜토리얼",
      icon: "help-circle",
      url: "SettingsTutorial"
    },
    {
      title: '설정',
      icon: 'settings-sharp',
      url: 'SettingsMain'
    }
  ]

  const myInfo = [
    {
      title: '총 여행',
      url: userDetail.traveledList.length
    },
    {
      title: '지금까지 찍은 사진',
      url: userDetail.traveledList.length
    },
    {
      title: '지금까지 여행한 시간',
      url: userDetail.traveledList.length
    }
  ]

  const renderItem = ({ item }) => {
    return (
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 20, flexDirection: 'row' }}>
            <Ionicons name={item.icon} style={{ paddingRight: 20 }} size={30} color={"#555555"}></Ionicons>
            <Text style={{ fontSize: 25 }} onPress={() => props.navigation.navigate(item.url)}>{item.title}</Text>
        </View>
    )
  }

  const renderItemInfo = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{ fontSize: 13, marginLeft: 20, marginRight:15, marginBottom: 15 }}>{item.title}</Text>
        <Text style={{ fontSize: 15, marginLeft: 35, marginRight:15, marginBottom: 15 }}>{item.url}</Text>
      </View>
    )
  }

  return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
      <View style={styles.TopIconContainer} >
        <TouchableOpacity style={styles.closeBtn} onPress={() => {props.navigation.dispatch(DrawerActions.closeDrawer())}}>
          <Ionicons name={"close-outline"} size={30}></Ionicons>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.settingBtn} onPress={() => props.navigation.navigate("SettingsMain")}>
          <Ionicons name={"settings-outline"} size={30} color={"#555555"}></Ionicons>
        </TouchableOpacity> */}
      </View>

      <View style={{
        flex: 3,
        marginTop: 30,
        marginBottom: 30,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        <View style={{ paddingLeft:15 }}>
          <Text style={{ paddingBottom: 10 }}>{userDetail.user.usr_nickname}</Text>
          <Text>{userDetail.user.usr_email}</Text>
        </View>
        <Avatar
          rounded
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
        <View>
          { userDetail.user.usr_profile_img === undefined ? null:
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri : userDetail.user.usr_profile_img }}
            />
          }
        </View>
      </View>
      <FlatList
        data={myInfo}
        renderItem={renderItemInfo}
        keyExtractor={(item) => item.title}
      ></FlatList>
      <Card.Divider />



      <View>
        <FlatList
          data={naviInfo}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}        
        >

        </FlatList>

      </View>
      {/* <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text>내 추억 : </Text>
          <Text>{userDetail.traveledList.length}</Text>
        </View>
      </View>
      <Card.Divider/>

      <View style={styles.bottomIconContainer}>
        <View style={styles.bottomIcon}>
          <Ionicons 
            name={"notifications-outline"} 
            size={40} 
            color={"#555555"}
            onPress={() => props.navigation.navigate('SettingsNotice')}
            ></Ionicons>
          <Text>공지사항</Text>
        </View>

        <View style={styles.bottomIcon}>
          <Ionicons 
            name={"people-outline"} 
            size={40} 
            color={"#555555"}
            onPress={() => props.navigation.navigate('SettingsContact')}
            ></Ionicons>
          <Text>고객센터</Text>
        </View>

        <View style={styles.bottomIcon}>
          <Ionicons 
            name={"help-circle-outline"} 
            size={40} 
            color={"#555555"}
            onPress={() => props.navigation.navigate('SettingsTutorial')}
            ></Ionicons>
          <Text>튜토리얼</Text>
        </View>  
      </View> */}
      
    </DrawerContentScrollView>
  )
}


const DrawerComponent = () => {
  const dr_id = useSelector(state => state.accountRd.todayTravel.dr_id)
  const travelStatus = useSelector(state => state.accountRd.travelStatus)
  const dispatch = useDispatch()

  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);

  // 위치 추적하기
  const [observing, setObserving] = useState(false);

  // 포그라운드 실행과 관련된 버튼
  const [foregroundService, setForegroundService] = useState(false);
  // const foregroundService = useState(true)
  const [location, setLocation] = useState(null);

  const watchId = useRef(null);

  // useEffect(() => {
  //   return () => {
  //     removeLocationUpdates();
  //   };
  // }, [removeLocationUpdates]);

  const hasLocationPermission = async () => {

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    // permission 요청하기
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    // 허락되었을 때
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    // 거절되었을 때
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  // 현재 위치
  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    // 현재 위치 받아오기
    Geolocation.getCurrentPosition(
      (position) => {

        setLocation(position);
        console.log(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },

      // 현재 위치에 대한 옵션들
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        showLocationDialog: locationDialog,
      },
    );
  };

  // 현재 위치 업데이트
  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    // 포그라운드 서비스 작동중이면
    // 포그라운드 서비스 함수 실행
    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }

    // 
    setObserving(true);

    // 현재 위치 보고 있다가
    watchId.current = await Geolocation.watchPosition(
      (position) => {
        setLocation(position);
        // console.log('이건가' , position);

        const sendData = {
          'dr_id':dr_id,
          'rr_latitude': position.coords.latitude,
          'rr_longitude': position.coords.longitude
        }
        // console.log('sendData 확인', sendData)
        // console.log("보냈다")
        if (dr_id !== undefined) {
          dispatch({
            type: 'SEND_LOCATION_INFO_ASYNC',
            payload: sendData
          })
        }

      },
      (error) => {
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 60000,
        fastestInterval: 50000,
        forceRequestLocation: forceLocation,
        showLocationDialog: locationDialog,
        useSignificantChanges: significantChanges,
      },
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

  // 포그라운드 실행
  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      // 포그라운드 실행하면 뜨는 창(상태바 내렸을 때 나오는 것)
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
      });
    }

    // 포그라운드 실행하면 뜨는 창(상태바 내렸을 때 나오는 것)
    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: appConfig.displayName,
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

  // 포그라운드 중단
  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err) => err);
  }, []);


  if ((travelStatus === 'onTravel' || travelStatus === 'dayEndd' || travelStatus === 'travelEndd')&&(foregroundService === false && observing === false)) {
    startForegroundService()
    getLocationUpdates()

    setForegroundService(true)
    setObserving(true)

    console.log('기록시작')
  }

  if ((travelStatus === 'dayEnd' || travelStatus === 'travelEnd')&&(foregroundService === true && observing === true)) {
    removeLocationUpdates()

    setForegroundService(false)
    console.log('기록 끝')
  }
  // if (foregroundService === false) {
  //   startForegroundService()
  // }

  // if (observing === false) {
  //   getLocationUpdates()
  // }

  return (

    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="front"
      drawerPosition='right'
      screenOptions={{
        gestureEnabled:false
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}

    >
      <Drawer.Screen name="Home" component={StackComponent}/>      
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  TopIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor : 'pink'
  },
  userContainer:{
    flex: 3,
    marginTop: 30,
    marginBottom: 30,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor : 'yellow'
  },
  infoContainer:{
    flex: 3,
    marginTop: 10,
    // marginBottom: 30,
    margin: 20,
    // backgroundColor:'beige',
  },
  bottomIconContainer: {
    flex: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor : 'beige'
  },
  closeBtn: {
    margin: 10,
  },
  settingBtn: {
    margin: 10,
  },
  userItem: {
    justifyContent:'center'
  },
  image: {
    height: 60,
    width: 60,
  },
  infoItem: {
    flexDirection: 'row'

  },
  bottomIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  }

});


function mapStateToProps(state) {

  return {
    nickname: state.accountRd.user.usr_nickname,
    profilePicture: state.accountRd.user.usr_profile_img,
    email: state.accountRd.user.usr_email,

    traveled: state.accountRd.traveledList
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent)