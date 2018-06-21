import React, {Component} from 'react';

import {Image, Text,Dimensions, StyleSheet, TouchableOpacity, View, ListView, FlatList} from 'react-native';

export default class PublishHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const TABS = this.props.tabs;

        const {width} = Dimensions.get('window');
        return (
                <FlatList
                    contentContainerStyle={[Style.tabContainer]}
                    style={ {
                        shadowOffset: {width: 210, height: 10},
                        shadowColor: 'black',
                        shadowOpacity: 1,
                        elevation: 5
                    }}
                    scrollEnabled={false}
                    data={TABS}
                    renderItem={(data) => (
                        <View style={[Style.tabButton,{width:width/TABS.length}]}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',flex:1,justifyContent:'center'}} onPress={() => {
                            this.props.onAction(data.item.action);
                        }}>
                            <Image style={[Style.tabButtonPicto,  {height: data.item.dim && data.item.dim.height ? data.item.dim.height : 15, width: data.item.dim && data.item.dim.width ? data.item.dim.width : 15}]} resizeMode='contain'
                                   source={data.item.picto}/>
                            <Text style={Style.tabButtonText}>{data.item.label}</Text>
                        </TouchableOpacity>
                            {data.index !== TABS.length - 1? <View style={Style.buttonBorder}/> :null}
                        </View>
                    )}

                />
        )
    }
}
/*

                        {data.index !== TABS.length - 1? <View style={Style.buttonBorder}/> :null}
 */
export const Style = StyleSheet.create({
    tabContainer: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems:'center',
        width: '100%',
        height: 40,
    },
    tabButton: {
        backgroundColor: 'white',
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonText: {
        color: '#003366',
        fontWeight: '400',
        fontSize:16,
    },
    tabButtonPicto: {
        height: 15,
        width: 15,
        marginRight: 5
    },
    buttonBorder: {
        alignSelf: 'center',
        height: '70%',
        width: 1,
        backgroundColor: '#cccccc'
    },
});
