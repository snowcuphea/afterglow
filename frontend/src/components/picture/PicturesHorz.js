import React from 'react';

import {
  Platform,
  View,
  Image,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import ActionCreator from '../../store/actions';

import Ionicons from 'react-native-vector-icons/Ionicons';

class PicturesHorz extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  render(){

    const renderdata = ({ item }) => (
      <TouchableOpacity onPress={() => this.props.unselect(item.id) }>
          <View>
            <Image 
              style={{ width: (screenWidth)/8, height: (screenWidth)/8, margin:4}} 
              source={{ uri: item.uri }} />
            <View style={styles.selectContainer}>
              <Ionicons 
                name="close-circle" 
                size={screenWidth/20}
                color={'black'} />
            </View>
          </View>
      </TouchableOpacity>
    )

    let screenWidth = Dimensions.get('window').width;

    return(
      <View style={{marginVertical: 10}}>
        <FlatList
          data={this.props.selectedPictures}
          renderItem={renderdata}
          keyExtractor = {(data) => data.id}
          horizontal
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: Dimensions.get('window').width/20,
    height: Dimensions.get('window').width/20,
  },
})


function mapStateToProps(state) {
  return {
    selectedPictures: state.pictureRd.pictures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    unselect: (picture_id) => {
      dispatch(ActionCreator.unselectPicture(picture_id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesHorz);