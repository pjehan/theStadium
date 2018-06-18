import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import UserActions from './UserActions';
import OwnerHeader from './OwnerHeader';
import Content from './Content';
import CommentModal from './CommentModal';
import {connect} from "react-redux";
import {postActions} from "../../../_actions";
import {userActions} from "../../../_actions/user";
import utils from "../../../config/utils";
import {Icon} from "react-native-elements";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            modalVisible: false,
            isPreview: false,
        };
        this.onToggleComment = this.onToggleComment.bind(this);
        this._renderCommentModal = this._renderCommentModal.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
        this.isLiked = this.isLiked.bind(this);
    }
    isLiked() {
       return this.props.post.postsLiked.some(user => user.userLikes.id === this.props.currentUser.id);
    }
    onToggleComment(visible, preview) {
            this.setState({isPreview: preview});

        if (visible) {
            this.props.dispatch(postActions.getComments(this.props.post.id));
            this.setState({modalVisible: visible});
        } else {
            this.setState({modalVisible: visible});
        }

    }
    _renderCommentModal() {
        if(this.state.modalVisible){
           return ( <CommentModal visible={this.state.modalVisible}
                          id={this.props.postList.posts.indexOf(this.state.post)}
                                  post={this.state.post}
                                  preview={this.state.isPreview}
                          toggleCommentModal={(visible) => {
                              this.onToggleComment(visible)
                          }}/>)
        } else {
            return null;
        }
    }
    goToProfile() {
        if(utils._isUser(this.props.currentUser, this.state.post.owner)){
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: this.props.currentUser,
            };
            if (this.props.currentUser.userType.label === 'Coach') {
                this.props.navigation.navigate("CoachProfile", users);
            } else {
                this.props.navigation.navigate('Profile', users);
            }
        }else {
            this.props.dispatch(userActions.getInspected(this.state.post.owner.id));
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: this.state.post.owner,
            };
            if ( this.state.post.owner.userType.label === 'Coach') {
                this.props.navigation.navigate("CoachProfile", users);
            } else {
                this.props.navigation.navigate('Profile', users);
            }
        }
    }

    toggleLike() {
        !this.isLiked() ? this.setState({likes: this.state.likes + 1}, () => {

            this.setState({post:{likes: this.state.post.likes + 1}, ...this.state});
            this.props.dispatch(postActions.toggleLikePost(this.state.post.id, this.props.currentUser.id, this.isLiked));
            this.forceUpdate();
        }) : this.setState({likes: this.state.likes - 1}, () => {
            this.props.likes = this.state.post.likes - 1;
            this.setState({post:{likes: this.state.post.likes - 1}, ...this.state});
            this.forceUpdate();
        });
    }

    render() {
        return (
            <View style={[PostStyle.container, {shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 2,}]}>
                {this._renderCommentModal()}
                <View>
                    <OwnerHeader goToProfileParent={() => {this.goToProfile()}}
                        owner={this.state.post.owner} currentUser={this.props.currentUser} Owner={ this.state.post.owner.userType.label === 'Coach' ? this.state.post.owner.teams[0].team.club.name : this.state.post.owner.firstname + ' ' + this.state.post.owner.lastname}
                                 ownerID={this.state.post.owner.id} postDate={this.state.post.creationDate} team={this.state.post.owner.userType.label === 'Coach' ? this.state.post.owner.teams[0].team : null}/>
                </View>

                <Content {...this.state.post} {...this.props.navigation} />

               <UserActions postID={this.props.post.id} userID={this.props.currentUser.id} isLiked={this.isLiked()} likes={this.state.post.postsLiked.length} shares={this.state.post.postsShared.length}
                             comments={this.state.post.comments.length}/>
                <View style={PostStyle.userActionText}>
                    <View style={{flexDirection: 'row',justifyContent:'space-between',flex:1}}>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => this.toggleLike()}>
                            <Image resizeMode="contain" style={{height: 30, width: 30,marginRight:10}}
                                   source={require('../../../assets/img/picto/actualite/picto-jaime-gris.png')}/>
                            <Text style={[PostStyle.text,{fontSize:14,color:'#cccccc',fontWeight:'600'}]}>J'aime</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
                            this.onToggleComment(true, true)
                        }}>

                            <Image resizeMode="contain" style={{height: 40, width: 40,marginRight:10}}
                                   source={require('../../../assets/img/picto/actualite/comment-gris.png')}/>
                            <Text style={[PostStyle.text,{fontSize:14,color:'#cccccc',fontWeight:'600'}]}>Commenter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
                            this.onToggleComment(true, true)
                        }}>

                            <Image resizeMode="contain" style={{height: 30, width: 30,marginRight:10}}
                                   source={require('../../../assets/img/picto/actualite/partage-gris.png')}/>
                            <Text style={[PostStyle.text,{fontSize:14,color:'#cccccc',fontWeight:'600'}]}>Partager</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{borderTopColor:'#cccccc',borderTopWidth:1,marginTop:10,paddingTop:10}}>
                    <TouchableOpacity style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}} onPress={() => {
                        this.onToggleComment(true, false)
                    }}>
                        <Text style={{color:'#003366'}}>Afficher tous les commentaires</Text>
                        <Icon style={{transform: [{ rotate: '90deg'}]}}
                              color='#003366'
                              size={25}
                              name={'chevron-right'}/>
                    </TouchableOpacity>
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
        postList: state.postList.posts,
    };
};
/*
<TouchableOpacity onPress={() => {
                        this.onToggleComment(true, false)
                    }}>
                        <Text style={[PostStyle.text]}>Lire les commentaires</Text>
                    </TouchableOpacity>
 */
export default connect(mapStateToProps)(Post);
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