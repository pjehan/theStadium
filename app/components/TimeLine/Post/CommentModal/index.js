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
import {bindActionCreators} from 'redux';

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

class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',
            refreshComments: null,
            comments: null
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderList = this.renderList.bind(this);
    };

    renderItem(item) {
        if (item !== null) {
            return (
                <TouchableOpacity onPress={() => {this.props.dispatch(postActions.deleteComment(this.props.id, this.props.comments.comments.indexOf(item)));}} style={PostStyle.container}>
                    <View style={PostStyle.ownerStyle}>
                        <Image style={PostStyle.profilePic} source={{uri: item.user.profilePic}}/>
                        <View>
                            <Text style={PostStyle.title}>{item.user.firstName} {item.user.lastName}</Text>
                            <Text style={PostStyle.content}>{item.comment}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }


    renderList() {
        if (!this.props.comments.comments) {
            return null;
        }else {
            return (
                <FlatList
                    data={this.props.comments.comments}
                    extraData={this.props.comments.comments}
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
            user: {
                lastName: 'Bink',
                firstName: 'AOJFEHFIE',
                profilePic: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/51ce6099e4b0d911b4489b79/527a724ce4b008de58b3ea68/1383764526315/jar-jar-binks-dies-in-star-wars-deleted-scene-preview.jpg?format=300w',
                sex: 'male',
                team: 'Senior FD3'
            },
            comment: this.state.userMessage,
        };
        this.props.dispatch(postActions.addComment(this.props.id, COMMENTTOADD));

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
                        <TouchableOpacity>
                            <Icon color='#003366'
                                  size={25}
                                  name={'expand-less'}
                                  onPress={() => {
                                      this.toggleModal(false)
                                  }}/>
                            <Text style={{color: '#003366'}}>Revenir à l'article</Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.visible && this.props.comments ? this.renderList() : <ActivityIndicator color="#ffffff" size="large" />}
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
        comments: state.commentList.comments,
    };
};
export default connect(mapStateToProps)(CommentModal);