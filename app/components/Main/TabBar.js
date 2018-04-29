import React, {Component} from 'react';
import {Image, View,StyleSheet, Text,TouchableOpacity} from 'react-native';
const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
    },
    tab: {
        alignItems: 'center',
        backgroundColor:'white',
    },
});
export default class MainTabView extends Component {
    render() {
        const {routes} = this.props.navigation.state;
        const index = this.props.navigation.state.index;
        console.log(this.props)
        return (
            <View style={styles.tab}>
                <View style={styles.tabContainer}>

                    {routes.map((route, Index, key) => (
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity>
                                <Text>{route.routeName}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}