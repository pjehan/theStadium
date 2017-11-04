import React, {Component} from 'react';

import {View,StyleSheet, Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
    },
    tab: {
        alignItems: 'center',
    },
});
export default class PlayerSignInTabView extends Component {

    render() {
        const { routes } = this.props.navigation.state;
        const index = this.props.navigation.state.index;
            return (
<View style={styles.tab}>
            <Text>{index + 1}/{routes.length}</Text>
                <View style={styles.tabContainer}>

                    {routes.map((route, Index) => (
                        <View style={{flexDirection: 'row'}}>
                            <View style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10/2,
                                backgroundColor:  index +1 === Index ? '#cccccc' : '#003366'
                            }} />
                        <View style={[{
                            backgroundColor: index <= Index ? '#cccccc' : '#003366'
                        },{width: 30,
                            marginTop:4,
                            height:2,
                            display: Index === (routes.length - 1) ? 'none' : 'flex'
                            }]}/>

                        </View>
                    ))}
                </View>
</View>
            );
    }
}