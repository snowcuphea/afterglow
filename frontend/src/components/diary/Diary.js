import React from 'react'
import { View, Text, Dimensions, StyleSheet, FlatList } from 'react-native'

import { connect } from 'react-redux'

import ActionCreator from '../../store/actions'



class Diary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pages: [
        {
          num: 1,
          color: '#86E3CE',
        },
        {
          num: 2,
          color: '#D0E6A5',
        },
        {
          num: 3,
          color: '#FFDD94',
        },
        {
          num: 4,
          color: '#FA897B',
        },
        {
          num: 5,
          color: '#CCABD8',
        },
      ]
    }
  }

  render() {

    const onScroll = (e) => {
      const newPage = Math.round(
        e.nativeEvent.contentOffset.x / (pageWidth + gap),
      );
      this.setState({ ...this.state, page: newPage});
    };

    const renderdata = ({item}) => {
      return (
        <View 
          style={{ 
            backgroundColor: item.color, 
            width: pageWidth, 
            marginHorizontal: gap/2, 
            marginVertical: 40,
            borderRadius: 15,
          }}
        >
          <Text> {item.num} </Text>
        </View>
      )
    }

    const gap = 16
    const offset = 36
    const pageWidth = Dimensions.get('screen').width - (gap + offset) * 2

    return(
      <View style={styles.container}>
        <FlatList 
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{
              paddingHorizontal: offset + gap / 2,
          }}
          data={this.state.pages}
          decelerationRate="fast"
          horizontal
          keyExtractor={(item) => item.num }
          renderItem={renderdata}
          onScroll={onScroll}
          pagingEnabled
          snapToInterval={pageWidth + gap}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.indicatorContainer}>
          {Array.from(this.state.pages).map((page,i) => (
            <View style={[styles.indicator, i === this.state.page ? {backgroundColor: 'black'} : {backgroundColor: 'grey'}]} key={i}/>
          ))}
        </View>
      </View>
    )

  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    paddingBottom: 30,
  },
  indicator: {
    marginHorizontal: 4,
    width: 6,
    height: 6,
    borderRadius: 3
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Diary);