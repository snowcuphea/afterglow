import React from 'react';
import {
  View, Text
} from 'react-native';

import Pictures from '../../components/picture/Pictures'
import PicturesHorz from '../../components/picture/PicturesHorz'

import { connect } from 'react-redux';
import ActionCreator from '../../store/actions';


class ShowPictures extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    
    return (
      <View>
        { this.props.mode !== "look" ? 
         <PicturesHorz /> : null
        }
        <Pictures navigation={this.props.navigation}/>
      </View>
    )


  }
}

function mapStateToProps(state) {

  return {
    mode: state.pictureRd.mode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modePicture: (mode) => {
      dispatch(ActionCreator.modePicture(mode))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPictures) 