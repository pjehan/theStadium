import React, {Component} from 'react';
import {
    Modal,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard
} from 'react-native';

import {GLOBAL_STYLE, timeLineStyle} from '../assets/css/global';
import Post from '../components/TimeLine/Post';
import PostModal from '../components/TimeLine/Post/PostModal';
import {connect} from 'react-redux';
import {postActions} from '../_actions';
import {TypeEnum} from "../components/TimeLine/Post/contentType/index";
import {ImagePicker, Video} from "expo";
import CustomInput from "../components/CustomInput";
import {ChoiceModalContainer} from "../components/ChoiceModal/index";
import PublishHeader from "../components/publishHeader/index";
import utils from "../config/utils";

const INTERVIEW_BTN = ["Choisir une Vidéo", "Prendre une Vidéo"];
const PHOTO_BTN = ["Choisir une Photo", "Prendre une Photo"];

class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalType: '',
            media: null,
            interviewVisible: false,
            publishType:0
        };
        this.onToggleModal = this.onToggleModal.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderList = this._renderList.bind(this);
        this._renderModal = this._renderModal.bind(this);
        this._mediaModal = this._mediaModal.bind(this);
    }

    componentWillMount() {
        const {postsFetched, posts} = this.props;
        this.props.dispatch(postActions.getAll());
    }

    componentDidUpdate(nextProps) {
        const POST = nextProps.posts.posts;
    }

    onToggleModal(visible, type) {
        this.setState({modalVisible: visible,modalType: type});
        this.forceUpdate();
    }

    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue})
    }

    _publishMedia() {
        if (this.state.media) {
            this.props.dispatch(postActions.add(this.props.currentUser.id, {
                postType: this.state.publishType,
                title: this.state.title
            }, this.state.media));
            this.setState({media: null, interviewVisible: false,publishType:null})
        }
    }

    _addMedia = async (type, postType) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: type,
            allowsEditing: true
        });
        if (!result.cancelled) {
            this.setState({media: {uri: result.uri, width: result.width, height: result.height, type: result.type}});
            this.setState({interviewVisible: true,publishType:postType});
        } else {
        }
    };

    _shootMedia = async (type, postType) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: type
        });
        if (!result.cancelled) {
            this.setState({media: {uri: result.uri, width: result.width, height: result.height, type: result.type}});
            this.setState({interviewVisible: true, publishType:postType});
        } else {
        }
    };

    _mediaModal() {
        if (this.state.media) {
            let originalWidth;
            let originalHeight;
            let windowWidth = Dimensions.get('window').width;
            let widthChange;
            originalWidth = this.state.media.width;
            originalHeight = this.state.media.height;
            widthChange = (windowWidth - 10) / originalWidth;
            return (
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={this.state.interviewVisible}
                    onRequestClose={() => {
                        console.log('close modal')
                    }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        backgroundColor: '#00000040'
                    }}>
                        <View style={{backgroundColor: '#ffffff', width: '90%'}}>
                            <View style={{
                                borderBottomWidth: 1,
                                paddingVertical: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{fontWeight: "bold", color: '#003366', fontSize: 16}}>
                                    {this.state.publishType === 5 ? 'Interview' : this.state.media.type === 'Photos' ? 'Photo' : 'Vidéo'}
                                </Text>
                            </View>
                            <CustomInput
                                container={{justifyContent: 'flex-start'}}
                                placeholder={'Donnez un titre à votre interview'}
                                input={[{
                                    borderWidth: 1,
                                    padding: 5,
                                    margin: 10,
                                }]}
                                state={'title'}
                                textColor={'#000000'}
                                placeholderTextColor={'#cccccc'}
                                borderColor={'#cccccc'}
                                backgroundColor={'#ffffff'}
                                security={false}
                                onChangeParent={(state, newvalue) => {
                                    this.onChangeInfos(state, newvalue)
                                }}/>
                            {this.state.media.type === 'Video' ? <Video source={{uri: this.state.media}}
                                                                        rate={1.0}
                                                                        volume={0}
                                                                        muted={true}
                                                                        resizeMode="cover"
                                                                        shouldPlay
                                                                        isLooping
                                                                        style={{
                                                                            width: originalWidth * widthChange,
                                                                            height: originalHeight * widthChange
                                                                        }}
                            /> : <Image source={{uri: this.state.media.uri}}
                                        resizeMode="cover"
                                        style={{
                                            width: originalWidth * widthChange,
                                            height: originalHeight * widthChange
                                        }}
                            />
                            }

                            <View style={{borderTopWidth: 1, flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={{justifyContent: 'center', alignItems: 'center', width: '50%', padding: 10}}
                                    onPress={() => {
                                        this.setState({media: null, interviewVisible: false})
                                    }}>
                                    <Text>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._publishMedia()}
                                                  style={{
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      width: '50%',
                                                      padding: 10,
                                                      borderLeftWidth: 1
                                                  }}>
                                    <Text style={{fontWeight: 'bold', color: '#003366'}}>Publier</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        } else {
            return null
        }
    }

    _renderItem(item) {
        return <Post scrollTo={(size) => {
            this.flatList.scrollToIndex({
                animated: true,
                index: this.props.posts.posts.indexOf(item),
                viewOffset: size ? (-230 - size) : -230,
                viewPosition: 1
            })
        }} style={[timeLineStyle.singlePost]} navigation={this.props.navigation}
                     key={this.props.posts.posts.indexOf(item)} id={this.props.posts.posts.indexOf(item)} post={item}/>
    }


    _renderList() {
        const {posts} = this.props;
        return (
            <FlatList
                style={{marginHorizontal: 10, height: '100%'}}
                ref={
                    (c) => {
                        this.flatList = c;
                    }
                }
                onRefresh={() => {
                    this.props.dispatch(postActions.getAll())
                }}
                refreshing={this.props.isFetching}
                data={posts.posts}
                renderItem={({item}) => this._renderItem(item)}
            />
        );
    }

    _renderModal() {
        if (this.state.modalVisible && this.state.modalType) {
            return (
                <PostModal navigation={this.props.navigation} owner={this.props.currentUser} type={this.state.modalType}
                           visible={this.state.modalVisible}
                           toggleModal={(visible, type) => {
                               this.onToggleModal(visible, type)
                           }}/>)
        } else {
            return null;
        }
    }

    choiceModal(BTN, title, function1, function2,type, postType) {
        ChoiceModalContainer.show(
            {
                options: BTN,
                title: title,
            },
            buttonIndex => {
                buttonIndex === 0 ? function1(type, postType) : buttonIndex === 1 ? function2(type, postType) : null
            }
        )
    }

    _supporterActions(action) {
        switch (action) {
            case 'video':
                this.choiceModal(INTERVIEW_BTN, "Vidéo", this._addMedia, this._shootMedia, 'Videos', 2);
                break;
            case 'photo':
                this.choiceModal(PHOTO_BTN, "Photo", this._addMedia, this._shootMedia, 'Photos', 2);
                break;
            case 'simple':
                this.onToggleModal(true, TypeEnum.simple);
                break;
        }
    }

    _coachActions(action) {
        switch (action) {
            case 'interview':
                this.choiceModal(INTERVIEW_BTN, "Interview", this._addMedia, this._shootMedia, 'Videos', 5);
                break;
            case 'simple':
                this.onToggleModal(true, TypeEnum.simple);
                break;
            case 'article':
                this.props.navigation.navigate('ArticleTab');
                break;
        }
    }

    _playerActions(action) {
        switch (action) {
            case 'assists':
                this.onToggleModal(true, TypeEnum.assists);
                break;
            case 'simple':
                this.onToggleModal(true, TypeEnum.simple);
                break;
            case 'goals':
                this.onToggleModal(true, TypeEnum.goals);
                break;
        }
    }

    render() {
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>
                {utils._userTABS(this.props.currentUser) && <PublishHeader tabs={utils._userTABS(this.props.currentUser)} onAction={(action) => {
                    switch (this.props.currentUser.userType.label) {
                        case 'Coach':
                            this._coachActions(action);
                            break;
                        case 'Joueur':
                            this._playerActions(action);
                            break;
                        case 'Supporter':
                            this._supporterActions(action);
                            break;

                    }
                }}/>}

                {this._mediaModal()}
                {this._renderModal()}

                {
                    this.props.posts ? this._renderList() :
                        !this.postsFetched && !this.props.posts ? null :
                            <Text>Aucun résultat trouvé </Text>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.postList.posts,
        postsFetched: state.postList.fetched,
        isFetching: state.postList.fetching,
        currentUser: state.currentUser.user,

    };
};
export default connect(mapStateToProps)(TimeLine);