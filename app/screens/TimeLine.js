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
    _renderItem(item) {
        return <Post style={timeLineStyle.singlePost} key={this.props.posts.posts.indexOf(item)} id={this.props.posts.posts.indexOf(item)} post={item} />
    }

    _renderList(){
        const {posts} = this.props;

        return(
            <FlatList
                style={{padding: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 35}}
                data={posts.posts}
                renderItem={({item}) => this._renderItem(item)}
            />
        );
    }

    _renderModal() {
        if(this.state.modalVisible && this.state.modalType){
            return (<PostModal owner={{
                lastName: 'Segara',
                firstName: 'Sophie'
            }} type={this.state.modalType} visible={this.state.modalVisible}
                               toggleModal={(visible, type) => {
                                   this.onToggleModal(visible, type)
                               }}/>)
        } else {
            return null;
        }
    }

    render() {
        const {posts} = this.props;
        console.log(posts.posts)
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>
                {this._renderModal()}
                <View style={timeLineStyle.tabContainer}>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {
                        this.onToggleModal(true, 'assists')
                    }}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain'
                               source={require('../assets/img/picto/menu/actions/assist.png')}/>
                        <Text style={timeLineStyle.tabButtonText}>Passe dé.</Text>
                    </TouchableOpacity>
                    <View style={timeLineStyle.buttonBorder} />
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
                <ScrollView style={{padding: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 35, height:'95%'}}>
                    {this._renderList()}
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