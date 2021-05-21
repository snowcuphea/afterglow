import React from 'react';
import {
  View, Text, Image, StyleSheet, Dimensions
} from 'react-native';

import RoutePictures from '../../components/picture/RoutePictures'
import PicturesHorz from '../../components/picture/PicturesHorz'

import { connect } from 'react-redux';
import ActionCreator from '../../store/actions';


class SlideShow extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      index: 1,
      picture: this.props.route.params.pictures[0]
    }
  }

  componentDidMount() {

    const { pictures } = this.props.route.params

    var slide = setInterval(() => {
      console.log(this.state.index)
      this.setState({
        picture: pictures[this.state.index],
        index: this.state.index + 1
      })
      if ( this.state.index === pictures.length ) {
        setTimeout(() => {
          clearInterval(slide)
          this.props.navigation.goBack()
        },500)
      }
    },3000)


  }

  render() {

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    return (
      <View style={styles.container}>
        { this.state.index < this.props.route.params.pictures.length ?
          <Image 
            style={{ width: screenWidth , 
                    height: this.state.picture.imageSize.height*(screenWidth/this.state.picture.imageSize.width) }} 
            source={{ uri: this.state.picture.uri }} />
          : null
        }
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
})

function mapStateToProps(state) {

  return {
    mode: state.pictureRd.mode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modePicture: (mode) => {
      dispatch(ActionCreator.modePicture(mode))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow) 