import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native';
import {ImagePicker} from 'expo';
import {Icon} from 'react-native-elements';
import {GLOBAL_STYLE, timeLineStyle} from '../assets/css/global';
import {connect} from "react-redux";
import {postActions} from "../_actions/post";

const STYLE = StyleSheet.create({
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between',
        height: 50,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    tabText: {
        color: '#003366',
        fontWeight: '700'
    },
    even: {
        backgroundColor: '#dddddd',
    },
});
let ImageCover = null;
let {width} = Dimensions.get('window');

class Actus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePic: '../assets/img/thestadium/profil.jpeg',
        }
    }
    componentWillMount() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        //if(state.inspectedUser){this.props.dispatch(postActions.getOwnerList(state.id));}
    }
    _addMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (!result.cancelled) {
            this.setState({profilePic: result.uri})
            this.forceUpdate();
        } else {

        }
    };
    _isUser(user, inspected){
        return user.id === inspected.id;
    }

    _isLiked(user, inspected){
        return user.players.includes('/api/players/' + inspected.id);
    }
    toggleFollow(){

    }
    _renderHeader() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        let type = state.inspectedUser ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
        if (type === 'Joueur') {
            return (
                <View>
                    <Image style={{height: 250, width: width}} resizeMode={'cover'}
                           source={{uri: this.state.profilePic}}>
                        {this._isUser(state.currentUser, state.inspectedUser) ?
                        <TouchableOpacity onPress={() => this._addMedia()} style={{
                            height: 30,
                            width: 30,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            justifyContent:'center',
                            alignItems:'center',
                        }}>
                            <Icon size={20} type={'entypo'} name={'camera'} color={'#ffffff'}/>
                        </TouchableOpacity>: null}
                    </Image>
                </View>);
        } else {
            return (
                <View>
                    <Image style={{height: 250, width: width}} resizeMode={'cover'}
                           source={{uri: this.state.profilePic}}>
                        <View style={{
                            height: 250,
                            width: width / 2.5,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <Image style={{height: 100, width: 100}} resizeMode={'cover'}
                                   source={{uri: this.state.profilePic}}/>
                            <Text style={{color:'#ffffff', fontWeight:'700',marginVertical:5}}>Fc Guichen</Text>
                            <View style={{paddingHorizontal:10 ,backgroundColor: '#ffffff', paddingVertical:5}}>
                                <Text style={{color: '#000000'}}>Sénior F3</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this._addMedia()} style={{
                            height: 30,
                            width: 30,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            right: 0,
                            bottom: 0
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
        let type = 0;
        if(this._isUser(state.currentUser, state.inspectedUser)) {
            if (type === 1) {
                return (
                    <View style={{width: width / 1.25}}>
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
            } else {
                return (
                    <View style={{width: width / 1.25}}>
                        <View style={timeLineStyle.tabContainer}>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'interview')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/assist.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Interview</Text>
                            </TouchableOpacity>
                            <View style={timeLineStyle.buttonBorder}/>
                            <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                                this.onToggleModal(true, 'article')
                            }}>
                                <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                                       source={require('../assets/img/picto/menu/actions/goal.png')}/>
                                <Text style={timeLineStyle.tabButtonText}>Article</Text>
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
        }else {
            return (
                <View style={{width: width / 2}}>
                    <TouchableOpacity style={{alignItems:'center',backgroundColor:'#003366', paddingVertical:10,paddingHorizontal:10,justifyContent:'center'}} onPress={() => {this.toggleFollow()}}>
                        <Text style={{fontSize:18, fontWeight:'500',color:'#ffffff'}}>{this._isLiked(state.currentUser, state.inspectedUser) ? 'Je suis abonné' : 'S\'abonner'}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    test() { const {navigation} = this.props;
        const state = navigation.state.params;

        let team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        let teamDisplay = team.category.label + ' ' + team.division.label;
        return (
            <View><Text style={{fontSize: 14, marginBottom: 10}}>{team.club.name} - {teamDisplay}</Text>{this._renderActions()}</View>)
    }
    render() {
        const {navigation} = this.props;
        const state = navigation.state.params;

        return (
            <View>
                {!this.props.isFetching || state.inspectedUser.userType ? this._renderHeader() : null}
                <View style={[{padding: 15}, GLOBAL_STYLE.whiteColorBG]}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>
                        {state.inspectedUser.firstname} {state.inspectedUser.lastname}
                    </Text>

                    {!this.props.isFetching || state.inspectedUser.userType ? this.test() : state.inspectedUser.teams ? this.test() :null}
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.ownerList.posts,
        inspectedUser: state.inspectedUser.user,
        isFetching: state.inspectedUser.fetching,
        currentUser: state.currentUser.user
    };
};
export default connect(mapStateToProps)(Actus);