    import React, {Component} from 'react';
import {StyleSheet, FlatList, Image, Text, View, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';

import {GLOBAL_STYLE, timeLineStyle} from '../assets/css/global';
import Post from '../components/TimeLine/Post';
import PostModal from '../components/TimeLine/Post/PostModal';
import {connect} from 'react-redux';
import {postActions} from '../_actions';
import {TypeEnum} from "../components/TimeLine/Post/contentType/index";
import {ImagePicker} from "expo";


let postList;
let Modal = null;


class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalType: '',
        };
        this.onToggleModal = this.onToggleModal.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderList = this._renderList.bind(this);
        this._renderModal = this._renderModal.bind(this);
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

    _add = async () => {
       const result = ImagePicker.launchImageLibraryAsync({});
       console.log(result);
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
                <PostModal owner={this.props.currentUser} type={this.state.modalType} visible={this.state.modalVisible}
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
        return (<View style={[timeLineStyle.tabContainer, {
            shadowOffset: {width: 210, height: 10},
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: 5
        }]}><TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
            this._add();
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
            <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
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
        console.log(this.props)
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>
                {this._renderModal()}
                {this.props.currentUser.userType.label === "Joueur" ? this._renderPlayerHeader() : this.props.currentUser.userType.label === 'Coach' ? this._renderCoachHeader() : null}
                <ScrollView contentContainerStyle={{flex: 1}}
                            style={{paddingTop: 10, paddingBottom: 35, paddingHorizontal: 10, height: '100%'}}>
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