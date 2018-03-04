import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native';
import {ImagePicker} from 'expo';
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
        color: '#003366',
        fontWeight: '700'
    },
    even: {
        backgroundColor: '#dddddd',
    },
});
let ImageCover = null;
let {width} = Dimensions.get('window');
export default class Actus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePic: '../assets/img/thestadium/profil.jpeg',
        }
    }

    _addMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({profilePic: result.uri})
            this.forceUpdate();
        } else {

        }
    };

    _renderHeader() {

        let type = 0;
        if (type === 1) {
            return (
                <View>
                    <Image style={{height: 250, width: width}} resizeMode={'cover'}
                           source={{uri: this.state.profilePic}}>
                        <TouchableOpacity onPress={() => this._addMedia()} style={{
                            height: 30,
                            width: 30,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            justifyContent:'center',
                            alignItems:'center',
                        }}>
                            <Icon size={20} type={'entypo'} name={'camera'} color={'#ffffff'}/>
                        </TouchableOpacity>
                    </Image>
                </View>);
        } else {
            return (
                <View>
                    <Image style={{height: 250, width: width}} resizeMode={'cover'}
                           source={{uri: this.state.profilePic}}>
                        <View style={{
                            height: 250,
                            width: width / 2.5,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <Image style={{height: 100, width: 100}} resizeMode={'cover'}
                                   source={{uri: this.state.profilePic}}/>
                            <Text style={{color:'#ffffff', fontWeight:'700',marginVertical:5}}>Fc Guichen</Text>
                            <View style={{paddingHorizontal:10 ,backgroundColor: '#ffffff', paddingVertical:5}}>
                                <Text style={{color: '#000000'}}>Sénior F3</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this._addMedia()} style={{
                            height: 30,
                            width: 30,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            right: 0,
                            bottom: 0
                        }}>
                            <Icon size={20} type={'entypo'} name={'camera'} color={'#ffffff'}/>
                        </TouchableOpacity>
                    </Image>
                </View>
            )
        }
    }
    _renderActions() {
        let type = 0;
        let isUser =null;
        if(isUser) {
            if (type === 1) {
                return (
                    <View style={{width: width / 1.25}}>
                        <View style={timeLineStyle.tabContainer}>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'assists')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/assist.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Passe dé.</Text>
                            </TouchableOpacity>
                            <View style={timeLineStyle.buttonBorder}/>
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
                )
            } else {
                return (
                    <View style={{width: width / 1.25}}>
                        <View style={timeLineStyle.tabContainer}>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'interview')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/assist.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Interview</Text>
                            </TouchableOpacity>
                            <View style={timeLineStyle.buttonBorder}/>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'article')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/goal.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Article</Text>
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
                )
            }
        }else {
            let isLiked = true;
            return (
                <View style={{width: width / 2}}>
                    <TouchableOpacity style={{alignItems:'center',backgroundColor:'#003366', paddingVertical:10,paddingHorizontal:10,justifyContent:'center'}} onPress={() => {}}>
                        <Text style={{fontSize:18, fontWeight:'500',color:'#ffffff'}}>{isLiked ? 'Je suis abonné' : 'S\'abonner'}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        return (
            <View>
                {this._renderHeader()}
                <View style={[{padding: 15}, GLOBAL_STYLE.whiteColorBG]}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>
                        Hugo Rousseau
                    </Text>
                    <Text style={{fontSize: 14, marginBottom: 10}}>OCC Cesson - Sénior DH</Text>
                    {this._renderActions()}
                </View>
            </View>
        )
    }
};
