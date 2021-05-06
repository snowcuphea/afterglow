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


import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CurrentLocation = ({

}) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLogitude] = useState(null);

    const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(JSON)
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                setLatitude(latitude);
                setLogitude(longitude);
            },
            error => { console.log(error.code, error.message); },
            {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
        )
    }

    return (
        <View>
            <Text> latitude: {latitude} </Text>
            <Text> longitude: {longitude} </Text>
            <TouchableOpacity onPress={() => geoLocation()}>
                <Text> Get GeoLocation </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default CurrentLocation;