import React, {Component} from 'react';
import {
    ActivityIndicator, Dimensions, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity,
    View
} from 'react-native';
import {ImagePicker, Video} from 'expo';

import Placeholder from 'rn-placeholder';
import {Icon} from 'react-native-elements';
import {timeLineStyle} from '../assets/css/global';
import {connect} from "react-redux";
import {userActions} from "../_actions/user";
import Post from "../components/TimeLine/Post";
import PostModal from '../components/TimeLine/Post/PostModal';
import {postActions} from "../_actions/post";
import utils from "../config/utils";
import {utils as utilsC} from "../_constants/utils";
import PublishHeader from "../components/publishHeader";
import {TypeEnum} from "../components/TimeLine/Post/contentType/index";
import {ChoiceModalContainer} from "../components/ChoiceModal/index";
import CustomInput from "../components/CustomInput";

let ImageCover = null;
let {width} = Dimensions.get('window');

const INTERVIEW_BTN = ["Choisir une Vidéo", "Prendre une Vidéo"];
const PHOTO_BTN = ["Choisir une Photo", "Prendre une Photo"];
class Actus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modalType: '',
            profilePic: '../assets/img/thestadium/profil.jpeg',
            media: null,
            interviewVisible: false,
            publishType:0
        }
    }

    componentWillMount() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        if(state.inspectedUser){
            this.props.dispatch(postActions.getOwnerList(state.inspectedUser.id));
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps ? this.setState({profilePic: nextProps.inspectedUser.profilepicture}) : null;
        this.forceUpdate();
    }
    onToggleModal(visible, type) {
        this.setState({modalVisible: visible});
        this.setState({modalType: type});

        this.forceUpdate();
    }
    _addMedia = async (coach) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (!result.cancelled) {
            const user = this.props.currentUser;
            this.props.dispatch(userActions.putUser(user, result));
        } else {

        }
    };

    _displayPath(istrue){
        if(!istrue){
            return this.props.navigation.state.params.inspectedUser;
        }else {
            return this.props.currentUser;
        }
    }

    _isLiked(user, inspected) {
        if (inspected.userType.label !== 'Coach') {
            return user.players.includes('/api/players/' + inspected.id)
        } else {
            return user.teamsLiked.includes('/api/teamsLiked' + inspected.teams[inspected.teams.length - 1].id);
        }
    }

    toggleFollow(user, inspected) {
        console.log(user, inspected, this._isLiked(user, inspected))
        if (inspected.userType.label === 'Coach') {
            if (this._isLiked(user, inspected)) {
                user.teamsLiked.splice(user.teamsLiked.indexOf('/api/teams/' + inspected.teams[inspected.teams.length - 1].id), 1);
                this.props.dispatch(userActions.putUser(user));
            } else {
                this.props.navigation.state.params.currentUser.teamsLiked.push('/api/teams/' + inspected.teams[0].id);
                console.log(this.props.navigation.state.params.currentUser.teamsLiked);
                this.props.dispatch(userActions.putUser(user));
            }
        } else {

            if (this._isLiked(user, inspected)) {
                user.players.splice(user.players.indexOf(inspected, 1));
                this.props.dispatch(userActions.putUser(user));
            } else {

                user.players.push('/api/players/' + inspected.id);
                this.props.dispatch(userActions.putUser(user));
            }
        }

    }
    _renderModal() {
        if(this.state.modalVisible && this.state.modalType){
            return (<PostModal owner={this.props.currentUser} type={this.state.modalType} visible={this.state.modalVisible}
                               toggleModal={(visible, type) => {
                                   this.onToggleModal(visible, type)
                               }}/>)
        } else {
            return null;
        }
    }
    _renderHeader() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        let type = !state.inspectedUser.userType ? this.props.inspectedUser.userType.label : state.inspectedUser.userType.label;
        let team;
        if(type !== 'Supporter') {
            team = !state.inspectedUser.teams ? this.props.inspectedUser.teams[0].team : state.inspectedUser.teams[0].team;
        }
        if (type !== 'Coach') {
            return (
                <View>
                    <Image style={{height: 250, width: width}} resizeMode={'cover'}
                           source={
                               this._displayPath(utils._isUser(state.currentUser, state.inspectedUser)).profilepicture ?
                                   {uri: utilsC.NODEJS + this._displayPath(utils._isUser(state.currentUser, state.inspectedUser)).profilepicture} :
                                   require('../assets/img/thestadium/placeholder.jpg') } />
                    {utils._isUser(state.currentUser, state.inspectedUser) ?
                        <TouchableOpacity onPress={() => this._addMedia()} style={{
                            height: 30,
                            width: 30,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Icon size={20} type={'entypo'} name={'camera'} color={'#ffffff'}/>
                        </TouchableOpacity> : null}
                </View>);
        } else {
            return (
                <View>
                    <Image style={{height: 250, width: width}} resizeMode={'cover'}
                           source={this.props.inspectedUser.profilepicture ? {uri: 'http://192.168.43.103:3000/' +this.props.inspectedUser.profilepicture} : require('../assets/img/thestadium/placeholder.jpg')} />
                        <View style={{
                            height: 250,
                            width: width / 2.5,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image style={{height: 100, width: 100}} resizeMode={'cover'}
                                   source={team.club.profilePicture ? {uri: team.club.profilePicture} : require('../assets/img/thestadium/placeholder.jpg')}/>
                            <Text style={{
                                color: '#ffffff',
                                fontWeight: '700',
                                marginVertical: 5
                            }}>{team.club.name}</Text>
                            <View style={{paddingHorizontal: 10, backgroundColor: '#ffffff', paddingVertical: 5}}>
                                <Text
                                    style={{color: '#000000'}}>{team.category.label + ' ' + team.division.label}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this._addMedia()} style={{
                            height: 30,
                            width: 30,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon size={20} type={'entypo'} name={'camera'} color={'#ffffff'}/>
                        </TouchableOpacity>
                </View>
            )
        }
    }
    _addMedia2 = async (type, postType) => {
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
                this.choiceModal(INTERVIEW_BTN, "Vidéo", this._addMedia2, this._shootMedia, 'Videos', 1);
                break;
            case 'photo':
                this.choiceModal(PHOTO_BTN, "Photo", this._addMedia2, this._shootMedia, 'Photos', 1);
                break;
            case 'simple':
                this.onToggleModal(true, TypeEnum.simple);
                break;
        }
    }

    _coachActions(action) {
        switch (action) {
            case 'interview':
                this.choiceModal(INTERVIEW_BTN, "Interview", this._addMedia2, this._shootMedia, 'Videos', 5);
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
    _renderActions() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        let type = state.currentUser.userType.label;
        if (utils._isUser(state.currentUser, state.inspectedUser)) {
           return( utils._userTABS(this.props.currentUser) && <PublishHeader tabs={utils._userTABS(this.props.currentUser)} onAction={(action) => {
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
           }}/>

        )
        } else if(state.inspectedUser.userType.label !== 'Supporter'){
            return (
                <View style={{width: width / 2, alignSelf: 'center'}}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        backgroundColor: '#003366',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        justifyContent: 'center'
                    }} onPress={() => {
                        this.toggleFollow(state.currentUser, state.inspectedUser)
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '500',
                            color: '#ffffff'
                        }}>{this._isLiked(state.currentUser, state.inspectedUser) ? 'Je suis abonné' : 'S\'abonner'}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderName() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        let team;
        let teamDisplay;
        let type = state.inspectedUser.userType.label;
        if(type !== 'Supporter') {
            team = state.inspectedUser.teams[0].team;
            teamDisplay = team.category.label + ' ' + team.division.label;
        }
        return (
            <View>
                <Text style={{textAlign: 'center', fontWeight: '600', color: '#003366', marginBottom: 5, fontSize: 16}}>
                    {state.inspectedUser.firstname} {state.inspectedUser.lastname}
                </Text>
                { type !== 'Supporter' ?
                    <Text style={{textAlign: 'center', fontSize: 14, marginBottom: 10}}>
                    {team.club.name} - {teamDisplay}
                </Text> : null}
            </View>)
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
    _renderItem(item) {
        return <Post style={[timeLineStyle.singlePost]} navigation={this.props.navigation} key={item.id} id={item.id} post={item} />
    }

    _renderList(){
        const state = this.props.navigation.state.params;
        return(
            <FlatList
                style={{marginHorizontal:10,height: '100%'}}
                ref={
                    (c) => {
                        this.flatList = c;
                    }
                }
                scrollEnabled={false}
                onRefresh={() => {}}
                refreshing={this.props.postsFetching}
                data={this.props.posts}
                renderItem={({item}) => this._renderItem(item)}
            />
        );
    }
    render() {
        const {navigation} = this.props;
        const state = navigation.state.params;

        return (
            <ScrollView contentContainerStyle={{flex:1}}>
                {this._renderHeader()}
                {this._renderModal()}
                <View style={[{paddingHorizontal: 15,paddingTop:15, backgroundColor: '#ffffff',
                    shadowOffset: {width: 210, height: 10},
                    shadowColor: 'black',
                    shadowOpacity: 1,
                    elevation: 5
                }]}>

                    {state.inspectedUser.userType.label !== 'Coach' ?
                    !utils._isUser(state.currentUser, state.inspectedUser) ?
                    <Placeholder.Paragraph
                        color="#003366"
                        textSize={14}
                        lineNumber={2}
                        lineSpacing={5}
                        lastLineWidth="50%"
                        firstLineWidth="50%"
                        marginBottom={10}
                        style={{alignSelf: 'center'}}
                        onReady={(!this.props.isFetching && this.props.done) || utils._isUser(state.currentUser, state.inspectedUser)}>
                        {
                            this.props.done && state.inspectedUser.userType.label !== 'Coach' ?
                            this.renderName() : null
                        }
                    </Placeholder.Paragraph> : this.renderName() : null}

                    {utils._isUser(state.currentUser, state.inspectedUser) && this._mediaModal()}
                    {this._renderActions()}

                </View>
                {
                    (this.props.posts && this.props.isFetched) ? this._renderList() :
                        (!this.props.postsFetching && this.props.isFetched)  ? this._renderLoading() : <Text>... </Text>
                }
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.ownerList.posts.posts,
        isFetched: state.ownerList.fetched,
        postsFetching: state.ownerList.fetching,
        inspectedUser: state.inspectedUser.user,
        isFetching: state.inspectedUser.fetching,
        done: state.inspectedUser.fetched,
        currentUser: state.currentUser.user
    };
};
export default connect(mapStateToProps)(Actus);