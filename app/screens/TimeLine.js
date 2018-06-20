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
        };
        this.onToggleModal = this.onToggleModal.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderList = this._renderList.bind(this);
        this._renderModal = this._renderModal.bind(this);
        this._interviewModal = this._interviewModal.bind(this);
        this._publishInterview = this._publishInterview.bind(this);
        this._shootInterview = this._shootInterview.bind(this);
    }

    componentWillMount() {
        const {postsFetched, posts} = this.props;
        this.props.dispatch(postActions.getAll());
    }

    componentDidUpdate(nextProps) {
        const POST = nextProps.posts.posts;
    }

    onToggleModal(visible, type) {
        this.setState({modalVisible: visible});
        this.setState({modalType: type});

        this.forceUpdate();
    }

    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue})
    }

    _publishInterview() {
        if (this.state.media) {
            this.props.dispatch(postActions.add(this.props.currentUser.id, {
                postType: 5,
                title: this.state.title
            }, this.state.media));
            this.setState({media: null, interviewVisible: false})
        }
    }

    _addInterview = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Videos'
        });
        if (!result.cancelled) {
            this.setState({media: {uri: result.uri, width: result.width, height: result.height, type: result.type}});
            this.setState({interviewVisible: true});
        } else {
        }
    };

    _shootInterview = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'Videos'
        });
        if (!result.cancelled) {
            this.setState({media: {uri: result.uri, width: result.width, height: result.height, type: result.type}});
            this.setState({interviewVisible: true});
        } else {
        }
    };

    _publishPhoto() {
        if (this.state.media) {
            this.props.dispatch(postActions.add(this.props.currentUser.id, {
                postType: 1,
                title: this.state.title
            }, this.state.media));
            this.setState({media: null, interviewVisible: false})
        }
    }

    _addPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Photos'
        });
        if (!result.cancelled) {
            this.setState({media: {uri: result.uri, width: result.width, height: result.height, type: result.type}});
            // this.setState({interviewVisible: true});
        } else {
        }
    };

    _shootPhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'Photos'
        });
        if (!result.cancelled) {
            this.setState({media: {uri: result.uri, width: result.width, height: result.height, type: result.type}});
            this.setState({interviewVisible: true});
        } else {
        }
    };

    _interviewModal() {
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
                                    Interview
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
                                <TouchableOpacity onPress={() => this._publishInterview()}
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

    choiceModal(BTN, title, function1, function2) {
        console.log('test')
        ChoiceModalContainer.show(
            {
                options: BTN,
                title: title,
            },
            buttonIndex => {
                buttonIndex === 0 ? function1() : buttonIndex === 1 ? function2() : null
            }
        )
    }

    _supporterActions(action) {
        switch (action) {
            case 'video':
                this.choiceModal(INTERVIEW_BTN, "Video", this._addInterview, this._shootInterview);
                break;
            case 'photos':
                this.choiceModal(PHOTO_BTN, "Photo", this._addPhoto(), this._shootPhoto());
                break;
            case 'simple':
                this.onToggleModal(true, TypeEnum.simple);
                break;
        }
    }

    _coachActions(action) {
        switch (action) {
            case 'interview':
                this.choiceModal(INTERVIEW_BTN, "Interview", this._addInterview, this._shootInterview);
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
                this.onToggleModal(true, TypeEnum.simple);
                break;
        }
    }

    render() {
        const PLAYERTABS = [
            {
                label: 'Passe dé.',
                dim: {height: 20, width: 20},
                picto: require('../assets/img/picto/menu/actions/assist.png'),
                action: 'assists'
            },
            {label: 'But', picto: require('../assets/img/picto/menu/actions/goal.png'), action: 'goals'},
            {label: 'Publier', picto: require('../assets/img/picto/menu/actions/post.png'), action: 'simple'}
        ];
        const COACHTABS = [
            {label: 'Interview', picto: require('../assets/img/picto/menu/actions/interview.png'), action: 'interview'},
            {label: 'Résumé', picto: require('../assets/img/picto/menu/actions/article.png'), action: 'article'},
            {label: 'Publier', picto: require('../assets/img/picto/menu/actions/post.png'), action: 'simple'}
        ];

        const SUPPORTERTABS = [
            {label: 'Vidéo', picto: require('../assets/img/picto/menu/actions/photo.png'), action: 'video'},
            {label: 'Photo', picto: require('../assets/img/picto/menu/actions/photo.png'), action: 'photo'},
            {label: 'Publier', picto: require('../assets/img/picto/menu/actions/post.png'), action: 'simple'}
        ];

        let TABS;

        if (this.props.currentUser.userType.label === "Joueur") {
            TABS = PLAYERTABS;
        } else if (this.props.currentUser.userType.label === 'Supporter') {
            TABS = SUPPORTERTABS;
        } else {
            TABS = COACHTABS;
        }
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>
                {TABS && <PublishHeader tabs={TABS} onAction={(action) => {
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
                {this._renderModal()}
                {this._interviewModal()}

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