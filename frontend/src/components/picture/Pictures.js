import React from 'react';
import {
  Platform,
  PermissionsAndroid,
  View,
  Image,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";

import { connect } from 'react-redux';
import ActionCreator from '../../store/actions';

import Ionicons from 'react-native-vector-icons/Ionicons';

class Pictures extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: [],
        selected: [],
    };
  }

  async componentDidMount(){
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

      CameraRoll.getPhotos({
        first: 50,
        assetType: 'Photos',
      })
      .then(res => {
        for (let picture of res.edges) {
          const pictureForm = {
            id: picture.node.timestamp + 0.1,
            timestamp : picture.node.timestamp,
            location : picture.node.location,
            uri: picture.node.image.uri
          }
          this.setState({ ...this.state, data: [ pictureForm, ...this.state.data ]})
        }
        
      })
      .catch((error) => {
         console.log("에러",error);
      });
    
    }


  render(){


    const renderdata = ({ item }) => {

      return (
        <TouchableOpacity onPress={() => {console.log("pressed image", screenWidth)}}>
            <View>
              <Image 
                style={{ width: (screenWidth-6)/3, height: (screenWidth-6)/3, margin:1}} 
                source={{ uri: item.uri }} />
              <View style={styles.selectContainer}>
                { this.props.selectedPictures.filter((select) => select.id !== item.id).length !== this.props.selectedPictures.length ?  
                  <Ionicons 
                    name="checkmark-circle" 
                    size={screenWidth/12}
                    color={'black'}
                    onPress={() => this.props.unselect(item.id)}/> :
                  <Ionicons
                    name="ellipse-outline"  
                    size={screenWidth/12}
                    color={'black'}
                    onPress={() => this.props.select(item)}/>
                }
              </View>
            </View>
        </TouchableOpacity>
      )
    }

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    return(
      <View>
        <FlatList
          ListHeaderComponent = {
            <View>
                <Text style={{ fontSize: screenHeight/30 }}>제주공항 (09:15~09:50)</Text>
            </View>
          }
          data={this.state.data}
          numColumns={3}
          renderItem={renderdata}
          keyExtractor = {(data) => data.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectContainer: {
    margin: Dimensions.get('window').width/50,
    position: "absolute",
    top: 0,
    right: 0,
    width: Dimensions.get('window').width/12,
    height: Dimensions.get('window').width/12,
  },
  selectCircle: {
    color: 'pink',
    backgroundColor: 'pink'
  },
});


function mapStateToProps(state) {
  return {
    selectedPictures: state.pictureRd.pictures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    select: (picture) => {
      dispatch(ActionCreator.selectPicture(picture));
    },
    unselect: (picture_id) => {
      dispatch(ActionCreator.unselectPicture(picture_id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures);