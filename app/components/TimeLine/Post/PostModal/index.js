import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    ScrollView, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import {TypeEnum} from "../contentType";
import Spinner from 'react-native-number-spinner';
import CustomInput from '../../../CustomInput';
import {GLOBAL_STYLE} from '../../../../assets/css/global';
import {ImagePicker} from 'expo';
import {postActions} from "../../../../_actions";
import {connect} from "react-redux";

let ModalContent;
const timeLineStyle = StyleSheet.create({
    tabContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        width: '100%',
        height: 40
    },
    tabButton: {
        backgroundColor: 'white',
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonText: {
        color: '#003366',
        fontWeight: '400',
    },
    tabButtonPicto: {
        height: 15,
        width: 15,
        marginRight: 5
    },
    buttonBorder: {
        alignSelf: 'center',
        height: '70%',
        width: 1,
        backgroundColor: '#cccccc'
    },
    singlePost: {
        marginBottom: 200
    }, profilePic: {
        width: 45,
        height: 45,
        borderRadius: 45,
        marginRight: 5
    },
    text: {
        color: 'black',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
});
let SelectedMedia = <View/>;

class PostModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                title:'',
                goalsNbr: 0,
                passNbr: 0,
                content:'',
                postType: null,
            },

            medias: '',
            goals_assists: false,

        };
        this.displayGoalsAssists = this.displayGoalsAssists.bind(this);
        this.displaySimpleArticle = this.displaySimpleArticle.bind(this);
        this.onChangeInfos = this.onChangeInfos.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.publishModal = this.publishModal.bind(this);
    }

    onChangeInfos(state, newvalue) {
        this.setState({post:{...this.state.post,[state]: newvalue}});
    }

    toggleModal(visible, type) {
        this.props.toggleModal(visible, type);
    }

    publishModal(type) {
        let post = this.state.post;
        post.postType = type;
        this.props.dispatch(postActions.add(this.props.owner.id, post));
        //TODO when dispatch is good toggle modal
        this.toggleModal(false, type);
    }

    componentWillMount() {
        console.log(this.props)
        switch (this.props.type) {
            case TypeEnum.goals:
                this.displayGoalsAssists(TypeEnum.goals);
                break;
            case TypeEnum.assists:
                this.displayGoalsAssists(TypeEnum.assists);
                break;
            case TypeEnum.simple:
                this.displaySimpleArticle(TypeEnum.simple);
                break;
            case TypeEnum.article:
                this.displayArticle(TypeEnum.article);
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        switch (this.props.type) {
            case TypeEnum.goals:
                this.displayGoalsAssists(TypeEnum.goals);
                break;
            case TypeEnum.assists:
                this.displayGoalsAssists(TypeEnum.assists);
                break;
            case TypeEnum.simple:
                this.displaySimpleArticle(TypeEnum.simple);
                break;
            case TypeEnum.article:
                this.displayArticle(TypeEnum.article);
                break;
        }
        this.forceUpdate();
    }

    displayGoalsAssists(type) {
        let Title;
        let Description;
        let Label;
        if (type === TypeEnum.goals) {
            Title = 'But';
            Description = 'Vous avez changé le cours du match !';
            Label = 'Nombre de but(s) marqué(s)';
        } else {
            Title = 'Passe décisive';
            Description = 'Vous avez mis en valeur votre coéquipier(e) grâce à une passe';
            Label = 'Nombre de passe(s) décisive(s)';
        }
        ModalContent = (
            <View>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: '#cccccc',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: 40
                }}>
                    <TouchableOpacity onPress={() => {
                        this.toggleModal(false, type)
                    }}>
                        <Text>Annuler</Text>
                    </TouchableOpacity>
                    <Text style={{fontWeight: '600'}}>{Title}</Text>
                    <TouchableOpacity onPress={() => {
                        this.publishModal(type)
                    }}>
                        <Text style={{fontWeight: '600', color: '#003366'}}>Publiez</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingLeft: 20, paddingRight: 20}}>
                    <View style={[GLOBAL_STYLE.modal, {alignItems: 'center'}]}>
                        <View
                            style={[timeLineStyle.ownerStyle, {flexDirection: 'row', marginTop: 20, marginBottom: 20}]}>
                            <Image style={timeLineStyle.profilePic}
                                   source={require('../../../../assets/img/TA-Rennes.jpg')}/>
                            <Text
                                style={timeLineStyle.title}>{this.props.owner.firstname + '\n' + this.props.owner.lastname}</Text>
                        </View>
                        <Text style={GLOBAL_STYLE.text}>{Description}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 40, marginBottom: 40}}>
                        <Text style={{marginRight: 20}}>{Label}</Text>
                        <Spinner max={99}
                                 min={1}
                                 default={1}
                                 color="#f60"
                                 numColor="#f60"
                                 onNumChange={(num) => {
                                     this.setState({post:{...this.state.post,[type]: num}})
                                 }}/>
                    </View>
                    <CustomInput
                        container={''}
                        placeholder={'L\' équipe que vous avez affronté'}
                        input={[GLOBAL_STYLE.input, {marginBottom: 10}]}
                        description={'Ecrivez le nom complet de l\' équipe \nEx: CPB Bréquigny'}
                        state={'club'}
                        textColor={'#000000'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        security={false}
                        onChangeParent={(state, newvalue) => {
                            this.onChangeInfos(state, newvalue)
                        }}
                    />

                </View>
        </View>
        )
    }

    displaySimpleArticle(type) {
        ModalContent = (
            <ScrollView style={{flex: 1, justifyContent: 'space-between'}}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: '#cccccc',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: 40
                }}>
                    <TouchableOpacity onPress={() => {
                        this.toggleModal(false, type)
                    }}>
                        <Text>Annuler</Text>
                    </TouchableOpacity>
                    <Text style={{fontWeight: '600'}}>Post</Text>
                    <TouchableOpacity onPress={() => {
                        this.publishModal(type)
                    }}>
                        <Text style={{fontWeight: '600', color: '#003366'}}>Publiez</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
                    <View style={[GLOBAL_STYLE.modal, {alignItems: 'center'}]}>
                        <View
                            style={[timeLineStyle.ownerStyle, {flexDirection: 'row', marginTop: 20, marginBottom: 20}]}>
                            <Image style={timeLineStyle.profilePic}
                                   source={require('../../../../assets/img/TA-Rennes.jpg')}/>
                            <Text
                                style={timeLineStyle.title}>{this.props.owner.firstname + '\n' + this.props.owner.lastname}</Text>
                        </View>
                        <Text style={GLOBAL_STYLE.text}>Partager en toute simplicié</Text>
                    </View>

                </View>
                <CustomInput multiple={true}
                             container={{flex: 3, justifyContent: 'flex-start'}}
                             placeholder={'Écrivez votre message'}
                             input={[{flex: 1, padding: 20, marginTop: 10}]}
                             state={'content'}
                             textColor={'#000000'}
                             borderColor={'transparent'}
                             backgroundColor={'#ffffff'}
                             security={false}
                             onChangeParent={(state, newvalue) => {
                                 this.onChangeInfos(state, newvalue)
                             }}/>
                <View>
                    {SelectedMedia}

                </View>
                <View >
                    <TouchableOpacity onPress={() => {
                        this.toggleModal(true, TypeEnum.goals)
                    }} style={{
                        borderColor: '#cccccc',
                        borderTopWidth: 0.5,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                        <Image style={{marginLeft: 20, marginRight: 20, height: 20, width: 20}} resizeMode={'contain'}
                               source={require('../../../../assets/img/picto/menu/actions/goal.png')}/>
                        <Text style={{color: 'green'}}>Partagez un But</Text>
                        <Text style={{marginRight: 20}}> > </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.toggleModal(true, TypeEnum.assists)
                    }} style={{
                        borderColor: '#cccccc',
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                        <Image style={{marginLeft: 20, marginRight: 20, height: 20, width: 20}} resizeMode={'contain'}
                               source={require('../../../../assets/img/picto/menu/actions/assist.png')}/>
                        <Text style={{color: 'green'}}>Partagez une Passe Décisive</Text>
                        <Text style={{marginRight: 20}}> > </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this._addMedia();
                    }} style={{
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                        <Image style={{marginLeft: 20, marginRight: 20, height: 20, width: 20}} resizeMode={'contain'}
                               source={require('../../../../assets/img/picto/menu/actions/photo.png')}/>
                        <Text style={{color: '#003366'}}>Ajoutez une photo</Text>
                        <Text style={{marginRight: 20}}> > </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>);
    }

    displayArticle(type) {
        ModalContent = (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: '#cccccc',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: 40
                }}>
                    <TouchableOpacity onPress={() => {
                        this.toggleModal(false, type)
                    }}>
                        <Text>Annuler</Text>
                    </TouchableOpacity>
                    <Text style={{fontWeight: '600'}}>Post</Text>
                    <TouchableOpacity onPress={() => {
                        this.publishModal(type)
                    }}>
                        <Text style={{fontWeight: '600', color: '#003366'}}>Publiez</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    render() {
        return (
        <Modal animationType={"slide"} transparent={false}
                visible={this.props.visible}

                onRequestClose={() => {
                    console.log("Modal has been closed.")
                }}>
        {ModalContent}
        </Modal>
        )
    }
    renderImage(result, callback) {
            let originalWidth = result.width;
            let originalHeight = result.height;
            let windowWidth = null || Dimensions.get('window').width;
            let widthChange = null || (windowWidth - 10) / originalWidth;
            SelectedMedia = (<Image source={{uri: result.uri}} style={{marginLeft:5,width: originalWidth * widthChange, height: originalHeight * widthChange}}/>);
            this.displaySimpleArticle(TypeEnum.simple);
            this.forceUpdate();
        }
    _addMedia = async () =>{
        let result =  await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
    });

        if (!result.cancelled) {
        this.setState({medias:result.uri});
        console.log(result, this.state.medias);
            this.renderImage(result, this.displaySimpleArticle(TypeEnum.simple));

    } else {
        console.log('uri', result.uri, this.state.post.medias[0])
    }
    };
    }
        /**
         * Props
         */
    PostModal.propTypes = {
        owner: PropTypes.object,
        /* visible or not */
        type: PropTypes.string, /* Content Type */
    };
    export default connect()(PostModal);