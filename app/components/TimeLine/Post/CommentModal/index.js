import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    FlatList,
    ActivityIndicator, ScrollView
} from 'react-native';
import {Icon} from 'react-native-elements';
import CustomInput from "../../../CustomInput";
import {postActions} from "../../../../_actions";
import {connect} from "react-redux";
import UserActions from '../UserActions';
import OwnerHeader from '../OwnerHeader';
import Content from '../Content';

let toolsModal = null;

class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',
            refreshComments: null,
            tools: false,
            item: null,
            comments: this.props.comments
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderList = this.renderList.bind(this);
        this._displayTools = this._displayTools.bind(this);
        this.renderPost = this.renderPost.bind(this);
    };
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){}
    }
    _isUser(user, inspected) {
        return user === inspected;
    }
    _displayTools() {
        return (
            <Modal animationType={"slide"} transparent={true}
                visible={this.state.tools}

                onRequestClose={() => {
                    console.log("Modal has been closed.")
                }}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.5)',flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View style={{height: 200, width: 200,borderRadius:10, backgroundColor: '#ffffff', justifyContent:'center'}}>
                        {this._isUser(this.props.ownerID, this.props.currentUser.id) ?
                            <TouchableOpacity style={{justifyContent:'center',height: 40, borderTopColor: '#cccccc', borderTopWidth: 1,borderBottomColor: '#cccccc', borderBottomWidth: 0.5}}
                                          onPress={() => {
                                              this.props.dispatch(postActions.deleteComment(this.state.item.id,this.props.id,this.props.comments.comments[0].indexOf(this.state.item)));
                                              this.props.comments.comments[0].splice(this.props.comments.comments[0].indexOf(this.state.item), 1);
                                          }}>
                            <Text style={{textAlign:'center', color: '#003366'}}>Supprimer</Text>
                        </TouchableOpacity> : null}
                        <TouchableOpacity style={{justifyContent:'center',height: 40, borderTopColor: '#cccccc', borderTopWidth: 0.5,borderBottomColor: '#cccccc', borderBottomWidth: 0.5}}
                                          onPress={() => {
                                          }}>
                            <Text style={{textAlign:'center', color: '#003366'}}>Signalez un abus</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center',height: 40, borderTopColor: '#cccccc', borderTopWidth: 0.5,borderBottomColor: '#cccccc', borderBottomWidth: 1}}
                                               onPress={() => { this.setState({tools: false})
                                               }}>
                            <Text style={{textAlign:'center', color: '#003366'}}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    renderPost() {
        return (
            <View>
                <OwnerHeader
                    Owner={this.props.post.club ? this.props.post.club : this.props.post.owner.firstname + ' ' + this.props.post.owner.lastname}
                    postDate={this.props.post.postDate} team={this.props.post.owner.team}/>
                <OwnerHeader
                    owner={this.state.post.owner}
                    Owner={ this.props.post.owner.userType.label === 'Coach' ? this.props.post.owner.teams[0].team.club.name : this.props.post.owner.firstname + ' ' + this.props.post.owner.lastname}
                    ownerID={this.props.post.owner.id} postDate={this.props.post.creationDate} team={this.props.post.owner.userType.label === 'Coach' ? this.props.post.owner.teams[0].team : null}/>

                <Content {...this.props.post} />


            </View>
        )
    }

    /*
    <UserActions likes={this.props.post.post_likes} shares={this.props.post.post_shares}
                                 comments={this.props.post.post_comments.length}/>
     */
    renderItem(item) {
        if (item) {
            return (
                <TouchableOpacity  style={PostStyle.container}>

                    <View style={[PostStyle.ownerStyle, {width:'100%'}]}>
                        {item.user.profilepicture && item.user.userType === 'Joueur' ?
                            <Image style={PostStyle.profilePic} source={{uri: item.user.profilepicture}}/> : item.user.teams[0].team.club.profilePicture ?
                                <Image style={PostStyle.profilePic} source={{uri: item.user.teams[0].team.club.profilePicture}}/> :
                            <View style={[PostStyle.profilePic, PostStyle.profilBack]}/>}
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width:'75%'}}>
                                {item.user.userType === 'Joueur' ?
                                    <Text style={PostStyle.title}>{item.user.firstname} {item.user.lastname}</Text>
                                    :
                                    <View>
                                    <Text style={PostStyle.title}>{item.user.teams[0].team.club.name}</Text>
                                    <Text style={{
                                        paddingVertical: 2,
                                        paddingHorizontal: 15,
                                        backgroundColor: '#003366',
                                        color: '#ffffff',
                                        marginRight: 10
                                    }}>{item.user.teams[0].team.category.label + ' ' + item.user.teams[0].team.division.label}</Text></View>}
                                <TouchableOpacity onPress={() => {
                                    this.setState({tools: true, item: item})
                                }} style={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-end'}}>
                                    <View style={{height: 5, width: 5, backgroundColor: '#cccccc', borderRadius: 8}}/>
                                    <View style={{
                                        height: 5,
                                        width: 5,
                                        backgroundColor: '#cccccc',
                                        borderRadius: 8,
                                        marginLeft: 2,
                                        marginRight: 2
                                    }}/>
                                    <View style={{height: 5, width: 5, backgroundColor: '#cccccc', borderRadius: 8}}/>

                                </TouchableOpacity>
                            </View>
                            <Text style={PostStyle.content}>{item.contenu}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            )
        }
    }


    renderList() {
        if (!this.props.comments.comments) {
            return <ActivityIndicator color="#ffffff" size="large"/>
        } else {
            return (
                <FlatList
                    data={this.props.comments.comments[0]}
                    extraData={this.props.comments.comments[0]}
                    renderItem={({item}) => this.renderItem(item)}
                />
            );
        }
    }

    toggleModal(visible) {
        this.props.toggleCommentModal(visible);
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
        const commentState = {
            user: this.props.currentUser,
            contenu: this.state.userMessage,
            createdAt: new Date(),
            post: this.props.post.id,
        };
        this.props.dispatch(postActions.addComment(COMMENTTOADD,this.props.id));
    }

    render() {
        return (
            <View>
                <Modal animationType={"slide"} transparent={false}
                       visible={this.props.visible}
                       onRequestClose={() => {
                           console.log("Modal has been closed.")
                       }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: '#eeeeee',
                        borderBottomWidth: 0.5,
                        borderColor: '#cccccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 70
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.toggleModal(false)
                        }}>
                            <Icon color='#003366'
                                  size={25}
                                  name={'expand-less'}
                            />
                            <Text style={{color: '#003366'}}>Retour</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                    {this.props.preview ? this.renderPost() : null}
                    {this._displayTools()}
                    {this.props.visible && this.props.comments && !this.props.isFetching ? this.renderList() : <ActivityIndicator color="#ffffff" size="large"/>}
                    </ScrollView>
                    <View style={[PostStyle.containerTest, {height: Math.max(44, this.state.height)}]}>

                        <CustomInput
                            container={{justifyContent:'flex-start',flex:1,height: Math.max(44, this.state.height)}}
                            input={{flex:1,borderRadius: 35, paddingHorizontal: 10,height: Math.max(44, this.state.height)}}
                            textColor={'#333333'}
                            placeholder={'Commentez...'}
                            state={'userMessage'}
                            multiple={true}
                            security={false}
                            onChangeSizeParent={(size)=>{
                                this.setState({height:size})
                            }}
                            onChangeParent={(state, newvalue) => this.onChange(state, newvalue)}
                        />
                        <TouchableOpacity
                            style={[PostStyle.commentInputContainer, {height: Math.max(44, this.state.height)}]}
                            onPress={() => {
                                this.onSendComment(this.state.userMessage);
                            }}
                            accessibilityTraits="button"
                        >
                            <View><Text style={[PostStyle.commentInputText]}>Envoyer</Text></View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        comments: state.commentList.comments,
        isFetching: state.commentList.fetching,
        postList: state.postList.posts,
    };
};
export default connect(mapStateToProps)(CommentModal);


const PostStyle = StyleSheet.create({
    containerTest: {
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        backgroundColor: 'white',
        flex:1,
        height:44,
        flexDirection: 'row',
        paddingVertical:10,
        alignItems:'center',
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
        commentInputContainer: {
        height:44,
        justifyContent: 'center',
    },
    commentInputText: {
        color: '#003366',
        fontWeight: '600',
        fontSize: 17,
        backgroundColor: 'transparent',
        marginVertical: 6,
        marginHorizontal: 10,
    },
    container: {
        backgroundColor: '#ffffff',
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 0.5, borderColor: '#cccccc',
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius: 45,
        marginRight: 10,
        marginLeft: 10,
    },
    profilBack: {
        backgroundColor: 'red',
    },
    text: {
        color: 'black',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500'
    },
    content: {
        fontSize: 14,
        paddingRight: 80
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
        fontWeight: '400',
        marginLeft: 2
    }
});