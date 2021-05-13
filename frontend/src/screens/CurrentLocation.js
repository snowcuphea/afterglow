// import React, {Component} from 'react';
// import {View, Text, Button, StyleSheet, PermissionsAndroid} from 'react-native';
 
// import Geolocation from 'react-native-geolocation-service';
 
// export default class CurrentLocation extends Component{
 
//     constructor(){
//         super();
//         this.state={
//             currPos:{latitude: 0.0, longitude:0.0}, //최초 좌표객체[위도,경도]
//         }
//     }
//     render(){
//         return(
//             <View style={{flex:1, padding:16,}}>
//                 {/* 1) 현재 내 위치 한번 얻어오기 */}
//                 <Button title="get my location" onPress={this.clickBtn}></Button>
 
//                 {/* 2) 내 위치 실시간 업데이트 */}
//                 <View style={{flexDirection:'row', marginTop:16, justifyContent:'space-between'}}>
//                     <Button title="watch my location" color="green" onPress={this.clickBtn2}></Button>
//                     <Button title="stop my location" color="red" onPress={this.clickBtn3}></Button>
//                 </View>
 
//                 <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
//                     <Text style={{fontWeight:'bold',fontSize:20,padding:8}}>latitude : {this.state.currPos.latitude}</Text>
//                     <Text style={{fontWeight:'bold',fontSize:20,padding:8}}>longitude : {this.state.currPos.longitude}</Text>
//                 </View>
//             </View>
//         );
//     }
 
//     clickBtn=()=>{
//         // Geolocation객체에게 현재위치 얻어오기[web의 코드와 거의 비슷]
//         Geolocation.getCurrentPosition( (position)=>{
//           console.log(position)
//           console.log('여기 가능?')
//             // 성공했을때 실행되는 영역
//             // 파라미터로 받은 info객체 안에 좌표객체 정보 있음.
//             this.setState({currPos: position.coords});
//         }, 
//         (error)=>{
//             // 퍼미션이 없으면 에러!!! AndroidManifest.xml에서 추가
//             // API 26버전부터 동적 퍼미션이 추가됨.
//             // Geolocation은 동적퍼미션을 자동으로 해주지 않음
//             alert('error : '+error.message);
//         });
//     }//clickBtn method...
//     clickBtn2=()=>{
//         // 기존에 warch하는 것이 있다면 지우도록!!
//         Geolocation.clearWatch(this.state.id,); //만약 id가 없다면 무시됨
//         const id=Geolocation.watchPosition((position)=>{
//             this.setState({currPos: position.coords});
//         },
//         (error)=>{
//             alert('error : '+error.message);
//         });
 
//         // watchID를 state에 저장하기
//         //this.setState({id:id}); //새로이 id 프로퍼티 추가... 아래 코드로 간략화 가능
//         this.setState({id}); //변수명과 키값이 같다면 변수명만 기입하면 키값은 자동 변수명으로 적용
 
//     }//clickBtn2 method...
 
//     clickBtn3=()=>{
//         Geolocation.clearWatch(this.state.id,);
//         this.setState({currPos:{latitude:0.0, longitude:0.0}});
//     }//clickBtn3 method...
 
 
 
//     // 동적 퍼미션/////////
//     async requestLocationPermission(){
            
//       try{
//         // 퍼미션 요청 다이얼로그 보이기
//         const granted=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

//         if(granted== PermissionsAndroid.RESULTS.GRANTED){
//           alert('위치정보 사용을 허가하셨습니다.');
//         }else{
//           alert('위치정보 사용을 거부하셨습니다.\n앱의 기능사용이 제한됩니다.');
//         }

//       }catch(err){alert('퍼미션 작업 에러');}
 
//     }
//     //화면이 시작될때 퍼미션 받도록 라이프사이클 메소드 이용
//     async componentDidMount(){
//        await this.requestLocationPermission()
//     }
// }


// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// const CurrentLocation = ({

// }) => {
//     const [latitude, setLatitude] = useState(null);
//     const [longitude, setLogitude] = useState(null);

//     const geoLocation = () => {
//         Geolocation.getCurrentPosition(
//             position => {
//                 console.log(JSON)
//                 const latitude = JSON.stringify(position.coords.latitude);
//                 const longitude = JSON.stringify(position.coords.longitude);

//                 setLatitude(latitude);
//                 setLogitude(longitude);
//             },
//             error => { console.log(error.code, error.message); },
//             {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
//         )
//     }

//     return (
//         <View>
//             <Text> latitude: {latitude} </Text>
//             <Text> longitude: {longitude} </Text>
//             <TouchableOpacity onPress={() => geoLocation()}>
//                 <Text> Get GeoLocation </Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// })

// export default CurrentLocation;

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';

// import MapView from './MapView';
import appConfig from '../../app.json';

export default function CurrentLocation() {
  // 관련 버튼
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);

  // 위치 추적하기
  const [observing, setObserving] = useState(false);

  // 포그라운드 실행과 관련된 버튼
  const [foregroundService, setForegroundService] = useState(false);
  const [location, setLocation] = useState(null);

  const watchId = useRef(null);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

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
        interval: 5000,
        fastestInterval: 2000,
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

  return (
    <View style={styles.mainContainer}>
      {/* <MapView coords={location?.coords || null} /> */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <View style={styles.option}>
            <Text>Enable High Accuracy</Text>
            <Switch onValueChange={setHighAccuracy} value={highAccuracy} />
          </View>

          {/* {Platform.OS === 'ios' && (
            <View style={styles.option}>
              <Text>Use Significant Changes</Text>
              <Switch
                onValueChange={setSignificantChanges}
                value={significantChanges}
              />
            </View>
          )} */}

          {Platform.OS === 'android' && (
            <>
              <View style={styles.option}>
                <Text>Show Location Dialog</Text>
                <Switch
                  onValueChange={setLocationDialog}
                  value={locationDialog}
                />
              </View>
              <View style={styles.option}>
                <Text>Force Location Request</Text>
                <Switch
                  onValueChange={setForceLocation}
                  value={forceLocation}
                />
              </View>
              <View style={styles.option}>
                <Text>Enable Foreground Service</Text>
                <Switch
                  onValueChange={setForegroundService}
                  value={foregroundService}
                />
              </View>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Get Location" onPress={getLocation} />
          <View style={styles.buttons}>
            <Button
              title="Start Observing"
              onPress={getLocationUpdates}
              disabled={observing}
            />
            <Button
              title="Stop Observing"
              onPress={removeLocationUpdates}
              disabled={!observing}
            />
          </View>
        </View>
        <View style={styles.result}>
          <Text>Latitude: {location?.coords?.latitude || ''}</Text>
          <Text>Longitude: {location?.coords?.longitude || ''}</Text>
          <Text>Heading: {location?.coords?.heading}</Text>
          <Text>Accuracy: {location?.coords?.accuracy}</Text>
          <Text>Altitude: {location?.coords?.altitude}</Text>
          <Text>Altitude Accuracy: {location?.coords?.altitudeAccuracy}</Text>
          <Text>Speed: {location?.coords?.speed}</Text>
          <Text>Provider: {location?.provider || ''}</Text>
          <Text>
            Timestamp:{' '}
            {location?.timestamp
              ? new Date(location.timestamp).toLocaleString()
              : ''}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    padding: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  result: {
    borderWidth: 1,
    borderColor: '#666',
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
});
