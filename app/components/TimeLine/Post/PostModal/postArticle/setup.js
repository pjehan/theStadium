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
import SearchDropDown from "../../../../SearchDropdown/index";
import Spinner from "react-native-number-spinner";
import {Avatar} from "../../../../User/Avatar/index";
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
    componentWillMount() {
        AsyncStorage.getItem('clubList').then(
            value => {
                this.setState({clubList: JSON.parse(value)});
                this.forceUpdate();
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
    _setClub(visible, item) {
        this.setState({guessVisible: visible});
        if(item) {
            this.setState({
                clubQuery: item.club.name,
                guessClub: item,
            }, () => {
                this.props.navigation.dispatch(NavigationActions.setParams({
                    params: {
                        guessClub: {
                            name: this.state.guessClub.club.name,
                            id: this.state.guessClub.id
                        }
                    },
                    key: "conclusion"
                }))
            });
        }
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
        if (this.state.guessClub) {
            return (
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() => {
                    this.setState({guessVisible: true});
                    this.forceUpdate();
                }}>
                    <Avatar user={this.state.guessClub.club}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={timeLineStyle.title}>{this.state.guessClub.club.name}</Text>
                        <Text style={{
                            paddingVertical: 2,
                            paddingHorizontal: 5,
                            fontSize: 10,
                            backgroundColor: '#003366',
                            color: '#ffffff',
                            marginRight: 10
                        }}>{this.state.guessClub.category.label} {this.state.guessClub.division.label}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() => {
                    this.setState({guessVisible: true});
                    this.forceUpdate();
                }} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={[timeLineStyle.profilePic, {backgroundColor: '#cccccc'}]}/>
                    <Text style={[timeLineStyle.title, {fontSize:14,color: '#979797'}]}>Entrez le nom du club adverse</Text>
                </TouchableOpacity>
            )
        }
    }
    render() {
        const {clubQuery, clubList} = this.state;
        return (
            <ScrollView>
                <SearchDropDown title={'Equipe adverse'} dataList={this.state.clubList} visible={this.state.guessVisible}
                                     onModalClose={(visible, data) => this._setClub(visible, data)}/>
                <View style={{backgroundColor:'#e9e9e9',paddingHorizontal:15, paddingVertical:10}}>
                    <Text style={{color:'#000000', fontWeight:'600'}}>Score du match</Text>
                </View>
                <View style={{justifyContent:'space-between', paddingVertical:40,paddingHorizontal:10,flexDirection:'column'}}>
                    <View style={{justifyContent:'space-between',alignItems:'center',width:'100%',flexDirection:'row'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Avatar user={this.props.currentUser.teams[0].team.club}/>
                        <Text
                            style={timeLineStyle.title}>{this.props.currentUser.teams[0].team.club.name}</Text>
                        </View>
                        <Spinner max={99}
                                 min={0}
                                 default={0}
                                 color="#003366"
                                 numColor="#003366"
                                 onNumChange={(num) => {
                                     this.onChangeInfos('homeScore',num);
                                 }}/>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{marginLeft:15,color:'#003366',fontSize:18}}>vs</Text>
                    <View style={{marginLeft: '18%',height:1,backgroundColor:'#cccccc',width:'50%',alignSelf:'center', marginVertical:20}}/>
                    </View>
                    <View style={{justifyContent:'space-between',alignItems:'center',width:'100%',flexDirection:'row'}}>
                    {this._guessClub()}
                    <Spinner max={99}
                             min={0}
                             default={0}
                             color="#003366"
                             numColor="#003366"
                             onNumChange={(num) => {
                                 console.log(this.state);
                                 this.onChangeInfos('guessScore',num);
                             }}/>
                    </View>
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
                                 returnKeyType={'done'}
                                 onChangeSizeParent={(size)=>{
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