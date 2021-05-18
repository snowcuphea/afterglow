import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, FlatList } from 'react-native'

import { connect } from 'react-redux'

import ActionCreator from '../../store/actions'

import randomColor from 'randomcolor'

class Diary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pages: []
    }
  }

  async componentDidMount() {

    const records = {
      dayRecs: [
        {
          dr_id : 1,
          dr_date : "2021-05-14",
          dr_start_time : "2021-05-14 T08:30:30",
          dr_end_time : "2021-05-14 T15:00:00",
          routeRecs: [
            { "rr_id": 1, "rr_name": "첫날 처음 여행지", "rr_memo": "첫날 처음 여행지 메모다", "rr_time": "2021-05-14 T08:30:30", "imgRecs": [] },
            { "rr_id": 2, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-14 T10:16:25", "imgRecs": [] },
            { "rr_id": 3, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-14 T10:17:25", "imgRecs": [] },
            { "rr_id": 4, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-14 T10:18:25", "imgRecs": [] },
            { "rr_id": 5, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-14 T10:19:25", "imgRecs": [] },
            { "rr_id": 6, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-14 T10:20:25", "imgRecs": [] },
            { "rr_id": 7, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-14 T10:21:25", "imgRecs": [] },
            { "rr_id": 8, "rr_name": "첫날 중간 여행지", "rr_memo": "첫날 중간 여행지 메모다", "rr_time": "2021-05-14 T10:22:25", "imgRecs": [] },
            { "rr_id": 9, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-14 T10:33:25", "imgRecs": [] },
            { "rr_id": 10, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-14 T10:34:25", "imgRecs": [] },
            { "rr_id": 11, "rr_name": "첫날 마지막 여행지", "rr_memo": "첫날 마지막 여행지 메모다", "rr_time": "2021-05-14 T10:35:25", "imgRecs": [] },
          ]
        },
        {
          dr_id : 2,
          dr_date : "2021-05-15",
          dr_start_time : "2021-05-15 T08:30:30",
          dr_end_time : "2021-05-15 T15:00:00",
          routeRecs: [
            { "rr_id": 12, "rr_name": "둘쨋 날 처음 여행지", "rr_memo": "둘쨋 날 처음 여행지 메모다", "rr_time": "2021-05-15 T08:30:30", "imgRecs": [] },
            { "rr_id": 13, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:16:25", "imgRecs": [] },
            { "rr_id": 14, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:17:25", "imgRecs": [] },
            { "rr_id": 15, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:18:25", "imgRecs": [] },
            { "rr_id": 16, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:19:25", "imgRecs": [] },
            { "rr_id": 17, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:20:25", "imgRecs": [] },
            { "rr_id": 18, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:21:25", "imgRecs": [] },
            { "rr_id": 19, "rr_name": "둘쨋 날 중간 여행지", "rr_memo": "둘쨋 날 중간 여행지 메모다", "rr_time": "2021-05-15 T10:22:25", "imgRecs": [] },
            { "rr_id": 20, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:33:25", "imgRecs": [] },
            { "rr_id": 21, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:34:25", "imgRecs": [] },
            { "rr_id": 22, "rr_name": "둘쨋 날 마지막 여행지", "rr_memo": "둘쨋 날 마지막 여행지 메모다", "rr_time": "2021-05-15 T10:35:25", "imgRecs": [] },
          ]
        },
        {
          dr_id : 3,
          dr_date : "2021-05-16",
          dr_start_time : "2021-05-16 T08:30:30",
          dr_end_time : "2021-05-16 T15:00:00",
          routeRecs: [
            { "rr_id": 23, "rr_name": "마지막 날 처음 여행지", "rr_memo": "마지막 날 처음 여행지 메모다", "rr_time": "2021-05-16 T08:30:30", "imgRecs": [] },
            { "rr_id": 24, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-16 T10:16:25", "imgRecs": [] },
            { "rr_id": 25, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-16 T10:17:25", "imgRecs": [] },
            { "rr_id": 26, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-16 T10:18:25", "imgRecs": [] },
            { "rr_id": 27, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-16 T10:19:25", "imgRecs": [] },
            { "rr_id": 28, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-16 T10:20:25", "imgRecs": [] },
            { "rr_id": 29, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-16 T10:21:25", "imgRecs": [] },
            { "rr_id": 30, "rr_name": "마지막 날 중간 여행지", "rr_memo": "마지막 날 중간 여행지 메모다", "rr_time": "2021-05-16 T10:22:25", "imgRecs": [] },
            { "rr_id": 31, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-16 T10:33:25", "imgRecs": [] },
            { "rr_id": 32, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-16 T10:34:25", "imgRecs": [] },
            { "rr_id": 33, "rr_name": "마지막 날 마지막 여행지", "rr_memo": "마지막 날 마지막 여행지 메모다", "rr_time": "2021-05-16 T10:35:25", "imgRecs": [] },
          ]
        }
      ]
    }

    // for ( var day of records.dayRecs) {
    for ( var day of this.props.record.dayRecs) {
      for ( var route of day.routeRecs ) {
        if ( route.rr_name !== null) {          //여기 나중에 이미지 없으면 포함 안하는 route.imgRecs.length !== 0 추가
          const color = await randomColor({
            count: 1,
            luminosity: 'light',
            hue: 'blue'
          })
          // console.log(color)
          const pageForm = {
            "id": route.rr_id,
            "name": route.rr_name,
            "memo": route.rr_memo,
            "time": route.rr_time,
            "color": color[0],
          }
          await this.setState({
            ...this.state,
            pages: [ ...this.state.pages, pageForm ]
          })
        }

      }
    }
  }

  render() {

    const onScroll = (e) => {
      const newPage = Math.round(
        e.nativeEvent.contentOffset.x / (pageWidth + gap),
      );
      this.setState({ ...this.state, page: newPage});
    };

    const screenHeight = Dimensions.get('screen').height
    const screenWidth = Dimensions.get('screen').width
    

    const renderdata = ({item}) => {
      return (
        <View 
          style={{ 
            backgroundColor: item.color, 
            width: pageWidth, 
            marginHorizontal: gap/2, 
            marginVertical: 20,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text style={{height: screenHeight/17, backgroundColor: "pink", textAlignVertical:"center"}}> {item.name} </Text>
          <Text style={{height: screenHeight/17, backgroundColor: "skyblue", textAlignVertical:"center"}}> {item.time} </Text>
          <Image 
            style={{ width: pageWidth-40, height: screenHeight/2.2, backgroundColor: "pink", }} 
            source={{ uri: "../assets/pics/1.png" }}/>
          <Text style={{height: screenHeight/10, backgroundColor: "green", textAlignVertical:"center"}}> {item.memo} </Text>
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
          keyExtractor={(item) => item.id }
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
    record: state.accountRd.traveledList[state.accountRd.historyIndex]
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