import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TypeEnum} from "../contentType";
import {Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OpenContent from "../OpenContent";
import ArticleDisplay from "../ArticleDisplay";
import {Video} from "expo";

import {utils as _utils} from "../../../../_constants/utils";
import utils from "../../../../config/utils";

let postContent;
let {height} = Dimensions.get('window');
const PostStyle = StyleSheet.create({
    assist_and_goals: {
        backgroundColor: '#00A65B',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 15,
        borderRadius: 5
    },
    assist_and_goals_icon: {
        height: 15,
        width: 15,
        marginRight: 5
    },
    assist_and_goals_text: {
        color: 'white',
        fontSize: 12
    }
});
export default class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: null,
            openContent: false,
            actualImg: null,
            visible: false,
            shouldPlay: false,
        };
        this.returnSimplePost = this.returnSimplePost.bind(this);
        this.returnArticle = this.returnArticle.bind(this);
        this.returnGoalPost = this.returnGoalPost.bind(this);
        this.returnAssistPost = this.returnAssistPost.bind(this);
        this.checkType = this.checkType.bind(this);
        this.onToggleModal = this.onToggleModal.bind(this);
    }

    onToggleModal(visible, img) {
        this.setState({openContent: visible});
        img ? this.setState({actualImg: img}) : '';
        this.forceUpdate();
    }

    returnInterview(title) {
        const originalWidth = this.props.medias[0].width;
        const originalHeight = this.props.medias[0].height;
        const windowWidth = Dimensions.get('window').width;
        const widthChange = (windowWidth - 10) / originalWidth;
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    this.setState({shouldPlay: !this.state.shouldPlay})
                }}>
                    <Video rate={1.0}
                           volume={1}
                           isMuted={false}
                           resizeMode="cover"
                           shouldPlay={this.state.shouldPlay}
                           source={{uri: _utils.NODEJS + this.props.medias[0].path}}
                           style={{width: originalWidth * widthChange, height: originalHeight * widthChange}}/>
                    <View
                        style={{position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', zIndex: 10}}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            zIndex: 15,
                            borderRadius: 5,
                            flexDirection: 'row',
                            backgroundColor: '#00A65B',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image style={{
                                height: 15,
                                width: 15,
                                marginRight: 10
                            }} resizeMode='contain'
                                   source={require('../../../../assets/img/picto/menu/actions/interview_white.png')}/>
                            <Text style={{fontWeight: 'bold', color: '#ffffff'}}>Interview</Text>
                        </View>
                        <View style={{
                            marginTop: 15,
                            paddingVertical: 15,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            width: '100%'
                        }}>
                            <View style={{alignSelf: 'flex-start', marginLeft: 5, justifyContent: 'flex-end'}}>
                                <Text style={{color: '#ffffff', fontSize: 16, fontWeight: '600'}}>{title}</Text>
                            </View>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }

    returnSimplePost() {
        let url = null;
        if (this.props.medias) {
            /*switch(this.props.media) {
                case this.props.media.length = 1:
                    Media = (<LocalImage source={this.props.media[0].url} />)
                     break;
                case this.props.media.length > 1:
                    Media = null;
                    break;
            }*/
        }
        let originalWidth;
        let originalHeight;
        let windowWidth = Dimensions.get('window').width;
        let widthChange;

        if (this.props.medias.length > 0) {
            url = this.props.medias[0].path;
            originalWidth = this.props.medias[0].width;
            originalHeight = this.props.medias[0].height;
            widthChange = (windowWidth - 10) / originalWidth;
            this.props.medias[0].path = this.props.medias[0].path.replace(new RegExp(/\\/g), "/");
            this.props.medias[0].path = this.props.medias[0].path.replace('public/', '');
        }
        const content = utils.renderIdentification(this.props.content);
        return (
            <View>
                <View style={{padding: 10, paddingLeft: 5, paddingRight: 5}}>
                    {content.strArray.map((str, index) => {
                        if (content.keys.length < 1) {
                            return <Text>{str}</Text>
                        } else {
                            for (let y = 0; y < content.keys.length; y++) {

                                if (content.keys[y].id === index) {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.props.goToProfileParent(content.keys[y].user);
                                        }}>
                                            <Text style={{color: '#003366', fontWeight: 'bold'}}>{str}</Text>
                                        </TouchableOpacity>);
                                } else if (content.keys[y].id !== index) {
                                    return (
                                        <Text>{str}</Text>
                                    )
                                }
                            }
                        }
                    })}
                </View>
                {this.props.medias.length > 0 ? <OpenContent owner={{
                    lastName: this.props.owner.lastname,
                    firstName: this.props.owner.firstname
                }} visible={this.state.openContent}
                             like={this.props.postsLiked.length}
                             share={this.props.postsShared.length}
                             comments={this.props.comments.length}
                             medias={this.props.medias}
                             toggleModal={(visible) => {
                                 this.onToggleModal(visible)
                             }}/> :null}
                <TouchableOpacity onPress={() => {
                    this.onToggleModal(true, url);
                }}>
                    {this.props.medias.length > 0 ? <Image source={{uri: _utils.NODEJS + this.props.medias[0].path}}
                                                           style={{
                                                               width: originalWidth * widthChange,
                                                               height: originalHeight * widthChange
                                                           }}/> : null}
                </TouchableOpacity>
            </View>);
    }

    returnAssistPost(owner, assists, club) {
        let assists_nbr;
        let scored;
        if (!club) {
            club = 'FC Carquefou'
        }
        if (assists > 1) {
            assists_nbr = assists + ' passes décisives';
        } else {
            assists_nbr = assists + ' passe décisive';
        }
        if (owner.sex === 'female') {
            scored = ' réalisée';
        } else {
            scored = ' réalisé';
        }
        return (
            <View style={{alignItems: 'center', marginBottom: 20}}>
                <View style={PostStyle.assist_and_goals}>
                    <Image style={PostStyle.assist_and_goals_icon} resizeMode='contain'
                           source={require('../../../../assets/img/picto/menu/actions/white_assist.png')}/>
                    <Text style={PostStyle.assist_and_goals_text}>Passe Décisive</Text>
                </View>
                <Text style={{paddingHorizontal: 10, textAlign: 'center'}}>
                    {owner.firstName} a {scored} <Text style={{fontWeight: '600'}}> {assists_nbr}</Text> contre <Text
                    style={{fontWeight: '600'}}>{club}</Text>
                </Text>
            </View>
        )
    }

    returnGoalPost(owner, goals, club) {
        let goals_nbr;
        let scored;
        if (!club) {
            club = 'FC Carquefou'
        }
        if (goals > 1) {
            goals_nbr = goals + ' buts';
        } else {
            goals_nbr = goals + ' but';
        }
        if (owner.sex === 'female') {
            scored = 'marquée';
        } else {
            scored = 'marqué';
        }
        return (
            <View style={{alignItems: 'center', marginBottom: 20}}>

                <View style={PostStyle.assist_and_goals}>
                    <Image style={PostStyle.assist_and_goals_icon} resizeMode='contain'
                           source={require('../../../../assets/img/picto/menu/actions/white_goal.png')}/>
                    <Text style={PostStyle.assist_and_goals_text}>But</Text>
                </View>
                <Text style={{paddingHorizontal: 10, textAlign: 'center'}}>
                    {owner.firstName} a {scored} <Text style={{fontWeight: '600'}}>{goals_nbr}</Text> contre <Text
                    style={{fontWeight: '600'}}> {club} </Text>
                </Text>
            </View>
        )
    }

    returnArticle() {
        let content = JSON.parse(JSON.stringify(eval("(" + this.props.content.toString() + ")")));
        const originalWidth = this.props.medias[0].width;
        const originalHeight = this.props.medias[0].height;
        const windowWidth = Dimensions.get('window').width;
        const widthChange = (windowWidth - 10) / originalWidth;
        let previewStr = content.firstHalf_content + '\n' + content.secondHalf_content;
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    this.setState({visible: true})
                }}>

                    <Image source={{uri: _utils.NODEJS + this.props.medias[0].path}}
                           style={{width: originalWidth * widthChange, height: originalHeight * widthChange}}/>
                    <View
                        style={{position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', zIndex: 10}}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            zIndex: 15,
                            borderRadius: 5,
                            flexDirection: 'row',
                            backgroundColor: '#00A65B',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }} resizeMode='contain'
                                   source={require('../../../../assets/img/picto/menu/actions/article_white.png')}/>
                            <Text style={{fontWeight: 'bold', color: '#ffffff'}}>Résumé</Text>
                        </View>

                        <View style={{
                            marginTop: 15,
                            paddingVertical: 20,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            width: '100%'
                        }}>
                            <View style={{alignSelf: 'flex-start', marginLeft: 5, justifyContent: 'flex-end'}}>
                                <Text style={{
                                    color: '#ffffff',
                                    fontSize: 18,
                                    fontWeight: '600'
                                }}>{this.props.title}</Text>
                                <Text style={{
                                    color: '#ffffff',
                                    fontSize: 14,
                                    marginBottom: 5
                                }}>{content.homeClub.name} {content.homeScore}
                                    - {content.guessScore} {content.guessClub.name}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: 12
                                    }}> {previewStr.substring(0, Math.min(previewStr.length, 200))} {'...Plus'}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    checkType() {
        const TYPE = this.props.postType.label;
        if (TYPE === TypeEnum.simple) {
            this.returnSimplePost()
        }
        else if (TYPE === TypeEnum.article) {
            this.returnArticle()
        }
        else if (TYPE === TypeEnum.goals) {
            this.returnGoalPost(this.props.owner, this.props.goalsNbr, this.props.content)
        }
        else if (TYPE === TypeEnum.assists) {
            this.returnAssistPost(this.props.owner, this.props.assistsNbr, this.props.content)
        }
        else if (TYPE === TypeEnum.interview) {
            this.returnInterview(this.props.title)
        }
    }

    componentWillMount() {
        this.checkType();
    }

    _renderArticleModal() {
        return (
            <Modal style={{flex: 1}} animationType={"slide"} transparent={false}
                   visible={this.state.visible}

                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                <ArticleDisplay disband={(value) => {
                    this.setState({visible: value})
                }} {...this.props} owner={this.props.owner}/>
            </Modal>
        )
    }

    render() {
        const TYPE = this.props.postType.label;
        return (
            <View>

                {this._renderArticleModal()}
                {TYPE === TypeEnum.simple ? this.returnSimplePost() :
                    TYPE === TypeEnum.article ? this.returnArticle() :
                        TYPE === TypeEnum.goals ? this.returnGoalPost(this.props.owner, this.props.goalsNbr, this.props.content) :
                            TYPE === TypeEnum.assists ? this.returnAssistPost(this.props.owner, this.props.passNbr, this.props.content) :
                                TYPE === TypeEnum.interview ? this.returnInterview(this.props.title) : null}
            </View>
        )
    }
}
/**
 * Props
 */
Content.propTypes = {
    owner: PropTypes.object,
    club: PropTypes.string,
    //postType: PropTypes.number, /* Content Type */
    //content: PropTypes.string, /* Content */
    goals_nbr: PropTypes.number, /* number of goals */
    assist_nbr: PropTypes.number, /* number of assists */
};