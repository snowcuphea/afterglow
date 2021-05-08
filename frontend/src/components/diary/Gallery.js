import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import ActionCreator from '../../store/actions'

import PicturesFromDB from '.././picture/PicturesFromDB'


class Gallery extends React.Component {



  render() {

    return(
      <View style={styles.container}>
        <PicturesFromDB />
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})

function mapStateToProps(state) {

  return {
    selectedPictures: state.pictureRd.pictures,
    todayDate: state.accountRd.todayTravel.todayDate,
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

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);