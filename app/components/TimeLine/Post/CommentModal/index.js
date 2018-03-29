import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';
import {Icon} from 'react-native-elements';
import CustomInput from "../../../CustomInput";
import {postActions} from "../../../../_actions";
import {connect} from "react-redux";
import UserActions from '../UserActions';
import OwnerHeader from '../OwnerHeader';
import Content from '../Content';

const PostStyle = StyleSheet.create({
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
let toolsModal = null;

class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',
            refreshComments: null,
            comments: null,
            tools: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderList = this.renderList.bind(this);
        this._displayTools = this._displayTools.bind(this);
        this.renderPost = this.renderPost.bind(this);
    };

    _displayTools() {
        return (
            <Modal animationType={"slide"} transparent={true}
                visible={this.state.tools}
                presentationStyle={'formSheet'}
                onRequestClose={() => {
                    console.log("Modal has been closed.")
                }}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.5)',flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View style={{height: 200, width: 200, backgroundColor: '#ffffff'}}>
                        <TouchableOpacity style={{height: 20, borderTopColor: '#cccccc', borderTopWidth: 2}}
                                          onPress={() => {
                                              this.props.dispatch(postActions.deleteComment(this.props.id, this.props.comments.comments.indexOf(item)));
                                          }}>
                            <Text style={{color: '#003366'}}>Supprimer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height: 20, borderTopColor: '#cccccc', borderTopWidth: 2}}
                                          onPress={() => {
                                          }}>
                            <Text style={{color: '#003366'}}>Signalez un abus</Text>
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
                    Owner={this.props.post.club ? this.props.post.club : this.props.post.owner.firstName + ' ' + this.props.post.owner.lastName}
                    postDate={this.props.post.postDate} team={this.props.post.owner.team}/>

                <Content {...this.props.post} />


            </View>
        )
    }

    /*
    <UserActions likes={this.props.post.post_likes} shares={this.props.post.post_shares}
                                 comments={this.props.post.post_comments.length}/>
     */
    renderItem(item) {
        console.log(item)
        if (item) {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({tools: true})
                }} style={PostStyle.container}>

                    <View style={PostStyle.ownerStyle}>
                        {item.user.profilepicture ?
                            <Image style={PostStyle.profilePic} source={{uri: item.user.profilepicture}}/> :
                            <View style={[PostStyle.profilePic, PostStyle.profilBack]}/>}
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={PostStyle.title}>{item.user.firstname} {item.user.lastname}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                                </View>
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
            return null;
        } else {
            console.log(this.props.comments)
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
            post: 1,
        };
        this.props.dispatch(postActions.addComment(COMMENTTOADD));

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
                    {this.props.visible ? null : /*this.renderPost() : */null}
                    {this._displayTools()}
                    {this.props.visible && this.props.comments && !this.props.isFetching ? this.renderList() :
                        <ActivityIndicator color="#ffffff" size="large"/>}
                    <View style={{justifyContent: 'center', backgroundColor: '#cccccc', padding: 5}}>
                        <CustomInput
                            ref={input => {
                                this.textInput = input
                            }}
                            container={{
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                                borderRadius: 35,
                                height: 35,
                                flexDirection: 'row'
                            }}
                            input={{flex: 4, borderRadius: 35, height: '100%', paddingHorizontal: 10}}
                            textColor={'#333333'}
                            placeholder={'Commentez...'}
                            security={false}
                            action={'send'}
                            state={'userMessage'}
                            onChangeParent={(state, newvalue) => this.onChange(state, newvalue)}
                            onTriggeredAction={(value) => this.onSendComment(value)}
                        />
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
        isFetching: state.commentList.fetching
    };
};
export default connect(mapStateToProps)(CommentModal);