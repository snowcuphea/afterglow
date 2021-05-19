import React from 'react';

import {
  Platform,
  PermissionsAndroid,
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import ActionCreator from '../../store/actions';

import Ionicons from 'react-native-vector-icons/Ionicons';

import CameraRoll from "@react-native-community/cameraroll";

import { getRoutePicture } from '../../api/picture'

class RoutePicturesHorz extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      data: []
    }
  }



  async componentDidMount() {
    
    function changeTime(time) {
      const tempTime = time.split(' ')
      const toDate = tempTime[0].split('-')
      const toTime = tempTime[1].split(':')
      return new Date(toDate[0],toDate[1]-1,toDate[2],toTime[0].slice(1),toTime[1],toTime[2]).getTime()
    }

    if ( this.props.travelStatus === "onTravel" || this.props.travelStatus === "dayEndd" || this.props.travelStatus === "travelEndd" ) {
      
      const nowTime = new Date()
  
      const endTime = nowTime.getFullYear()+"-"
                    + (Number(nowTime.getMonth())+1)+"-"
                    + nowTime.getDate()+" "
                    + "T"+nowTime.getHours()+":"
                    + nowTime.getMinutes()+":"
                    + nowTime.getSeconds()
      
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission Explanation',
            message: 'ReactNativeForYou would like to access your photos!',
          },
        );
        if (result !== 'granted') {
          console.log('Access to pictures was denied');
          return;
        }
      }
  
  
      const nowIndex = this.props.todayRoutes.findIndex( (route) => route.rr_id === this.props.rr_id)
      const nextIndex = Number(nowIndex) +1
      
      const fromTime = changeTime(this.props.todayRoutes[nowIndex].rr_time)
      var toTime = changeTime(endTime)
      if ( nextIndex < this.props.todayRoutes.length) {
        toTime = changeTime(this.props.todayRoutes[nextIndex].rr_time)
      }
  
      await CameraRoll.getPhotos({
        first: 10000,
        assetType: 'Photos',
        include: [
          'location', 'imageSize', 'filename'
        ],
        fromTime: fromTime,
        toTime: toTime
      })
      .then(res => {
        for (let picture of res.edges) {
          const pictureForm = {
            id: picture.node.timestamp,
            rr_id: this.props.rr_id,
            timestamp : picture.node.timestamp * 1000, // s 단위로 오는거 ms 단위로 바꿔줘야한다
            location : picture.node.location,
            uri: picture.node.image.uri,
            type: picture.node.type,
            filename: picture.node.image.filename,
            imageSize: {
              height : picture.node.image.height,
              width : picture.node.image.width
            },
          }
          this.setState({ ...this.state, data : [ ...this.state.data, pictureForm ]})
        }
      })
      .catch(error => {
        console.log("하루에 대한 사진불러오기 에러", error)
      })

    } else {
      if (this.props.rr_id !== undefined) {
        getRoutePicture(
          this.props.rr_id,
          async (res) => {
            // console.log(res.data)
            for ( var data of res.data) {
              var newBlob = new Blob([data.ir_image], {type: "image/jpeg"})
              console.log(newBlob)
              // var newUri = "blob:http://k4a105.p.ssafy.io:8080" + newBlob._data.blobId
              // const pictureForm = {
              //   id: data.img_id,
              //   uri: newUri
              // }
              // await this.setState({ ...this.state, data: [ ...this.state.data, pictureForm ]})
              // console.log(this.state)
              // const fileReader = new FileReader();
              // fileReader.readAsDataURL(data.ir_image);
              // fileReader.onload = () => {
              //   const base64data = fileReader.result
              //   console.log(base64data)
              // }
            }
          },
          (err) => {
            console.log(err)
          }
        )
      }
    }

  }

  toFullPage() {
    this.props.navigation.navigate('ShowPictures', { pictures: this.state.data});
    this.props.modePicture('look');
    this.props.emptyList();
  }

  render(){

    const renderdata = ({ item ,index }) => (
      <View style={{ flexDirection: 'row'}}>
        <Image 
          style={{ width: (screenWidth)/8, height: (screenWidth)/8, marginVertical:14, marginHorizontal:4}} 
          source={{ uri: item.uri }} />
        { index === this.state.data.length - 1 ?
          <TouchableOpacity
            onPress={() => this.toFullPage()}
            style={{ width: (screenWidth)/8, height: (screenWidth)/8, marginVertical:14, marginHorizontal:4, justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="ellipsis-horizontal-outline" size={screenWidth/8}/>
          </TouchableOpacity> : null
        }
      </View>
    )

    let screenWidth = Dimensions.get('window').width;

    return(
      <View>
        <FlatList
          data={this.state.data}
          renderItem={renderdata}
          keyExtractor = {(data) => data.id}
          horizontal
          ref={ref => this.flatList = ref}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})


function mapStateToProps(state) {
  return {
    rr_id : state.accountRd.selectedPin.rr_id,
    todayRoutes : state.accountRd.todayTravel.routeRecs,
    travelStatus: state.accountRd.travelStatus,
    todayTravel: state.accountRd.todayTravel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    unselect: (picture_id) => {
      dispatch(ActionCreator.unselectPicture(picture_id));
    },
    modePicture: (mode) => {
      dispatch(ActionCreator.modePicture(mode))
    },
    emptyList: () => {
      dispatch(ActionCreator.emptyList())
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutePicturesHorz);