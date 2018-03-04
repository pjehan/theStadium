import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    TextInput
} from 'react-native';
import {Icon} from 'react-native-elements'
import LocalImage from "../Content/LocalImage/index";

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
        return (
            <Modal style={{backgroundColor: '#000000'}} animationType={"slide"} transparent={false}
                   visible={this.props.visible}
                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                <View style={{backgroundColor: '#000000', flex: 1, justifyContent: 'space-between'}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.toggleModal(false)}>
                            <Icon name='clear' color='#ffffff'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Icon type="font-awesome" name='ellipsis-h' color='#ffffff'/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{marginLeft: '10%', width: '80%', marginTop: 20, marginBottom: 20, color: '#ffffff'}}>
                        Les jeunes du club on été entrainé par l'ancien pro du club MR BIBOU
                    </Text>
                    <LocalImage source={this.props.media}/>
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
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/img/picto/actualite/comment-white.png')}
                                       resizeMode={'cover'}
                                       style={{height: 25, width: 25, marginLeft: 20, marginRight: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/img/picto/actualite/share-white.png')}
                                       resizeMode={'cover'} style={{height: 25, width: 25}}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={{height: 0.5, backgroundColor: '#ffffff', width: '100%'}}/>
                            <View style={PostStyle.userActionText}>

                                <TouchableOpacity>
                                    <Text style={PostStyle.text}>Jaime</Text>
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