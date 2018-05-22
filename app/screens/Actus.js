import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet, FlatList, ActivityIndicator
} from 'react-native';
import {ImagePicker} from 'expo';

import Placeholder from 'rn-placeholder';
import {Icon} from 'react-native-elements';
import {GLOBAL_STYLE, timeLineStyle} from '../assets/css/global';
import {connect} from "react-redux";
import {userActions} from "../_actions/user";
import Post from "../components/TimeLine/Post";
import PostModal from '../components/TimeLine/Post/PostModal';
import {postActions} from "../_actions/post";
let ImageCover = null;
let {width} = Dimensions.get('window');

class Actus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modalType: '',
            profilePic: '../assets/img/thestadium/profil.jpeg',

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
            this.props.dispatch(userActions.putUser(user, result.uri)).then(
                response => {
                    this.forceUpdate();
                }
            );
        } else {

        }
    };

    _isUser(user, inspected) {
        return user.id === inspected.id;
    }

    _isLiked(user, inspected) {
        if (inspected.userType.label !== 'Coach') {
            return user.players.includes('/api/players/' + inspected.id)
        } else {
            return user.teamsLiked.includes('/api/teamsLiked' + inspected.teams[inspected.teams.length - 1].id);
        }
    }

    toggleFollow(user, inspected) {
        if (inspected.userType === 'Coach') {
            if (this._isLiked(user, inspected)) {
                user.teamsLiked.splice(user.teamsLiked.indexOf('/api/teams/' + inspected.teams[inspected.teams.length - 1].id), 1);
                this.props.dispatch(userActions.putUser(user));
            } else {
                user.teamsLiked.push('/api/teams/' + inspected.teams[0].id);
                this.props.dispatch(userActions.putUser(user));
            }
        } else {

            if (this._isLiked(user, inspected)) {
                user.players.splice(user.teamsLiked.indexOf('/api/players/' + inspected.id), 1);
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
                           source={!this.props.inspectedUser.profilepicture ? require('../assets/img/thestadium/placeholder.jpg') : {uri: this.props.inspectedUser.profilepicture}}>
                        {this._isUser(state.currentUser, state.inspectedUser) ?
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
                    </Image>
                </View>);
        } else {
            return (
                <View>
                    <Image style={{height: 250, width: width}} resizeMode={'cover'}
                           source={this.props.inspectedUser.profilepicture ? {uri: this.props.inspectedUser.profilepicture} : require('../assets/img/thestadium/placeholder.jpg')}>
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
                    </Image>
                </View>
            )
        }
    }

    _renderActions() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        let type = state.currentUser.userType.label;
        if (this._isUser(state.currentUser, state.inspectedUser)) {
            if (type === 'Joueur') {
                return (
                    <View style={{width: width / 1.25, alignSelf: 'center'}}>
                        <View style={timeLineStyle.tabContainer}>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'assists')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/assist.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Passe dé.</Text>
                            </TouchableOpacity>
                            <View style={timeLineStyle.buttonBorder}/>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'goals')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/goal.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>But</Text>
                            </TouchableOpacity>
                            <View style={timeLineStyle.buttonBorder}/>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'simple')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/post.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Publier</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            } else if (type === 'Coach')
            {
                return (
                    <View style={{width: width / 1.25, alignSelf: 'center'}}>
                        <View style={timeLineStyle.tabContainer}>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'interview')
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
                                this.onToggleModal(true, 'simple')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/post.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Publier</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={{width: width / 1.25, alignSelf: 'center'}}>
                        <View style={timeLineStyle.tabContainer}>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'simple')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/post.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Publier</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
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
        console.log(this.props)
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
        console.log(this.props.post);
        return <Post style={[timeLineStyle.singlePost]} navigation={this.props.navigation} key={item.id} id={item.id} post={item} />
    }

    _renderList(){
        const state = this.props.navigation.state.params;
        return(
            <FlatList
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
        console.log(this._isUser(state.currentUser, state.inspectedUser));
        return (
            <View>
                {this._renderHeader()}
                {this._renderModal()}
                <View style={[{padding: 15, backgroundColor: '#ffffff'}]}>
                    {!this._isUser(state.currentUser, state.inspectedUser) ?
                    <Placeholder.Paragraph
                        color="#003366"
                        textSize={14}
                        lineNumber={2}
                        lineSpacing={5}
                        lastLineWidth="50%"
                        firstLineWidth="50%"
                        marginBottom={10}
                        style={{alignSelf: 'center'}}
                        onReady={(!this.props.isFetching && this.props.done) || this._isUser(state.currentUser, state.inspectedUser)}>
                        {
                            this.props.done && state.inspectedUser.userType.label !== 'Coach' ?
                            this.renderName() : null
                        }
                    </Placeholder.Paragraph> : this.renderName()}

                    {this._renderActions()}
                    <ScrollView contentContainerStyle={{flex:1}} style={{paddingTop:10,paddingBottom: 35,paddingHorizontal:10,height:'100%'}}>
                        {
                            (this.props.posts && this.props.isFetched) ? this._renderList() :
                            (!this.props.postsFetching && this.props.isFetched)  ? this._renderLoading() : <Text>Aucun résultat trouvé </Text>
                        }
                    </ScrollView>
                </View>
            </View>
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