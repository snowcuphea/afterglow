import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import ActionCreator from '../../store/actions';

class AfterDaySinglePicture extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    
    const {picture} = this.props.route.params

    let screenWidth = Dimensions.get('window').width;

    return (
      <View style={styles.container}>
        <Image 
          style={{ width: screenWidth, height: screenWidth }} 
          source={{ uri: picture.uri }} />
        <View style={styles.selectContainer}>
          { this.props.selectedPictures.filter((select) => select.id !== picture.id).length !== this.props.selectedPictures.length ?  
            <Ionicons 
              name="checkmark-circle" 
              size={screenWidth/8}
              color={'pink'}
              onPress={() => this.props.unselect(picture.id)}/> :
            <Ionicons
              name="ellipse-outline"  
              size={screenWidth/8}
              color={'grey'}
              onPress={() => this.props.select(picture)}/>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  selectContainer: {
    margin: Dimensions.get('window').width/40,
    position: "absolute",
    top: 0,
    right: 0,
    width: Dimensions.get('window').width/8,
    height: Dimensions.get('window').width/8,
  },
})


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

export default connect(mapStateToProps, mapDispatchToProps)(AfterDaySinglePicture);