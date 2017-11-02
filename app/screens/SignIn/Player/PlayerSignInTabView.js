import React, {Component} from 'react';

import {View,StyleSheet, Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        height: 48,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
});
export default class PlayerSignInTabView extends Component {

    render() {
        const { routes } = this.props.navigation.state;
        const index = this.props.navigation.state.index;
            return (
<View>
            <Text>{index + 1}/{routes.length}</Text>
                <View style={styles.tabContainer}>

                    {routes.map((route, Index) => (
                        <View style={{flexDirection: 'row'}}>
                            <View style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10/2,
                                backgroundColor: 'red'
                            }} />
                        <View style={[{
                            backgroundColor: index+1 === Index ? '#cccccc' : '#003366'
                        },{width: 30,
                            marginTop:4,
                            height:2,
                            }]}/>
                            <Text>{Index}</Text>
                        </View>
                    ))}
                </View>
</View>
            );
    }
}