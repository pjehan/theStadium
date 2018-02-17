import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import UserActions from './UserActions';
import OwnerHeader from './OwnerHeader';
import Content from './Content';
import CommentModal from './CommentModal';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {postActions} from "../../../_actions";

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
    }

    onToggleComment(visible) {
        if (visible) {
            console.log(this.props.id)
            this.props.dispatch(postActions.getComments(this.props.id));
            this.setState({modalVisible: visible});
        } else {
            this.setState({modalVisible: visible});
        }

    }

    render() {
        return (
            <View style={PostStyle.container}>
                <CommentModal visible={this.state.modalVisible}
                              id={this.props.id}
                              toggleCommentModal={(visible) => {
                                  this.onToggleComment(visible)
                              }}/>
                <OwnerHeader Owner={this.state.post.owner.firstName + ' ' + this.state.post.owner.lastName}
                             postDate={this.state.post.postDate}/>

                <Content {...this.state.post} />

                <UserActions likes={this.state.post.post_likes} shares={this.state.post.post_shares}
                             comments={this.state.post.post_comments.length}/>
                <View style={PostStyle.userActionText}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Text style={PostStyle.text}>Jaime</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.onToggleComment(true)
                        }}>
                            <Text style={[PostStyle.text, {marginLeft: 5, marginRight: 5}]}>Commenter</Text>
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

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({}, dispatch)}
}
export default connect(mapDispatchToProps)(Post);