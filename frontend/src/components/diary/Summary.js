import React from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'

import { connect } from 'react-redux'

import { Card } from 'react-native-elements'

import ActionCreator from '../../store/actions'

import MapView, { Marker, Callout, Polyline, Polygon, Circle } from "react-native-maps";

import MoneyBook from '../../components/book/MoneyBook'

import { getRecordPicture } from '../../api/picture'

class Summary extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    // console.log("현재는",this.props.record)
  }

  dateForm(date) {
    try {
      const tempDate = date.split('-')
      return tempDate[0] + '년 ' +tempDate[1] + '월 ' + tempDate[2] + '일 '
    } catch (error) {
      // console.log(error)
      return "이런"
    }
  }

  totalTime() {
    try {
      var totalTime = 0
      for ( var day of this.props.record.dayRecs){
        var tempTime = day.dr_time_spent.split(":")
        var hours = Number(tempTime[0])
        var mins = Number(tempTime[1])
  
        var tempTotal = hours * 60 + mins
        totalTime += tempTotal
      }
      const _day = Math.floor(totalTime/1440)
      const _hours = Math.floor(totalTime%1440/60)
      const _mins = Math.floor(totalTime%60)
  
      return _day > 0 ? ( _hours > 0 ? _days + '일 ' + _hours + '시간 ' + _mins + '분' : _days + '일 ' + _mins + '분' ) :
                        ( _hours > 0 ? _hours + '시간 ' + _mins + '분' : _mins + '분' )
    } catch (error) {
      // console.log(error)
      return 30
    }
  }

  getLocation() {
    // 여행의 시작 위치가 어떤 시/도 인지
  }

  totalPlaces() {
    var total = 0
    for ( var day of this.props.record.dayRecs ) {
      for ( var route of day.routeRecs ){
        if ( route.rr_name !== null ) { total += 1 }
      }
    }
    return total
  }

  getTotalPictures() {
    // console.log(JSON.stringify(this.props.record, null, 2))
    // 지금까지 몇개의 사진을 찍었는지도 db에 저장해야한다
    return this.props.record.total_img_count
  }

  getSelectedPictures() {
    var total = 0;

    // getRecordPicture(
    //   this.props.record.rec_id,
    //   (res) => {
    //     // console.log(JSON.stringify(res.data,null,2))
    //     total += res.data.length
    //   },
    //   (err) => {
    //     console.log(err)
    //   }
    // )
    return total
  }

  render() {

    const history = this.props.record
    const len = history.dayRecs.length
    const startDate = history.dayRecs[0].dr_date
    const endDate = history.dayRecs[len-1].dr_date
    const title = history.rec_name

    return(
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Card containerStyle={[{marginHorizontal:0}, styles.dateContainer]}>

          <Text style={styles.dateStyle}> {this.dateForm(startDate)} ~ {this.dateForm(endDate)}</Text>

        </Card>

        <Card containerStyle={{marginHorizontal:0, padding:0, borderRadius: 10}}>
          <View style={styles.mapContainer}>
            <MapView
              initialRegion={{
                latitude: this.props.record.dayRecs[0].routeRecs.length === 0 || this.props.record.dayRecs[0].routeRecs[0].rr_latitude === undefined ? 126.3128 :this.props.record.dayRecs[0].routeRecs[0].rr_latitude,
                longitude: this.props.record.dayRecs[0].routeRecs.length === 0 || this.props.record.dayRecs[0].routeRecs[0].rr_latitude === undefined ? 33.2364 : this.props.record.dayRecs[0].routeRecs[0].rr_longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }}
              style={{ flex:1, margin: 10 }}
            >
              {/* <Polyline
                coordinates={{"좌표값"}}
                strokeColor='red'
                strokeWidth={1}
              >


              </Polyline> */}

            </MapView>
          </View>
        </Card>

        <Card containerStyle={[{marginHorizontal:0}]} wrapperStyle={ styles.summaryContainer}>
            <Text style={styles.textStyle}><Text style={{backgroundColor:'paleturquoise'}}>"{title}"</Text> 여행을</Text>
            {/* <Text style={styles.textStyle}>{this.props.user_nickname}님과 함께</Text> */}
            <Text style={styles.textStyle}><Text style={{ color: 'mediumslateblue'}}>제주도</Text>에서 시작해</Text>
            <Text style={styles.textStyle}><Text style={{ color: 'cornflowerblue'}}>{this.totalTime()}</Text> 동안</Text>
            <Text style={styles.textStyle}><Text style={{ color: 'royalblue'}}>{this.totalPlaces()}</Text>개의 관광지를 들르고</Text>
            <Text style={styles.textStyle}><Text style={{ color: 'salmon' }}>{this.getTotalPictures()}</Text>장의 사진을 찍고</Text>
            <Text style={styles.textStyle}><Text style={{ color: 'cornflowerblue'}}>{this.getSelectedPictures()}</Text>장의 사진으로 <Text style={{backgroundColor:'cornsilk'}}>여운</Text>을 남겼어요.</Text>
        </Card>

        <Card containerStyle={[{marginHorizontal:0}, styles.bookContainer]}>
          <Text style={styles.textStyle}>얼마를 썼나요?</Text>  
            <MoneyBook/>      
        </Card>
      </ScrollView>
    )

  }
}

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  dateContainer: {
    height: screenHeight/8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapContainer: {
    height: screenHeight/3,
    borderWidth: 5, 
    borderColor:'beige', 
    borderStyle: 'solid',
    borderRadius: 10,
  },
  summaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bookContainer: {
    backgroundColor: 'pink',
    height: 700
  },
  dateStyle: {
    fontSize: 20,
  },
  textStyle:{
    margin: 10,
  }
})


function mapStateToProps(state) {

  // state.accountRd.travelingList.map((item) => console.log(JSON.stringify(item,null,2)))

  return {
    index: state.accountRd.historyIndex,
    user_nickname: state.accountRd.user.usr_nickname,
    record: state.accountRd.traveledList[state.accountRd.historyIndex],
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

export default connect(mapStateToProps, mapDispatchToProps)(Summary);