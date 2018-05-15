import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal, Dimensions,
    Image, ScrollView,
} from 'react-native';

import {GLOBAL_STYLE} from '../../../../../assets/css/global';
import CustomInput from "../../../../CustomInput";
import {ImagePicker} from 'expo';

import {NavigationActions}from "react-navigation";
let originalWidth = null;
let originalHeight = null;
let windowWidth = null;
let widthChange = null;
export default class SecondHalf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secondHalf_coverPhoto: null,
        };
        this._addMedia = this._addMedia.bind(this);
        this.coverPhoto = this.coverPhoto.bind(this);
    }

    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue}, () => {
            this.props.navigation.dispatch(NavigationActions.setParams({
                params:{
                    [state]: newvalue
                },
                key: "conclusion"
            }))
        });
    }

    _addMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16,9]
        });

        if (!result.cancelled) {
            originalHeight = result.height;
            originalWidth = result.width;
            this.setState({secondHalf_coverPhoto: result.uri}, () => {
                this.props.navigation.dispatch(NavigationActions.setParams({
                    params:{
                        secondHalf_coverPhoto: {
                            uri:result.uri,
                            width: result.width,
                            height: result.height
                        }
                    },
                    key: "conclusion"
                }))
            });

        } else {
            console.log('uri', result.uri, this.state.post.medias[0])
        }
    };

    coverPhoto() {
        if (this.state.secondHalf_coverPhoto) {

            windowWidth = Dimensions.get('window').width;
            widthChange = (windowWidth - 2) / originalWidth;
            return (
                <TouchableOpacity onPress={() => {
                    this._addMedia()
                }} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={{borderWidth: 3,
                        borderColor:'#000000',width: originalWidth * widthChange, height: originalHeight * widthChange}}
                           source={{uri: this.state.secondHalf_coverPhoto}}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this._addMedia()} style={{
                    paddingVertical: 40,
                    paddingHorizontal: 10,
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor:'#cccccc',
                    borderStyle: 'dashed'
                }}>
                    <Image style={timeLineStyle.profilePic}
                           source={require('../../../../../assets/img/picto/add.png')}/>
                    <Text>Ajouter une photo</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#ffffff'}}>

                <View style={{backgroundColor: '#e9e9e9', paddingHorizontal: 15, paddingVertical: 10}}>
                    <Text style={{color: '#000000', fontWeight: '600'}}>Photo de couverture</Text>
                </View>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 2}}>
                    {this.coverPhoto()}
                </View>
                <View style={{backgroundColor: '#e9e9e9', paddingHorizontal: 15, paddingVertical: 10}}>
                    <Text style={{color: '#000000', fontWeight: '600'}}>Description de la deuxième mi-temps</Text>
                </View>

                <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
                    <CustomInput multiple={true}
                                 container={{flex:1,justifyContent: 'flex-start'}}
                                 placeholder={'Décrivez les temps forts et temps faibles de la deuxième mi-temps'}
                                 input={[{flex: 1,borderWidth:1, padding: 5, marginTop: 10,height: Math.max(50, this.state.height)}]}
                                 state={'secondHalf_content'}
                                 placeholderTextColor={'#cccccc'}
                                 textColor={'#000000'}
                                 borderColor={'#cccccc'}
                                 backgroundColor={'#ffffff'}
                                 security={false} onChangeSizeParent={(size)=>{
                                    this.setState({height:size})
                                 }}
                                 onChangeParent={(state, newvalue) => {
                                     this.onChangeInfos(state, newvalue)
                                 }}/>
                </View>
            </ScrollView>
        )
    };
}

const timeLineStyle = StyleSheet.create({
    tabContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        width: '100%',
        height: 40
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
    singlePost: {
        marginBottom: 200
    }, profilePic: {
        width: 45,
        height: 45,
        borderRadius: 45,
        marginRight: 5
    },
    text: {
        color: 'black',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
});
const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: '#eeeeee'
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});
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
        backgroundColor: '#E7E7E7',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 200,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});