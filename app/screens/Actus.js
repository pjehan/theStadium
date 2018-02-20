import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native';
import {Icon} from 'react-native-elements';
import {GLOBAL_STYLE, timeLineStyle} from '../assets/css/global';
const STYLE = StyleSheet.create({
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between',
        height: 50,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    tabText: {
        color:'#003366',
        fontWeight:'700'
    },
    even: {
        backgroundColor:'#dddddd',
    },
});

export default class Actus extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        console.log('will')
    }

    componentDidMount() {
        console.log('did')
    }

    render() {
        let {width} = Dimensions.get('window');
        return (
            <View>
                    <Image style={{height:200, width:width}} resizeMode={'cover'} source={require('../assets/img/thestadium/profil.jpeg')}>
                        <TouchableOpacity style={{height:30,width:30,backgroundColor:'rgba(0,0,0,0.5)', position:'absolute', right:0, bottom:0}}>

                        </TouchableOpacity>
                    </Image>
                <View style={[{padding:15},GLOBAL_STYLE.whiteColorBG]}>
                    <Text style={{fontWeight:'bold', marginBottom:5, fontSize:16}}>
                        Hugo Rousseau
                    </Text>
                    <Text style={{fontSize:14, marginBottom:10}}>OCC Cesson - Sénior DH</Text>
                    <View style={{width:width/1.25}}>
                        <View style={timeLineStyle.tabContainer}>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'assists')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/assist.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Passe dé.</Text>
                            </TouchableOpacity>
                            <View style={timeLineStyle.buttonBorder} />
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'goals')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/goal.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>But</Text>
                            </TouchableOpacity>
                            <View style={timeLineStyle.buttonBorder}/>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'simple')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/post.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Publier</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
};
