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

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openContent:false,
        };
        this.onToggleModal = this.onToggleModal.bind(this);
    }

    onToggleModal(visible, img) {
        this.setState({openContent: visible});
        img ? this.setState({actualImg: img}) : '';
        this.forceUpdate();
    }
    render() {
        let {width} = Dimensions.get('window');
        return (
            <View style={{backgroundColor:'#ffffff', flexDirection:'row'}}>
                <OpenContent owner={{
                    lastName: 'Segara',
                    firstName: 'Sophie'
                }} visible={this.state.openContent}
                           toggleModal={(visible) => {
                               this.onToggleModal(visible)
                           }}/>
                <TouchableOpacity style={{backgroundColor:'#333333', width:width/4, height: width/4}}>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.onToggleModal(true, 'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg');
                }}>
                    <Image style={{height:width/4,paddingLeft:1,paddingRight:1, width:width/4}} source={{uri:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}} resizeMode={'cover'} />
                </TouchableOpacity>
            </View>
        )
    }
};
