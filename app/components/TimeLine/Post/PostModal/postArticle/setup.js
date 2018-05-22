import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    AsyncStorage, ScrollView, KeyboardAvoidingView
} from 'react-native';
import {NavigationActions}from "react-navigation";
import Autocomplete from "react-native-autocomplete-input";
import CustomInput from "../../../../CustomInput";
import {GLOBAL_STYLE} from '../../../../../assets/css/global';
import { Header } from 'react-navigation';

import {connect} from "react-redux";
class Setup extends Component {
    constructor(props){
        super(props);

        this.state = {
            homeScore:0,
            guessScore:0,
            guessClub:null,
            clubQuery: '',
            clubList: '',
            guessVisible:false
        };
        this._guessClub = this._guessClub.bind(this)
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
    componentDidMount() {
        AsyncStorage.getItem('clubList').then(
            value => {
                this.setState({clubList: JSON.parse(value)});
                this.forceUpdate();
            });
        this.props.navigation.dispatch(NavigationActions.setParams({
            params:{
                homeScore:0,
                guessScore:0,
            },
            key: "conclusion"
        }))
    }
    _setClub(item) {
        this.setState({
            clubQuery: item.name,
            guessClub: item,
            hideClub: true,
        }, () => {
            this.props.navigation.dispatch(NavigationActions.setParams({
                params:{
                    guessClub: {
                        name: this.state.guessClub.name,
                        id: this.state.guessClub.id
                    }
                },
                key: "conclusion"
            }))});

    }
    _filterClub(query, dataSource) {
        if (query === '') {
            return [];
        }
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if(data) {
            return data.filter(data => data.name.search(regex) >= 0);
        }
    }
    _guessClub(){
        if(this.state.guessClub){
            return (
                <TouchableOpacity onPress={() => {this.setState({guessVisible:true})}} style={{width:'25%',alignItems:'center'}}>
                    {this.state.guessClub.profilePicture ?<Image style={[timeLineStyle.profilePic,{backgroundColor:'#cccccc'}]}
                                                                 source={{uri:this.state.guessClub.profilePicture}}/> : <View stlye={[timeLineStyle.profilePic,{backgroundColor:'#cccccc'}]}/> }
                    <Text style={timeLineStyle.title}>{this.state.guessClub.name}</Text>
                </TouchableOpacity>
            )
        }else {
            return (
                <TouchableOpacity onPress={() => {this.setState({guessVisible:true})}} style={{width:'25%',alignItems:'center'}}>
                    <View style={[timeLineStyle.profilePic,{backgroundColor:'#cccccc'}]}/>
                    <Text style={[timeLineStyle.title, {fontSize:14,textAlign:'center'}]}>Sélectionner un club</Text>
                </TouchableOpacity>
            )
        }
    }
    render() {
        const {clubQuery, clubList} = this.state;
        const clubData = this._filterClub(clubQuery, clubList);
        console.log(this.props)
        return (
            <View>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={this.state.guessVisible}
                    onRequestClose={() => {
                        console.log('close modal')
                    }}>
                    <View style={STYLE.modalBackground}>
                        <View style={[STYLE.activityIndicatorWrapper,{width:'60%',alignItems:'center',justifyContent:'flex-end'}]}>
                            <Autocomplete

                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                autoCorrect={false}
                                containerStyle={[styles.autocompleteContainer,{width:'90%',marginLeft:'10%'}]}
                                data={clubData}
                                defaultValue={clubQuery}
                                placeholder={'Nom de votre Club'}
                                onChangeText={text => this.setState({clubQuery: text,hideClub:false})}
                                hideResults={this.state.hideClub}
                                renderItem={item => (

                                    <TouchableOpacity onPress={() => this._setClub(item)}>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />

                            <View style={{flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
                                <TouchableOpacity style={{width:'50%',alignItems:'center',borderRightWidth:0.5}} onPress={() => {this.setState({guessVisible:false})}}>
                                    <Text>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:'50%',alignItems:'center',borderLeftWidth:0.5}} onPress={() => {this.setState({guessVisible:false})}}>
                                    <Text>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </Modal>
                <View style={{backgroundColor:'#e9e9e9',paddingHorizontal:15, paddingVertical:10}}>
                    <Text style={{color:'#000000', fontWeight:'600'}}>Score du match</Text>
                </View>
                <View style={{justifyContent:'space-between', paddingVertical:40,paddingHorizontal:10,flexDirection:'row'}}>
                    <View style={{alignItems:'center',width:'25%'}}>
                        {this.props.currentUser.teams[0].team.club.profilePicture ? <Image style={timeLineStyle.profilePic}
                                                                                           source={{uri:this.props.currentUser.teams[0].team.club.profilePicture}}/> :
                            <View style={[{backgroundColor:'#cccccc'},timeLineStyle.profilePic]} />}
                        <Text
                            style={timeLineStyle.title}>Fc Guichen</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',width:'30%', justifyContent:'space-between'}}>
                        <CustomInput
                            container={''}
                            textColor={'#333333'}
                            borderColor={'transparent'}
                            backgroundColor={'#eeeeee'}
                            placeholder={'0'}
                            keyboardType={'numeric'}
                            input={GLOBAL_STYLE.numericInput}
                            state={'homeScore'}
                            onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                        />
                        <Text> - </Text>
                        <CustomInput
                            container={''}
                            textColor={'#333333'}
                            borderColor={'transparent'}
                            backgroundColor={'#eeeeee'}
                            placeholder={'0'}
                            keyboardType={'numeric'}
                            input={GLOBAL_STYLE.numericInput}
                            state={'guessScore'}
                            onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                        />
                    </View>
                    {this._guessClub(clubData,clubQuery)}
                </View>
                <View style={{backgroundColor:'#e9e9e9',paddingHorizontal:15, paddingVertical:10}}>
                    <Text style={{color:'#000000', fontWeight:'600'}}>Titre de l'article</Text>
                </View>
                <View style={{paddingVertical:10,paddingHorizontal:15}}>
                    <CustomInput multiple={true}
                                 container={{justifyContent: 'flex-start'}}
                                 placeholder={'Écrivez le titre de l\'article'}
                                 input={[{padding: 5, marginTop: 10,borderWidth:1,height: Math.max(50, this.state.height)}]}
                                 state={'title'}
                                 textColor={'#000000'}
                                 placeholderTextColor={'#cccccc'}
                                 borderColor={'#cccccc'}
                                 backgroundColor={'#ffffff'}
                                 security={false}
                                 onChangeSizeParent={(size)=>{
                                     this.setState({height:size})
                                 }}
                                 onChangeParent={(state, newvalue) => {
                                     this.onChangeInfos(state, newvalue)
                                 }}/>
                </View>
            </View>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user
    };
};
export default connect(mapStateToProps)( Setup);
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