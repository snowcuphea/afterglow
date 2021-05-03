import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Divider, ListItem, Icon } from 'react-native-elements'


const list = [
  {
    title: '프로필 및 계정관리',
    icon: 'person-circle'
  },
  {
    title: '이용약관',
    icon: 'create'
  },
  {
    title: '라이선스',
    icon: 'eye'
  },
]


const list2 = [
  {
    title: '위치',
    icon: 'person-circle'
  },
  {
    title: '푸시',
    icon: 'hammer'
  },
  
]




export default class OnTravelAllPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  
  render() {

    return (
      <View style={styles.container}>
        <Divider/>
        {
          list.map((item, i) => (
          <ListItem key={i} bottomDivider >
            <Ionicons name={item.icon} size={25} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
            ))
        }
        <ListItem.Accordion
          content={
            <>
            <Ionicons name="hammer" size={25} style={{marginRight:15}} />
            <ListItem.Content>
              <ListItem.Title>서비스 기능 설정</ListItem.Title>
            </ListItem.Content>
            </>
          }
          isExpanded={this.state.expanded}
          onPress={() => {
          this.setState({ ...this.state, expanded: !this.state.expanded });
          // expanded = !expanded
          }}
          >
  {list2.map((l, i) => (
    <ListItem key={i} bottomDivider>
      <ListItem.Content>
        
        <ListItem.Subtitle>{l.title}</ListItem.Subtitle>
      </ListItem.Content>
      {/* <ListItem.Chevron /> */}
    </ListItem>
  ))}
</ListItem.Accordion>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})
