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
    ActivityIndicator
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

const INTERVIEW_BTN = ["Choisir une Vidéo", "Prendre une Vidéo"];

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
                            <Video source={{uri: this.state.media}}
                                   rate={1.0}
                                   volume={0}
                                   muted={true}
                                   resizeMode="cover"
                                   shouldPlay
                                   isLooping
                                   style={{width: originalWidth * widthChange, height: originalHeight * widthChange}}
                            />

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
        return <Post style={[timeLineStyle.singlePost]} navigation={this.props.navigation}
                     key={this.props.posts.posts.indexOf(item)} id={this.props.posts.posts.indexOf(item)} post={item}/>
    }


    _renderList() {
        const {posts} = this.props;
        return (
            <FlatList
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
                <PostModal navigation={this.props.navigation} owner={this.props.currentUser} type={this.state.modalType} visible={this.state.modalVisible}
                           toggleModal={(visible, type) => {
                               this.onToggleModal(visible, type)
                           }}/>)
        } else {
            return null;
        }
    }

    _renderLoading() {
        return (
            <View>
                <ActivityIndicator
                    size={'large'}/>
                <Text>Chargement de votre TimeLine</Text>
            </View>
        )
    }

    _renderCoachHeader() {
        return (
            <View style={[timeLineStyle.tabContainer, {
                shadowOffset: {width: 210, height: 10},
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 5
            }]}>


                <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                    ChoiceModalContainer.show(
                        {
                            options: INTERVIEW_BTN,
                            title: "Interview",
                            message: "Vous êtes sur le point de publier une interview, vous pouvez utiliser votre gallerie ou bien faire la vidéo dès maintenant !"
                        },
                        buttonIndex => {
                            console.log(buttonIndex)
                            buttonIndex === 0 ? this._addInterview() : buttonIndex === 1 ? this._shootInterview() : null
                        }
                    )
                }}>
                    <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                           source={require('../assets/img/picto/menu/actions/interview.png')}/>
                    <Text style={timeLineStyle.tabButtonText}>Interview</Text>
                </TouchableOpacity>
                <View style={timeLineStyle.buttonBorder}/>
                <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                    this.props.navigation.navigate('ArticleTab')
                }}>
                    <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                           source={require('../assets/img/picto/menu/actions/article.png')}/>
                    <Text style={timeLineStyle.tabButtonText}>Résumé</Text>
                </TouchableOpacity>
                <View style={timeLineStyle.buttonBorder}/>
                <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                    this.onToggleModal(true, TypeEnum.simple)
                }}>
                    <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                           source={require('../assets/img/picto/menu/actions/post.png')}/>
                    <Text style={timeLineStyle.tabButtonText}>Publier</Text>
                </TouchableOpacity>
            </View>)
    }

    _renderSupporterHeader() {
        return (<View style={[timeLineStyle.tabContainer, {
            shadowOffset: {width: 210, height: 10},
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: 5
        }]}>


            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                this._addInterview();
            }}>
                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                       source={require('../assets/img/picto/menu/actions/interview.png')}/>
                <Text style={timeLineStyle.tabButtonText}>Interview</Text>
            </TouchableOpacity>
            <View style={timeLineStyle.buttonBorder}/>
            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                this.props.navigation.navigate('ArticleTab')
            }}>
                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                       source={require('../assets/img/picto/menu/actions/article.png')}/>
                <Text style={timeLineStyle.tabButtonText}>Résumé</Text>
            </TouchableOpacity>
            <View style={timeLineStyle.buttonBorder}/>
            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                this.onToggleModal(true, TypeEnum.simple)
            }}>
                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                       source={require('../assets/img/picto/menu/actions/post.png')}/>
                <Text style={timeLineStyle.tabButtonText}>Publier</Text>
            </TouchableOpacity>
        </View>)
    }

    _renderPlayerHeader() {
        return (<View style={[timeLineStyle.tabContainer, {
            shadowOffset: {width: 210, height: 10},
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: 5
        }]}><TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
            this.onToggleModal(true, TypeEnum.assists)
        }}>
            <Image style={[timeLineStyle.tabButtonPicto, {height: 20, width: 20}]} resizeMode='contain'
                   source={require('../assets/img/picto/menu/actions/assist.png')}/>
            <Text style={timeLineStyle.tabButtonText}>Passe dé.</Text>
        </TouchableOpacity>
            <View style={timeLineStyle.buttonBorder}/>
            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                this.onToggleModal(true, TypeEnum.goals)
            }}>
                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                       source={require('../assets/img/picto/menu/actions/goal.png')}/>
                <Text style={timeLineStyle.tabButtonText}>But</Text>
            </TouchableOpacity>
            <View style={timeLineStyle.buttonBorder}/>
            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                this.onToggleModal(true, TypeEnum.simple)
            }}>
                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                       source={require('../assets/img/picto/menu/actions/post.png')}/>
                <Text style={timeLineStyle.tabButtonText}>Publier</Text>
            </TouchableOpacity>
        </View>)
    }

    render() {
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>

                {this._renderModal()}
                {this._interviewModal()}
                {this.props.currentUser.userType.label === "Joueur" ? this._renderPlayerHeader() : this.props.currentUser.userType.label === 'Coach' ? this._renderCoachHeader() : null}
                <ScrollView contentContainerStyle={{flex: 1}}
                            style={{paddingHorizontal: 10, height: '100%'}}>
                    {
                        this.props.posts ? this._renderList() :
                            !this.postsFetched && !this.props.posts ? this._renderLoading() :
                                <Text>Aucun résultat trouvé </Text>
                    }
                </ScrollView>
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