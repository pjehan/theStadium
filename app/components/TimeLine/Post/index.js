import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import UserActions from './UserActions';
import OwnerHeader from './OwnerHeader';
import Content from './Content';
import CommentModal from './CommentModal';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {postActions} from "../../../_actions";
import {userActions} from "../../../_actions/user";

const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
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
    },
    assist_and_goals: {
        backgroundColor: '#00A65B',
    }
});
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            modalVisible: false,
        };
        this.onToggleComment = this.onToggleComment.bind(this);
        this._renderCommentModal = this._renderCommentModal.bind(this);
        this.buttonPress = this.buttonPress.bind(this);
        this.isLiked = this.isLiked.bind(this);
    }
    isLiked() {
       return this.props.post.postsLiked.some(user => user.userLikes.id === this.props.currentUser.id);
    }
    onToggleComment(visible) {
        if (visible) {
            this.props.dispatch(postActions.getComments(this.props.id+1));
            this.setState({modalVisible: visible});
        } else {
            this.setState({modalVisible: visible});
        }

    }
    _renderCommentModal() {
        if(this.state.modalVisible){
           return ( <CommentModal visible={this.state.modalVisible}
                          id={this.props.id}
                                  post={this.state.post}
                          toggleCommentModal={(visible) => {
                              this.onToggleComment(visible)
                          }}/>)
        } else {
            return null;
        }
    }
    buttonPress() {
        this.props.dispatch(userActions.getInspected(this.state.post.owner.id));
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: this.state.post.owner.id,
            };
            this.props.navigation.navigate('Profile', users);
    }
    render() {

        return (
            <View style={[PostStyle.container, {shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 4,}]}>
                {this._renderCommentModal()}
                <TouchableOpacity onPress={() => {this.buttonPress()}}>
                <OwnerHeader Owner={ this.state.post.club ? this.state.post.club : this.state.post.owner.firstname + ' ' + this.state.post.owner.lastname}
                             postDate={this.state.post.creationDate} team={this.state.post.owner.team}/>
                </TouchableOpacity>

                <Content {...this.state.post} />

               <UserActions postID={this.props.post.id} userID={this.props.currentUser.id} isLiked={this.isLiked()} likes={this.state.post.postsLiked.length} shares={this.state.post.postsShared.length}
                             comments={this.state.post.comments.length}/>
                <View style={PostStyle.userActionText}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Text style={PostStyle.text}>Jaime</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.onToggleComment(true)
                        }}>
                            <Text style={[PostStyle.text, {marginHorizontal:10}]}>Commenter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={PostStyle.text}>Partager</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={PostStyle.text}>Lire les commentaires</Text>
                </View>
            </View>
        )
    }
}
mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        inspectedUser: state.inspectedUser.user,
        isFetching: state.inspectedUser.fetching,
    };
};
export default connect(mapStateToProps)(Post);