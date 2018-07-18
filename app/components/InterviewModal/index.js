import React, {Component} from 'react';
import {
    Modal,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import CustomInput from "../CustomInput";
import {Video} from "expo";
import {postActions} from "../../_actions/post";
import {connect} from "react-redux";

class InterviewModal extends Component {
    constructor(props) {
        super(props);
        this._publishInterview = this._publishInterview.bind(this);
    }

    _publishInterview() {
        if (this.props.media) {
            this.props.dispatch(postActions.add(this.props.currentUser.id, {
                postType: 5,
                title: this.state.title
            }, this.props.media));
            this.props.media = null;

            this.onClose();
        }
    }

    onClose(){
        this.props.onClose();
    }

    render() {
        if (this.props.media) {
            let originalWidth;
            let originalHeight;
            let windowWidth = Dimensions.get('window').width;
            let widthChange;
            originalWidth = this.props.media.width;
            originalHeight = this.props.media.height;
            widthChange = (windowWidth - 10) / originalWidth;
            return (
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={this.props.interviewVisible}
                    onRequestClose={() => {
                        console.log('close modal')
                    }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        backgroundColor: '#00000040'
                    }}>
                        <View style={{backgroundColor: '#ffffff', width: '90%'}}>
                            <View style={{
                                borderBottomWidth: 1,
                                paddingVertical: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{fontWeight: "bold", color: '#003366', fontSize: 16}}>
                                    Interview
                                </Text>
                            </View>
                            <CustomInput
                                container={{justifyContent: 'flex-start'}}
                                placeholder={'Donnez un titre à votre interview'}
                                input={[{
                                    borderWidth: 1,
                                    padding: 5,
                                    margin: 10,
                                }]}
                                state={'title'}
                                textColor={'#000000'}
                                placeholderTextColor={'#cccccc'}
                                borderColor={'#cccccc'}
                                backgroundColor={'#ffffff'}
                                security={false}
                                onChangeParent={(state, newvalue) => {
                                    this.onChangeInfos(state, newvalue)
                                }}/>
                            <Video source={{uri: this.props.media.uri}}
                                   rate={1.0}
                                   volume={0}
                                   muted={true}
                                   resizeMode="cover"
                                   shouldPlay
                                   isLooping
                                   style={{width: originalWidth * widthChange, height: originalHeight * widthChange}}
                            />

                            <View style={{borderTopWidth: 1, flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={{justifyContent: 'center', alignItems: 'center', width: '50%', padding: 10}}
                                    onPress={() => {
                                        this.props.media = null;
                                        this.onClose();
                                    }}>
                                    <Text>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._publishInterview()}
                                                  style={{
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      width: '50%',
                                                      padding: 10,
                                                      borderLeftWidth: 1
                                                  }}>
                                    <Text style={{fontWeight: 'bold', color: '#003366'}}>Publier</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
        else {return null;
        }
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
    };
};
export default connect(mapStateToProps)(InterviewModal);
