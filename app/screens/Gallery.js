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
import OpenContent from '../components/TimeLine/Post/OpenContent';
import {Icon} from 'react-native-elements';
import {ImagePicker} from 'expo';
import utils from "../config/utils";
import {connect} from "react-redux";

let importedMedai = null;
let gallery = [
    {media: 'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}
];

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openContent: false,
            actualImg: null,
        };
        this.onToggleModal = this.onToggleModal.bind(this);
    }

    componentWillMount() {

    }

    onToggleModal(visible, img) {
        this.setState({openContent: visible});
        img ? this.setState({actualImg: img}) : '';
        this.forceUpdate();
    }

    _addMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (!result.cancelled) {
            gallery.push({media: result.uri});
            this.forceUpdate();
        }
    };


    render() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        if (state.inspectedUser.userType) {
            let team;
            let type = state.inspectedUser.userType ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
            if (type !== 'Supporter') {
                team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
            }
            let user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;
            let {width} = Dimensions.get('window');
            return (
                <View style={{backgroundColor: '#ffffff', flex: 1, flexDirection: 'row'}}>

                    {utils._isUser(state.currentUser, state.inspectedUser) ?

                        <TouchableOpacity onPress={() => this._addMedia()} style={{
                            backgroundColor: '#333333',
                            width: width / 4,
                            height: width / 4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon size={40} name={'camera'} type={'entypo'} color={'#ffffff'}/>
                            <Text style={{color: '#ffffff', textAlign: 'center'}}>Ajoutez une photo</Text>
                        </TouchableOpacity> : null}
                    {gallery.map((i, index) => (
                        <TouchableOpacity onPress={() => {
                            this.onToggleModal(true, i.media);
                        }}>
                            <Image style={{height: width / 4, paddingLeft: 1, paddingRight: 1, width: width / 4}}
                                   source={{uri: i.media}} resizeMode={'cover'}/>
                        </TouchableOpacity>
                    ))}
                </View>
            )
        } else {
            return (<View></View>)
        }
    }
};

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
export default connect(mapStateToProps)(Gallery);