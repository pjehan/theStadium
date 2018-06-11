import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';

import {GLOBAL_STYLE} from '../../../../../assets/css/global';
import {postActions} from "../../../../../_actions/post";


import { NavigationActions } from "react-navigation";
const labels= [
    'Introduction',
    'Première mi-temps',
    'Deuxième mi-temps',
    'En bref'
];
class ArticleTabFooter extends Component {
    render() {
        console.log(NavigationActions);
        const {routes} = this.props.navigation.state;
        const index = this.props.navigation.state.index;
        return (
            <View style={{backgroundColor:'#ffffff'}}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: '#cccccc',
                    justifyContent: 'space-around',
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
                        <Text style={{color:'#cccccc'}}>{index === 0 ? 'Annuler' : 'Precedent'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
                        if(index + 1 !== routes.length){
                            this.props.navigation.navigate(routes[index + 1].key, {});
                        } else if(index + 1 === routes.length){
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
                    }}
                    >
                        <Text style={{fontWeight: '600', color: '#003366'}} >{index + 1 === routes.length ? 'Publier' : 'Suivant'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )}
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user
    };
};
export default connect(mapStateToProps)( ArticleTabFooter);
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
