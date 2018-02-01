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
        backgroundColor:'#E7E7E7',
    },
});

export default class Profil extends Component {
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
            <View style={{backgroundColor:'#ffffff'}}>
                    <Image style={{height:200, width:width}} resizeMode={'cover'} source={require('../assets/img/thestadium/profil.jpeg')}/>
                <TouchableOpacity style={[STYLE.tab,{justifyContent:'center'}]}>
                    <Text style={STYLE.tabText}>Milieu axial, 25ans</Text>
                    <Icon style={{right:20, position:'absolute'}} name="create" size={20} color="#003366" />
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>But</Text>
                    <Text>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Passe Décisive</Text>
                    <Text>14</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Poids</Text>
                    <Text>70 kg</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Taille</Text>
                    <Text>1m80</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Pied fort</Text>
                    <Text>Gauche</Text>
                </TouchableOpacity>
            </View>
        )
    }
};
