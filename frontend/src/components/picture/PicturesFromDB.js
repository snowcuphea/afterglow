import React from 'react';

import {
  Platform,
  PermissionsAndroid,
  View,
  Image,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";

import { connect } from 'react-redux';
import ActionCreator from '../../store/actions';

import Ionicons from 'react-native-vector-icons/Ionicons';

class PicturesFromDB extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      result: 0,
    };
  }

  async componentDidMount(){
    
    const tempData = [
      { id : 0, timestamp: 1620159970, uri: require('../../assets/pics/1.png') },
      { id : 1, timestamp: 1620159970, uri: require('../../assets/pics/2.png') },
      { id : 2, timestamp: 1620246370, uri: require('../../assets/pics/3.png') },
      { id : 3, timestamp: 1620246370, uri: require('../../assets/pics/4.png') },
      { id : 4, timestamp: 1620332770, uri: require('../../assets/pics/5.png') },
      { id : 5, timestamp: 1620332770, uri: require('../../assets/pics/1.png') },
      { id : 6, timestamp: 1620419170, uri: require('../../assets/pics/2.png') },
      { id : 7, timestamp: 1620419170, uri: require('../../assets/pics/3.png') },
      { id : 8, timestamp: 1620505570, uri: require('../../assets/pics/4.png') },
      { id : 9, timestamp: 1620505570, uri: require('../../assets/pics/5.png') },
    ]
    
    const startTime = new Date( tempData[0].timestamp * 1000 ).toISOString()


    this.setState({
      ...this.state,
      result: startTime,
    })

    //   const pictureSet = {
    //     title: "구분",
    //     id: "구분",
    //     data: []
    //   }
    //   const tempData = {
    //     id : "123",
    //     list: []
    //   }
    //   for (let picture of res.edges) {
    //     const pictureForm = {
    //       id: picture.node.timestamp,
    //       timestamp : picture.node.timestamp,
    //       location : picture.node.location,
    //       uri: picture.node.image.uri,
    //       imageSize: {
    //         height : picture.node.image.height,
    //         width : picture.node.image.width
    //       },
    //     }
    //     tempData.list.unshift(pictureForm)
    //   }
    //   pictureSet.data.push(tempData)
    //   this.setState({ ...this.state, data: [ ...this.state.data, pictureSet ]})

  }

  toLargeScale = (item) => {
    this.props.navigation.navigate("SinglePicture", { picture : item })
  }

  isSelected = (item) => {
    if (this.props.selectedPictures.filter((select) => select.id !== item.id).length !== this.props.selectedPictures.length) {
      return true
    } else {
      return false
    }
  }

  render(){


    const renderdata = ({ item }) => {
      
      return (
        <View>
          <TouchableOpacity onPress={() => this.toLargeScale(item)}>
            <Image 
              style={[{ width: (screenWidth-6)/3, height: (screenWidth-6)/3, margin:1}, 
                this.isSelected(item) ? styles.selectedBorder : '']} 
              source={{ uri: item.uri }} />
          </TouchableOpacity>
          { this.props.mode === "look" ? null :
            <View style={styles.selectContainer}>
              { this.isSelected(item) ?  
                <TouchableOpacity style={styles.selectArea} onPress={() => this.props.unselect(item.id)}>
                  <Ionicons 
                    name="checkmark-circle" 
                    size={screenWidth/12}
                    style={styles.selectIcon1}
                    color={'pink'}/>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.selectArea} onPress={() => this.props.select(item)}>
                  <Ionicons
                    name="ellipse"  
                    size={screenWidth/12}
                    style={styles.selectIcon2}
                    color={'black'}/>
                  <Ionicons
                    name="ellipse-outline"  
                    size={screenWidth/12}
                    style={styles.selectIcon3}
                    color={'black'}/>
                </TouchableOpacity>
              }
            </View>
          } 
        </View>
      )
    }

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
  
    return(
      <View style={this.props.selectedPictures.length > 0 ? {height: screenHeight*0.825} : {}}>
        {/* <SectionList
          sections={this.state.data}
          keyExtractor = {(data) => data.id}
          renderItem={({ item }) => (
            <FlatList
              data={item.list}
              numColumns={3}
              renderItem={renderdata}
            />
          )}
          renderSectionHeader={({ section : { title }}) => (
            <Text> { title } </Text>
          )}
        /> */}
        <Text style={{ margin: 20, fontSize: 50}}>{this.state.result}</Text> 
        <Text> pictures from db </Text>
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
    width: Dimensions.get('window').width/6,
    height: Dimensions.get('window').width/6,
  },
  selectArea: {
    height: Dimensions.get('window').width/6,
    width: Dimensions.get('window').width/6,
  },
  selectIcon1: {
    position: 'absolute', 
    right: 0,
  },
  selectIcon2: {
    position: 'absolute', 
    right: 0,
    opacity: 0.4,
  },
  selectIcon3: {
    position: 'absolute', 
    right: 0,
    opacity: 0.8,
  },
  selectedBorder: {
    borderWidth: 6,
    borderColor: 'black'
  }
});


function mapStateToProps(state) {

  return {
    selectedPictures: state.pictureRd.pictures,
    startTime: state.accountRd.todayTravel.startTime,
    mode: state.pictureRd.mode
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

export default connect(mapStateToProps, mapDispatchToProps)(PicturesFromDB);