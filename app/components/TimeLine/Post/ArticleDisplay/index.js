import React, {Component} from 'react';
import {
    Text,
    View, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Modal
} from 'react-native';
import {utils} from "../../../../_constants/utils";
import {postActions} from "../../../../_actions/post";
import CustomInput from "../../../CustomInput";
import {UserActionBottom} from "../UserActions/index";

import UserActions from '../UserActions';
import {connect} from "react-redux";
import {Icon} from "react-native-elements";
import {Avatar} from "../../../User/Avatar/index";
import {userActions} from "../../../../_actions/user";
import {_isUser} from "../../../../config/utils.js";


class ArticleDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',
            refreshComments: null,
            comments: null,
            modalVisible: false,
            isPreview: false
        };
    }
    isLiked() {
        return this.props.postsLiked.some(user => user.userLikes.id === this.props.currentUser.id);
    }
    goToProfile(data) {
        console.log(this.props)
        let id = data ? data : this.props.owner;
        if (_isUser(this.props.currentUser, id)) {
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: this.props.currentUser,
            };
            if (this.props.currentUser.userType.label === 'Coach') {
                this.props.navigate("CoachProfile", users);
                this.props.disband(false);
            } else {
                this.props.navigate('Profile', users);
                this.props.disband(false);
            }
        } else {
            this.props.dispatch(userActions.getInspected(id, (inspectedUser) => {

                const users = {
                    currentUser: this.props.currentUser,
                    inspectedUser: inspectedUser,
                };
                if (this.props.owner.userType.label === 'Coach') {
                    this.props.navigate("CoachProfile", users);
                    this.props.disband(false);
                } else {
                    this.props.navigate('Profile', users);
                    this.props.disband(false);
                }
            }));
        }
    }
    toggleLike() {
        if (this.isLiked() === true) {
                this.props.postsLiked.find((likes, index) => {
                    if (likes.userLikes.id === this.props.currentUser.id) {
                        this.props.postsLiked.splice(index,1);
                        this.props.dispatch(postActions.toggleLikePost(this.props.id, this.props.currentUser.id, this.isLiked()));
                        this.forceUpdate();
                    }
                });
                //this.props.post.postsLiked.push({userLikes: {id: this.props.currentUser.id}});
        } else {
            this.props.postsLiked.push({userLikes: {id: this.props.currentUser.id}});
            this.props.dispatch(postActions.toggleLikePost(this.props.id, this.props.currentUser.id, this.isLiked()));
            this.forceUpdate();
        }
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
    onToggleComment(visible, preview) {
        this.setState({isPreview: preview});

        if (visible) {
            this.props.dispatch(postActions.getComments(this.props.id));
            this.setState({modalVisible: visible});
        } else {
            this.setState({modalVisible: visible});
        }

    }
    _renderCommentModal() {
        if (this.state.modalVisible) {
            return ( <CommentModal visible={this.state.modalVisible}
                                   id={this.props.id}
                                   post={this.props}
                                   preview={this.state.isPreview}
                                   toggleCommentModal={(visible) => {
                                       this.onToggleComment(visible)
                                   }}/>)
        } else {
            return null;
        }
    }
    render() {
        let content = JSON.parse(JSON.stringify(eval("(" + this.props.content.toString() + ")")));
        const  originalWidth1 = this.props.medias[0].width;
        const originalHeight1 = this.props.medias[0].height;
        const windowWidth = Dimensions.get('window').width;
        const widthChange1 = (windowWidth - 10) / originalWidth1;
        const  originalWidth2 = this.props.medias[1].width;
        const originalHeight2 = this.props.medias[1].height;
        const widthChange2 = (windowWidth - 10) / originalWidth2;
        this.props.medias[0].path = this.props.medias[0].path.replace(new RegExp(/\\/g),"/");
        this.props.medias[0].path = this.props.medias[0].path.replace('public/', '');

        this.props.medias[1].path = this.props.medias[1].path.replace(new RegExp(/\\/g),"/");
        this.props.medias[1].path = this.props.medias[1].path.replace('public/', '');
        return (
            <View>

                {this._renderCommentModal()}
                <TouchableOpacity style={{position: 'absolute', margin:10,left: 10, top: 10,justifyContent:'center',alignItems:'center', zIndex:100, backgroundColor:'rgba(0,0,0,0.5)', height:40,width:40, borderRadius:20}}
                                  onPress={() => {this.props.disband(false)}}>
                    <Image style={{width: 15, height: 15}} resizeMode='contain'
                           source={require('../../../../assets/img/picto/white-cross.png')} />
                </TouchableOpacity>
                <ScrollView>

                <Image source={{uri: utils.NODEJS + this.props.medias[0].path.replace('public', '')}} style={{width: originalWidth1 * widthChange1, height: originalHeight1 * widthChange1, alignSelf:'center'}}/>
                <View
                    style={{flexDirection: 'row', paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 20, height: 30}} resizeMode='contain'
                           source={require('../../../../assets/img/picto/menu/actions/article.png')}/>
                    <Text style={{color: '#00A65B', marginLeft: 10, fontSize: 12, fontWeight: '500'}}>Résumé</Text>
                </View>
                <View style={{height: 1, backgroundColor: '#00A65B', alignSelf: 'center', width: '10%'}}/>
                    <View style={{height: 1, backgroundColor: '#00A65B', alignSelf: 'center', width: '10%'}}/>
                    <View style={{marginHorizontal: 5, marginVertical: 20}}>
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>
                            {this.props.title}
                        </Text>
                        <View>
                            <Text style={{textAlign: 'center', fontSize: 16}}>{content.homeClub.name} {content.homeScore}
                                - {content.guessScore} {content.guessClub.name}</Text>
                        </View>

                        <View style={style.half}>
                            <Text style={style.title}>1 ère Mi-Temps</Text>
                            <Text style={{textAlign: 'left'}}>{content.firstHalf_content}</Text>
                        </View>

                    <Image source={{uri: utils.NODEJS + this.props.medias[1].path.replace('public', '')}} style={{width: originalWidth2 * widthChange2, height: originalHeight2 * widthChange2}}/>
                    <View style={style.half}>
                        <Text style={style.title}>2 ème Mi-Temps</Text>
                        <Text style={{textAlign: 'left'}}>{content.secondHalf_content}</Text>
                    </View>
                        <View style={style.half}>
                            <Text style={style.title}>En Bref</Text>
                            <Text style={{textAlign: 'left'}}>{content.conclusion}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row',marginRight:10,alignSelf: 'flex-end', justifyContent:'center',marginVertical:10}} onPress={() => {
                        this.goToProfile()
                    }}>
                       <Text style={{color:'#003366'}}>Accéder à la page de l'équipe</Text>
                           <Icon
                                 color='#003366'
                                 size={25}
                                 name={'chevron-right'}/>
                    </TouchableOpacity>
                    <UserActions postID={this.props.id} userID={this.props.currentUser.id} isLiked={this.isLiked()}
                                 likes={this.props.postsLiked.length} shares={this.props.postsShared.length}
                                 comments={this.props.comments.length}/>
                    <UserActionBottom toggleLike={() => this.toggleLike()} onToggleComment={() => this.onToggleComment(true, true)} isLiked={this.isLiked()}/>
                    {this.props.comments.length > 0 ?
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
                </ScrollView>
            </View>
        )
    }
}
mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
    };
};
export default connect(mapStateToProps)(ArticleDisplay);
const style = StyleSheet.create({
    title: {marginBottom: 20, textAlign: 'center', fontSize: 14, fontWeight: '500'},
    half: {
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 10
    }
});
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