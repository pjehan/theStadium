import React, {Component} from 'react';
import {Text, View,Alert, TouchableOpacity, Modal} from 'react-native';

import {StyleSheet, Image} from 'react-native';
import {postActions} from "../../../../_actions/post";
import {connect} from "react-redux";
import utils from "../../../../config/utils";

class UserActions extends Component {
    constructor(props) {
        super(props);
        this.toggleLike = this.toggleLike.bind(this);
        this.state = {
            likes: this.props.likes,
            shares: this.props.shares,
            visible: false,
        }
    }

    toggleLike() {
        console.log(this.props.isLiked);
        !this.props.isLiked ? this.setState({likes: this.state.likes + 1}, () => {
            this.props.likes = this.props.likes + 1;
            this.props.dispatch(postActions.toggleLikePost(this.props.postID, this.props.userID, this.props.isLiked));
            this.forceUpdate();
        }) : this.setState({likes: this.state.likes - 1}, () => {
            this.props.likes = this.props.likes - 1;
            this.forceUpdate();
        });
    }



    toggleShare() {
        Alert.alert(
            'Partager',
            'Vous êtes sur le point de partager le post',
            [
                {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Partager', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: true }
        )
    }

    _displayShare() {
        return ( <Modal animationType={"slide"} transparent={false}
                        visible={this.state.visible}
                        onRequestClose={() => {
                            console.log("Modal has been closed.")
                        }}><View style={{
            backgroundColor: 'rgba(0,0,0,0.5)', flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                height: 200,
                width: 200,
                borderRadius: 10,
                backgroundColor: '#ffffff',
                justifyContent: 'center'
            }}>
                {utils._isUser(this.state.item.user.id, this.props.currentUser.id) ?
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        height: 40,
                        borderTopColor: '#cccccc',
                        borderTopWidth: 1,
                        borderBottomColor: '#cccccc',
                        borderBottomWidth: 0.5
                    }}
                                      onPress={() => {
                                          this.props.dispatch(postActions.deleteComment(this.state.item.id, this.props.id, this.props.comments.comments.indexOf(this.state.item)));
                                          this.props.comments.comments.splice(this.props.comments.comments.indexOf(this.state.item), 1);
                                      }}>
                        <Text style={{textAlign: 'center', color: '#003366'}}>Supprimer</Text>
                    </TouchableOpacity> : null}
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    height: 40,
                    borderTopColor: '#cccccc',
                    borderTopWidth: 0.5,
                    borderBottomColor: '#cccccc',
                    borderBottomWidth: 0.5
                }}
                                  onPress={() => {
                                  }}>
                    <Text style={{textAlign: 'center', color: '#003366'}}>Signalez un abus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    height: 40,
                    borderTopColor: '#cccccc',
                    borderTopWidth: 0.5,
                    borderBottomColor: '#cccccc',
                    borderBottomWidth: 1
                }}
                                  onPress={() => {
                                      this.setState({tools: false})
                                  }}>
                    <Text style={{textAlign: 'center', color: '#003366'}}>Annuler</Text>
                </TouchableOpacity>
            </View>
        </View></Modal>)
    }

    render() {
        return (

            <View style={PostStyle.userAction}>


                <View style={{height: 0.5, backgroundColor: '#cccccc', width: '100%'}}/>
                <TouchableOpacity onPress={() => this.toggleLike()} style={{marginLeft: 10}}>
                    <View style={{alignItems: 'center'}}>
                        <Image resizeMode="contain" style={{height: 20, width: 20}}
                               source={require('../../../../assets/img/picto/actualite/like.png')}/>
                        <Text style={PostStyle.actionText}>{this.props.likes}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft: 20, marginRight: 20}}>
                    <View style={{alignItems: 'center'}}>
                        <Image resizeMode="contain" style={{height: 15, width: 20}}
                               source={require('../../../../assets/img/picto/actualite/comment.png')}/>
                        <Text style={PostStyle.actionText}>{this.props.comments}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleShare()} style={{marginRight: 10}}>
                    <View style={{alignItems: 'center'}}>
                        <Image resizeMode="contain" style={{height: 15, width: 15}}
                               source={require('../../../../assets/img/picto/actualite/partage.png')}/>
                        <Text style={PostStyle.actionText}>{this.props.shares}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{height: 0.5, backgroundColor: '#cccccc', width: '100%'}}/>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
    };
};
export default connect(mapStateToProps)(UserActions);
const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5
    },
    profilePic: {
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
    userAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    ownerStyle: {
        flexDirection: 'row',
        padding: 5,
    },
    userActionText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    actionText: {
        fontSize: 12
    },
    teamText: {
        color: "white",
        fontSize: 12
    },
    teamBackground: {
        backgroundColor: '#003366',
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    timeText: {
        fontSize: 12,
        color: '#cccccc',
        fontWeight: '500',
        marginLeft: 2
    }
});
