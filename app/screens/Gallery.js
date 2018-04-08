import React, { Component } from 'react';
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

let importedMedai = null;
let gallery = [
    {media: 'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}
]

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openContent:false,
            actualImg: null,
        };
        this.onToggleModal = this.onToggleModal.bind(this);
    }

    componentWillMount(){

    }

    onToggleModal(visible, img) {
        this.setState({openContent: visible});
        img ? this.setState({actualImg: img}) : '';
        this.forceUpdate();
    }
    _addMedia = async () =>{
        let result =  await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (!result.cancelled) {
            gallery.push({media:result.uri});
            this.forceUpdate();
        } else {
            console.log('uri', result.uri, this.state.media.uri)
        }
    };
    render() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        if(state.inspectedUser.userType){
        let type = state.inspectedUser.userType ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
        let team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        let user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;
        let {width} = Dimensions.get('window');
        return (
            <View style={{backgroundColor:'#ffffff',flex:1, flexDirection:'row'}}>
                <OpenContent owner={{
                    lastName: type === 'Joueur' ? this.props.inspectedUser.lastname || state.inspectedUser.lastname : team.category.label + ' ' + team.division.label,
                    firstName: type === 'Joueur' ? this.props.inspectedUser.firstname || state.inspectedUser.firstname : team.category.label + ' ' + team.division.label
                }} visible={this.state.openContent}
                             media={this.state.actualImg}
                             toggleModal={(visible) => {
                                 this.onToggleModal(visible)
                             }}/>
                <TouchableOpacity onPress={() => this._addMedia()} style={{backgroundColor:'#333333', width:width/4, height: width/4, justifyContent:'center', alignItems:'center'}}>
                    <Icon size={40} name={'camera'} type={'entypo'} color={'#ffffff'} />
                    <Text style={{color: '#ffffff', textAlign:'center'}}>Ajoutez une photo</Text>
                </TouchableOpacity>
                {gallery.map((i, index) => (
                <TouchableOpacity onPress={() => {
                    this.onToggleModal(true, i.media);
                }}>
                    <Image style={{height:width/4,paddingLeft:1,paddingRight:1, width:width/4}} source={{uri:i.media}} resizeMode={'cover'} />
                </TouchableOpacity>
                    ))}
            </View>
        )}else{
            return (<View></View>)
        }
    }
};
