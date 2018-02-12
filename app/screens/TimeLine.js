import React, {Component} from 'react';
import {StyleSheet,FlatList, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import {GLOBAL_STYLE,timeLineStyle} from '../assets/css/global';
import Post from '../components/TimeLine/Post';
import PostModal from '../components/TimeLine/Post/PostModal';
import {connect} from 'react-redux';
import {postActions} from '../_actions';


let postList ;
let Modal = null;


class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalType: '',
        };
        this.onToggleModal = this.onToggleModal.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderList = this.renderList.bind(this);
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
    renderItem(item) {
       return <Post style={timeLineStyle.singlePost} key={item.id} post={item} />
    }
    renderList() {
        return (
            <FlatList
                data={this.props.posts.posts}
                renderItem={({item}) => this.renderItem(item)}
            />
        );
    }

    render() {
        const {posts} = this.props;
        console.log(posts.posts)
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>
                <PostModal owner={{
                    lastName: 'Segara',
                    firstName: 'Sophie'
                }} type={this.state.modalType} visible={this.state.modalVisible}
                           toggleModal={(visible, type) => {
                               this.onToggleModal(visible, type)
                           }}/>
                <View style={timeLineStyle.tabContainer}>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                        this.onToggleModal(true, 'assists')
                    }}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                               source={require('../assets/img/picto/menu/actions/assist.png')}/>
                        <Text style={timeLineStyle.tabButtonText}>Passe dé.</Text>
                    </TouchableOpacity>
                    <View style={timeLineStyle.buttonBorder}></View>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                        this.onToggleModal(true, 'goals')
                    }}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                               source={require('../assets/img/picto/menu/actions/goal.png')}/>
                        <Text style={timeLineStyle.tabButtonText}>But</Text>
                    </TouchableOpacity>
                    <View style={timeLineStyle.buttonBorder}></View>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                        this.onToggleModal(true, 'simple')
                    }}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                               source={require('../assets/img/picto/menu/actions/post.png')}/>
                        <Text style={timeLineStyle.tabButtonText}>Publier</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{padding: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 35}}>
                    {this.renderList()}
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.postList.posts,
        postsFetched: state.postList.fetched,
    };
};
export default connect(mapStateToProps)(TimeLine);