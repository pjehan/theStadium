import React, {Component} from 'react';
import {
    StyleSheet, Image, Text, View, TouchableOpacity,
    findNodeHandle,
    NativeModules
} from 'react-native';

import UserActions from './UserActions';
import OwnerHeader from './OwnerHeader';
import Content from './Content';
import CommentModal from './CommentModal';
import {connect} from "react-redux";
import {postActions} from "../../../_actions";
import {userActions} from "../../../_actions/user";
import utils from "../../../config/utils";
import {Icon} from "react-native-elements";
import CustomInput from "../../CustomInput";
import {Avatar} from "../../User/Avatar/index";
import {UserActionBottom} from "./UserActions/index";


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
        if (this.state.modalVisible) {
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

    onChange(state, newvalue) {
        this.setState({[state]: newvalue})
    }

    onSendComment() {
        const COMMENTTOADD = {
            user: this.props.currentUser.id,
            contenu: this.state.userMessage,
            createdAt: new Date(),
            post: this.props.post.id,
        };
        this.state.userMessage ? this.props.dispatch(postActions.addComment(COMMENTTOADD, this.props.id)) : null;
    }

    _renderInput() {
        const name = this.props.currentUser.userType.label !== 'Coach' ? this.props.currentUser.firstname + ' ' + this.props.currentUser.lastname : this.props.currentUser.teams[0].team.club.name;
        return (
            <View style={[PostStyle.containerTest, {height: Math.max(80, this.state.height + 35)}]}>
                <Avatar user={this.props.currentUser}/>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{paddingLeft: 5, fontSize: 14}}>{name}  </Text>
                        {this.props.currentUser.userType.label === 'Coach' ?
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{
                                    paddingVertical: 2,
                                    paddingHorizontal: 5,
                                    fontSize: 10,
                                    backgroundColor: '#003366',
                                    color: '#ffffff'
                                }}>{this.props.currentUser.teams[0].team.category.label} {this.props.currentUser.teams[0].team.division.label}</Text>
                            </View>
                            : null
                        }
                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: '#979797',
                        paddingHorizontal: 10,
                        marginTop: 5,
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center'
                    }}>
                        <CustomInput
                            container={{
                                justifyContent: 'flex-start',
                                width: '100%',
                                paddingVertical: this.state.height > 35 ? 10 : 0,
                                flex: 1,
                                height: Math.max(35, this.state.height)
                            }}
                            input={{
                                flex: 1,
                                width: '100%',
                            }}
                            textColor={'#333333'}
                            placeholder={'Commentez...'}
                            onFocus={() => this.props.scrollTo()}
                            state={'userMessage'}
                            multiple={true}
                            security={false}
                            onChangeSizeParent={(size) => {
                                this.setState({height: size});
                                if (size > 35) {
                                    this.props.scrollTo(size - 35);
                                }
                            }}
                            onChangeParent={(state, newvalue) => this.onChange(state, newvalue)}
                        />
                        <TouchableOpacity
                            style={{
                                height: Math.max(35, this.state.height),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                this.onSendComment(this.state.userMessage);
                            }}
                            accessibilityTraits="button"
                        >
                            <View><Text style={[PostStyle.commentInputText]}>Envoyer</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    goToProfile(data) {
        let id = data ? data : this.state.post.owner;
        if (utils._isUser(this.props.currentUser, id)) {
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: this.props.currentUser,
            };
            if (this.props.currentUser.userType.label === 'Coach') {
                this.props.navigation.navigate("CoachProfile", users);
            } else {
                this.props.navigation.navigate('Profile', users);
            }
        } else {
            this.props.dispatch(userActions.getInspected(id, (inspectedUser) => {

                const users = {
                    currentUser: this.props.currentUser,
                    inspectedUser: inspectedUser,
                };
                console.log(users);
                if (this.state.post.owner.userType.label === 'Coach') {
                    this.props.navigation.navigate("CoachProfile", users);
                } else {
                    this.props.navigation.navigate('Profile', users);
                }
            }));
        }
    }

    toggleLike() {
        if (this.isLiked() === true) {
            this.setState({post: {likes: this.state.post.likes - 1}, ...this.state}, () => {
                this.props.post.postsLiked.find((likes, index) => {
                    if (likes.userLikes.id === this.props.currentUser.id) {
                        this.props.post.postsLiked.splice(index,1);
                        this.setState({post: this.props.post});

                        this.props.dispatch(postActions.toggleLikePost(this.state.post.id, this.props.currentUser.id, this.isLiked()));

                        this.forceUpdate();
                    }
                });
                //this.props.post.postsLiked.push({userLikes: {id: this.props.currentUser.id}});
            });
        } else {
            this.setState({post: {likes: this.state.post.likes + 1}, ...this.state});

            this.props.post.postsLiked.push({userLikes: {id: this.props.currentUser.id}});
            this.props.dispatch(postActions.toggleLikePost(this.state.post.id, this.props.currentUser.id, this.isLiked()));
            this.forceUpdate();
        }
    }

    render() {
        return (
            <View style={[PostStyle.container, {
                shadowOffset: {width: 10, height: 10},
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 2,
            }]}>
                {this._renderCommentModal()}
                <View>
                    <OwnerHeader goToProfileParent={() => {
                        this.goToProfile()
                    }}
                                 owner={this.state.post.owner} currentUser={this.props.currentUser}
                                 post={this.state.post}
                                 Owner={this.state.post.owner.userType.label === 'Coach' ? this.state.post.owner.teams[0].team.club.name : this.state.post.owner.firstname + ' ' + this.state.post.owner.lastname}
                                 ownerID={this.state.post.owner.id} postDate={this.state.post.creationDate}
                                 team={this.state.post.owner.userType.label === 'Coach' ? this.state.post.owner.teams[0].team : null}/>
                </View>

                <Content {...this.state.post} {...this.props.navigation} goToProfileParent={(id) => {this.goToProfile(id)}} />

                <UserActions postID={this.props.post.id} userID={this.props.currentUser.id} isLiked={this.isLiked()}
                             likes={this.state.post.postsLiked.length} shares={this.state.post.postsShared.length}
                             comments={this.state.post.comments.length}/>

                <UserActionBottom toggleLike={() => this.toggleLike()} onToggleComment={() => this.onToggleComment(true, true)} isLiked={this.isLiked()}/>
                {this.props.post.comments.length > 0 ?
                    <View style={{borderTopColor: '#cccccc', borderTopWidth: 1, marginTop: 10, paddingTop: 10}}>
                        <TouchableOpacity
                            style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => {
                                this.onToggleComment(true, false)
                            }}>
                            <Text style={{color: '#003366'}}>Afficher tous les commentaires</Text>
                            <Icon style={{transform: [{rotate: '90deg'}]}}
                                  color='#003366'
                                  size={25}
                                  name={'chevron-right'}/>
                        </TouchableOpacity>
                    </View> : null}
                {this._renderInput()}
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
    containerTest: {
        borderTopColor: '#cccccc',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 20,
    },
    commentInputText: {
        color: '#003366',
        fontSize: 14,
        backgroundColor: 'transparent',
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