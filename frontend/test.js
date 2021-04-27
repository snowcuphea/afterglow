import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class test extends Component {

    render () {

        return (
            console.log('하이')

        )
    }
}

// export default class test extends Component {

//     renderItem = ({item, index}) => {
//         return <View>
            
//             <Image source={item.src} />
//         </View>
//     }


//     render () {
//         const test_data = [
//             {
//                 src: require('./img/1.png')
//             },
//             {
//                 src: require('./img/2.png')
//             },
//             {
//                 src: require('./img/3.png')
//             },
//             {
//                 src: require('./img/4.png')
//             },
//             {
//                 src: require('./img/5.png')
//             },
//         ]
//         return (
//             <SafeAreaView style={styles.container}>
//                 <FlatList
//                     numColumns={3}
//                     style={styles.container} 
//                     data={test_data}
//                     renderItem={this.renderItem}
//                     keyExtractor={item => `key-${item.src}`}
                
                
//                 />
//             </SafeAreaView>
//         )
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})