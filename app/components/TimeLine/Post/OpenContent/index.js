import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    TextInput, Dimensions
} from 'react-native';
import {Icon} from 'react-native-elements'
import LocalImage from "../Content/LocalImage/index";
import {utils as _utils} from "../../../../_constants/utils";

const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius: 45,
        marginRight: 5
    },
    text: {
        color: 'white',
        fontSize: 14
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
    userAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    ownerStyle: {
        flexDirection: 'row',
        padding: 5,
    },
    userActionText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: '10%',
        padding: 10,
    },
    actionText: {
        fontSize: 12
    },
    teamText: {
        color: "white",
        fontSize: 12
    },
    teamBackground: {
        backgroundColor: '#003366',
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    timeText: {
        fontSize: 12,
        color: '#cccccc',
        fontWeight: '500',
        marginLeft: 2
    },
    assist_and_goals: {
        backgroundColor: '#00A65B',
    }
});

class OpenContent extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(visible) {
        this.props.toggleModal(visible);
    }

    render() {
        let originalWidth;
        let originalHeight;
        let widthChange;
        let windowWidth = Dimensions.get('window').width;
        if (this.props.medias && this.props.medias.length > 0) {
            url = this.props.medias[0].path;
            originalWidth = this.props.medias[0].width;
            originalHeight = this.props.medias[0].height;
            widthChange = (windowWidth - 10) / originalWidth;
            this.props.medias[0].path = this.props.medias[0].path.replace(new RegExp(/\\/g), "/");
            this.props.medias[0].path = this.props.medias[0].path.replace('public/', '');
        }
        return (
            <Modal style={{backgroundColor: '#000000'}} animationType={"slide"} transparent={false}
                   visible={this.props.visible}
                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                <View style={{backgroundColor: '#000000', flex: 1, justifyContent: 'space-between'}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity style={{marginLeft:10,marginTop:10}} onPress={() => this.toggleModal(false)}>
                            <Icon name='clear' color='#ffffff'/>
                        </TouchableOpacity>
                        <TouchableOpacity  style={{marginRight:10,marginTop:10}} onPress={() => {
                        }}>
                            <Icon type="font-awesome" name='ellipsis-h' color='#ffffff'/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{marginLeft: '10%', width: '80%', marginTop: 20, marginBottom: 20, color: '#ffffff'}}>
                        {this.props.content}
                    </Text>
                    {this.props.media.length > 0 ? <Image source={{uri: _utils.NODEJS + this.props.medias[0].path}}
                           style={{
                               width: originalWidth * widthChange,
                               height: originalHeight * widthChange
                           }}/> :null }
                    <View style={{ justifyContent: 'space-around', height: '20%'}}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10, marginBottom: 10
                        }}>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/img/picto/actualite/notlike.png')}
                                       resizeMode={'contain'} style={{height: 25, width: 25}}/>
                                <Text style={{color:'#ffffff', textAlign:'center'}}>{this.props.like}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/img/picto/actualite/comment-white.png')}
                                       resizeMode={'cover'}
                                       style={{height: 25, width: 25, marginLeft: 20, marginRight: 20}}/>
                                <Text style={{textAlign:'center',color:'#ffffff'}}>{this.props.comments}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/img/picto/actualite/share-white.png')}
                                       resizeMode={'cover'} style={{height: 25, width: 25}}/>
                                <Text style={{color:'#ffffff', textAlign:'center'}}>{this.props.share}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={{height: 0.5, backgroundColor: '#ffffff', width: '100%'}}/>
                            <View style={PostStyle.userActionText}>

                                <TouchableOpacity>
                                    <Text style={PostStyle.text}>J'aime</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={[PostStyle.text, {marginLeft: 5, marginRight: 5}]}>Commenter</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={PostStyle.text}>Partager</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default OpenContent;