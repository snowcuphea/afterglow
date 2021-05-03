import React from 'react'
import { View, TouchableOpacity, Text, Button, StyleSheet, Image,  } from 'react-native'

import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
 } from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, ListItem,  Icon } from 'react-native-elements'

import StackComponent from './Stack'
import SettingsMain from './screens/settingss/SettingsMain'

const Drawer = createDrawerNavigator();


// function goToSettingsMain() {
//   const mynav = useNavigation()
  
//   return (
//     mynav.navigate('SettingsMain')
//   )

// }

const CustomDrawerContent = (props) => {
//  console.log(props)

  return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
      <View style={styles.TopIconContainer} >
        <TouchableOpacity style={styles.closeBtn}>
        <Ionicons name={"close-outline"} size={30}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingBtn} onPress={() => props.navigation.navigate("SettingsMain")}>
          <Ionicons name={"settings-outline"} size={30} color={"#555555"}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.userContainer}>
        <View style={styles.userItem}>
          <Text>김민정</Text>
          <Text>snowcuphea@naver.com</Text>
        </View>
        <View>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('./assets/pics/3.png')}
          />
        </View>
      </View>


      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text>내 추억 : </Text>
          <Text>5</Text>
        </View>
      </View>
      <Card.Divider/>

      <View style={styles.bottomIconContainer}>
        <View style={styles.bottomIcon}>
          <Ionicons name={"notifications-outline"} size={40} color={"#555555"}></Ionicons>
          <Text>공지사항</Text>
        </View>

        <View style={styles.bottomIcon}>
          <Ionicons name={"people-outline"} size={40} color={"#555555"}></Ionicons>
          <Text>고객센터</Text>
        </View>

        <View style={styles.bottomIcon}>
          <Ionicons name={"help-circle-outline"} size={40} color={"#555555"}></Ionicons>
          <Text>튜토리얼</Text>
        </View>  
      </View>
      
      
      
    </DrawerContentScrollView>
  )
}


const DrawerComponent = () => {
  return (

    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="front"
      drawerPosition='right'
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={StackComponent}/>      
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  TopIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor : 'pink'
  },
  userContainer:{
    flex: 3,
    marginTop: 30,
    marginBottom: 30,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor : 'yellow'
  },
  infoContainer:{
    flex: 3,
    marginTop: 10,
    // marginBottom: 30,
    margin: 20,
    // backgroundColor:'beige',
  },
  bottomIconContainer: {
    flex: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor : 'beige'
  },
  closeBtn: {
    margin: 10,
  },
  settingBtn: {
    margin: 10,
  },
  userItem: {
    justifyContent:'center'
  },
  image: {
    height: 60,
    width: 60,
  },
  infoItem: {
    flexDirection: 'row'

  },
  bottomIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default DrawerComponent