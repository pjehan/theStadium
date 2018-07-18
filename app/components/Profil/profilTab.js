import React, {Component} from 'react';
import {Image,Platform, View,StyleSheet, Text,TouchableOpacity} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'
import Expo from 'expo';

const styles = StyleSheet.create({
    tabContainer: {
        borderWidth:0,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    tab: {
        backgroundColor:'#003366',
    },

});
/*
<SearchBar
                        lightTheme
                        round

                        containerStyle={{width:'90%', backgroundColor:'rgba(0,0,0,0)',borderBottomWidth:0,borderTopWidth:0}}
                        placeholder='Rechercher' />
 */
export default class ProfileTabBar extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const {routes} = this.props.navigation.state;
        const index = this.props.navigation.state.index;
        return (
            <View style={[styles.tab,  {paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}]}>
                <View style={{borderWidth:0, flexDirection:'row'}}>
                    <Icon
                          color='white'
                          size={40}
                          name={'chevron-left'}
                          onPress={() => this.props.navigation.goBack(null)}/>

                </View>

                <View style={styles.tabContainer}>

                    {routes.map((route, Index, key) => (
                            <TouchableOpacity style={ index === Index ? {borderBottomWidth:2, borderBottomColor:'red',paddingBottom:8} :{paddingBottom:10} }>
                                <Text style={{color:'#ffffff', fontSize:14, fontWeight:'bold', marginLeft:10, marginRight:10}}>{route.routeName}</Text>
                            </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }
}
