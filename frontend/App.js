import React, { useCallback, useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import appConfig from './app.json';

import {
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


import { NavigationContainer } from '@react-navigation/native'

import DrawerComponent from './src/Drawer'

import store from './src/store/index'

import { setCustomText } from 'react-native-global-props'

const persistor = persistStore(store)

const customTextProps = {
  style : {
    fontFamily: 'RIDIBatang'
  }
};

setCustomText(customTextProps);

// export default class App extends React.Component {

  

//   render() {
    


//     return (
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <NavigationContainer>
//             <DrawerComponent />
//           </NavigationContainer>
//         </PersistGate>
//       </Provider>
//     )
//   }
// }

export default function App () {
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);

  // 위치 추적하기
  const [observing, setObserving] = useState(false);

  // 포그라운드 실행과 관련된 버튼
  // const [foregroundService, setForegroundService] = useState(false);
  const foregroundService = useState(true)
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
    watchId.current = Geolocation.watchPosition(
      (position) => {
        setLocation(position);
        console.log(position);
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

  // const removeLocationUpdates = useCallback(() => {
  //   if (watchId.current !== null) {
  //     stopForegroundService();
  //     Geolocation.clearWatch(watchId.current);
  //     watchId.current = null;
  //     setObserving(false);
  //   }
  // }, [stopForegroundService]);

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

  if (foregroundService === false) {
    startForegroundService()
  }

  if (observing === false) {
    getLocationUpdates()
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <DrawerComponent />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}