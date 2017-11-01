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
            return (
                <View style={styles.tabContainer}>
                    {routes.map(route => (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(route.routeName)}
                            style={styles.tab}
                            key={route.routeName}
                        >
                            <Text>{route.routeName} rfeajfneoafeaub</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            );
    }
}