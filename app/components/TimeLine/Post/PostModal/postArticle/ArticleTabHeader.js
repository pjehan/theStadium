import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {View,Alert, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';

import {GLOBAL_STYLE} from '../../../../../assets/css/global';
import {postActions} from "../../../../../_actions/post";


import { NavigationActions } from "react-navigation";
import {Avatar} from "../../../../User/Avatar/index";
const labels= [
    'Introduction',
    'Première mi-temps',
    'Deuxième mi-temps',
    'En bref'
];
const SETUP = [
    'title',
    'guessClub'
];
const FIRSTHALF = [
    'firstHalf_content',
    'firstHalf_coverPhoto'
];

const SECONDHALF = [
    'secondHalf_content',
    'secondHalf_coverPhoto'
];

const CONCLUSION = [
    SETUP,
    FIRSTHALF,
    SECONDHALF,
    'conclusion'
];
class ArticleTabHeader extends Component {

    constructor() {
        super();
    }

    objectContains(ELEMENTS) {
        return ELEMENTS.every((element) => {
            return !!this.props.navigation.state.routes[3].params[element];
        });
    }

    checkIfComplete(routeName) {
        switch (routeName) {
            case 'firstHalf':
                return this.objectContains(SETUP);
                break;
            case 'secondHalf':
                return this.objectContains(FIRSTHALF);
                break;
            case 'conclusion':
                return this.objectContains(SECONDHALF);
            default:
                return null;
        }
    }

    displayAlert(){
        Alert.alert(
            'Oups !',
            'Veuillez vérifier que vous avez bien rempli tout les champs',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }

    postArticle() {
        const params = this.props.navigation.state.routes[3].params;
        const content = JSON.stringify({
            homeScore: params.homeScore,
            guessScore: params.guessScore,
            firstHalf_content: params.firstHalf_content,
            secondHalf_content: params.secondHalf_content,
            guessClub: params.guessClub,
            homeClub:{name:this.props.currentUser.teams[0].team.club.name, id:this.props.currentUser.teams[0].team.club.id},
            conclusion: params.conclusion
        });
        const post = {
            title: params.title,
            content: content,
            postType: 3,
            medias: []
        };
        this.props.dispatch(postActions.add(this.props.currentUser.id,post, [params.firstHalf_coverPhoto, params.secondHalf_coverPhoto]));
        this.props.dispatch(NavigationActions.back());
    }

    render() {
        const {routes} = this.props.navigation.state;
        const index = this.props.navigation.state.index;
        return (
            <View style={{paddingTop:24,backgroundColor:'#ffffff'}}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: '#cccccc',
                    width:'95%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 40
                }}>

                        <TouchableOpacity onPress={() => {
                            if(index === 0) {
                                this.props.dispatch(NavigationActions.back());
                            } else {
                                this.props.navigation.navigate(routes[index - 1].key, {});
                            }
                        }}>
                            <Text style={{color:'#cccccc',fontSize:18}}>{index === 0 ? 'Annuler' : 'Precedent'}</Text>
                        </TouchableOpacity>
                    <Text style={{fontWeight: '600',fontSize:18}}>Résumé</Text>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
                        if(index + 1 !== routes.length){
                            this.checkIfComplete(routes[index + 1].key) ? this.props.navigation.navigate(routes[index + 1].key, {}) : this.displayAlert();
                        } else if(index + 1 === routes.length){
                           this.postArticle();
                        }
                    }}
                    >
                        <Text style={{fontWeight: '600', color: '#003366',fontSize:18}} >{index + 1 === routes.length ? 'Publier' : 'Suivant'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingLeft: 20, paddingRight: 20}}>
                    <View style={[GLOBAL_STYLE.modal, {alignItems: 'center'}]}>
                        <View
                            style={[timeLineStyle.ownerStyle, {flexDirection: 'row', marginTop: 20, marginBottom: 20}]}>
                            <Avatar user={this.props.currentUser} />
                            <View style={{flexDirection: 'column'}}>
                                <Text style={timeLineStyle.title}>{this.props.currentUser.teams[0].team.club.name}</Text>
                                <Text style={{
                                    paddingVertical: 2,
                                    paddingHorizontal: 5,
                                    fontSize:10,
                                    backgroundColor: '#003366',
                                    color: '#ffffff',
                                    marginRight: 10
                                }}>{this.props.currentUser.teams[0].team.category.label} {this.props.currentUser.teams[0].team.division.label}</Text>


                            </View>

                            </View>
                        <View style={[styles.tabContainer]}>

                            {routes.map((route, Index, key) => (
                                <View style={{flexDirection: 'row', marginVertical:20}}>
                                    <View style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 20/2,
                                        backgroundColor:  index >= Index ? '#003366' : '#cccccc'
                                    }} >
                                        <Text style={{color: index === index ? '#ffffff' : '#003366',
                                            textAlign:'center'}}>{Index + 1}</Text>
                                    </View>
                                    <View style={[{
                                        backgroundColor: index <= Index ? '#cccccc' : '#003366'
                                    },{width: 30,
                                        marginTop:8,
                                        height:2,
                                        display: Index === (routes.length - 1) ? 'none' : 'flex'
                                    }]}/>

                                </View>
                            ))}

                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{color:'#003366',fontWeight:'500'}}>Etape {index+1} : {labels[index]} </Text>
                        </View>
                        </View>
                    </View>
                </View>
                )}
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user
    };
};
export default connect(mapStateToProps)( ArticleTabHeader);
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
const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
    },
    tab: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
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
