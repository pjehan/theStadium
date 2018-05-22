import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    ScrollView, Dimensions, AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import {TypeEnum} from "../contentType";
import Spinner from 'react-native-number-spinner';
import CustomInput from '../../../CustomInput';
import {GLOBAL_STYLE} from '../../../../assets/css/global';
import {ImagePicker} from 'expo';
import {postActions} from "../../../../_actions";
import {connect} from "react-redux";
import Autocomplete from "react-native-autocomplete-input";

let ModalContent;
let SelectedMedia = <View/>;

let originalWidth = null;
let originalHeight = null;
let windowWidth = null;
let widthChange = null;
const InitialState = {
    post: {
        title: '',
        goalsNbr: 0,
        passNbr: 0,
        content: '',
        postType: null,
    },
    clubList: null,
    clubQuery: '',
    hideClub: false,
    medias: null,
    height: 50,
    goals_assists: false,

}

class PostModal extends Component {
    constructor(props) {
        super(props);

        this.state = InitialState;
        this.displayGoalsAssists = this.displayGoalsAssists.bind(this);
        this.displaySimpleArticle = this.displaySimpleArticle.bind(this);
        this.onChangeInfos = this.onChangeInfos.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.publishModal = this.publishModal.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderOwner = this._renderOwner.bind(this);
        this.coverPhoto = this.coverPhoto.bind(this);
        this._addMedia = this._addMedia.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.conditionalRender = this.conditionalRender.bind(this);
        this.coverVideo = this.coverVideo.bind(this);
    }

    onChangeInfos(state, newvalue) {
        this.setState({post: {...this.state.post, [state]: newvalue}});
    }

    toggleModal(visible, type) {
        this.props.toggleModal(visible, type);
        this.setState(InitialState);
        this.forceUpdate();
    }

    publishModal(type) {
        let post = this.state.post;
        switch (type) {
            case TypeEnum.goals:
                post.postType = 1;
                break;
            case TypeEnum.simple:
                post.postType = 2;
                break;
            case TypeEnum.article:
                post.postType = 3;
                break;
            case TypeEnum.assists:
                post.postType = 4;
                break;
            case TypeEnum.interview:
                post.postType = 5;
                break;
        }
        post.goalsNbr = this.state.goals;
        post.passNbr = this.state.assists;
        this.props.dispatch(postActions.add(this.props.owner.id, post, this.state.medias));
        //TODO when dispatch is good toggle modal
        this.toggleModal(false, type);
    }

    componentWillMount() {
        AsyncStorage.getItem('clubList').then(
            value => {
                this.setState({clubList: JSON.parse(value)});
                this.forceUpdate()
            });
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
            case TypeEnum.interview:
                this.displayInterview(TypeEnum.interview);
                break;
        }
    }

    conditionalRender() {
        switch (this.props.type) {
            case TypeEnum.goals:
                return this.displayGoalsAssists(TypeEnum.goals);
            case TypeEnum.assists:
                return this.displayGoalsAssists(TypeEnum.assists);
            case TypeEnum.simple:
                return this.displaySimpleArticle(TypeEnum.simple);
            case TypeEnum.article:
                return this.displayArticle(TypeEnum.article);
            case TypeEnum.interview:
                return this.displayInterview(TypeEnum.interview);
        }
    }

    _filterClub(query, dataSource) {
        if (query === '') {
            return [];
        }
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if (data) {
            return data.filter(data => data.name.search(regex) >= 0);
        }
    }

    _setClub(item) {
        this.setState({
            clubQuery: item.name,
            club: item.name,
            post: {content: item.name},
            hideClub: true,
        });
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
            case TypeEnum.interview:
                this.displayInterview(TypeEnum.interview);
                break;
        }
        this.forceUpdate();
    }

    _renderHeader(type, Title) {
        return (
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
        )
    }

    _renderOwner() {

        return (
            <View
                style={[timeLineStyle.ownerStyle, {flexDirection: 'row', marginTop: 20, marginBottom: 20}]}>
                {this.props.owner.userType.label !== 'Coach' && !this.props.owner.profilepicture || !this.props.owner.teams[0].team.profilePicture ?
                    <Image style={timeLineStyle.profilePic}
                           source={{uri: this.props.owner.userType.label !== 'Coach' ? this.props.owner.profilepicture : this.props.owner.teams[0].team.profilePicture}}/> :
                    <View style={[timeLineStyle.profilePic, {backgroundColor: '#cccccc'}]}/>}
                {this.props.owner.userType.label === 'Joueur' ? <Text
                        style={timeLineStyle.title}>{this.props.owner.firstname + '\n' + this.props.owner.lastname}</Text> :
                    <View>
                        <Text style={timeLineStyle.title}>{this.props.owner.teams[0].team.club.name}</Text>
                        <Text style={{
                            paddingVertical: 2,
                            paddingHorizontal: 5,
                            fontSize: 10,
                            backgroundColor: '#003366',
                            color: '#ffffff',
                            marginRight: 10
                        }}>{this.props.owner.teams[0].team.category.label} {this.props.owner.teams[0].team.division.label}</Text>
                    </View>}
            </View>
        )
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
        return (
            <View>
                {this._renderHeader(type, Title)}
                <View style={{paddingLeft: 20, paddingRight: 20}}>
                    <View style={[GLOBAL_STYLE.modal, {alignItems: 'center'}]}>
                        {this._renderOwner()}
                        <Text style={GLOBAL_STYLE.text}>{Description}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 40, marginBottom: 40}}>
                        <Text style={{marginRight: 20}}>{Label}</Text>
                        <Spinner max={99}
                                 min={1}
                                 default={1}
                                 color="#003366"
                                 numColor="#003366"
                                 onNumChange={(num) => {
                                     this.setState({[type]: num});
                                     console.log(this.state)
                                 }}/>
                    </View>


                </View>
            </View>
        )
    }

    displaySimpleArticle(type) {
        return (
            <ScrollView>
                {this._renderHeader(type, 'Publiez')}
                <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
                    <View style={[GLOBAL_STYLE.modal, {alignItems: 'center'}]}>
                        {this._renderOwner()}
                        <Text style={GLOBAL_STYLE.text}>Partager en toute simplicié</Text>
                    </View>

                </View>
                <CustomInput multiple={true}
                             container={{justifyContent: 'flex-start'}}
                             placeholder={'Écrivez votre message'}
                             input={[{flex: 1, padding: 20, marginTop: 10, height: Math.max(80, this.state.height)}]}
                             state={'content'}
                             textColor={'#000000'}
                             borderColor={'transparent'}
                             backgroundColor={'#ffffff'}
                             security={false}
                             onChangeSizeParent={(size) => {
                                 this.setState({height: size})
                             }}
                             onChangeParent={(state, newvalue) => {
                                 this.onChangeInfos(state, newvalue)
                             }}/>
                <View>
                    {this.state.medias ? this.renderImage() : null}

                </View>
                <View>
                    {this.props.owner.userType.label === 'Joueur' ?
                        <View>
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

                                <Image style={{marginLeft: 20, marginRight: 20, height: 20, width: 20}}
                                       resizeMode={'contain'}
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

                                <Image style={{marginLeft: 20, marginRight: 20, height: 20, width: 20}}
                                       resizeMode={'contain'}
                                       source={require('../../../../assets/img/picto/menu/actions/assist.png')}/>
                                <Text style={{color: 'green'}}>Partagez une Passe Décisive</Text>
                                <Text style={{marginRight: 20}}> > </Text>
                            </TouchableOpacity>
                        </View> : null}
                    <TouchableOpacity onPress={() => {
                        this._addMedia('Images', this.displaySimpleArticle);
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

    displayInterview(type) {
        return (
            <ScrollView contentContainerStyle={{flex: 1}}>
                {this._renderHeader(type, 'Interview')}
                <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
                    <View style={[GLOBAL_STYLE.modal, {alignItems: 'center'}]}>
                        {this._renderOwner()}
                        <Text style={GLOBAL_STYLE.text}>Partager une interview</Text>
                    </View>
                </View>
                <View style={[GLOBAL_STYLE.modal]}>
                    <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
                        <CustomInput
                            container={{justifyContent: 'flex-start'}}
                            placeholder={'Donnez un titre à votre interview'}
                            input={[{
                                borderWidth: 1,
                                padding: 5,
                                marginTop: 10,
                                height: Math.max(50, this.state.height)
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
                    </View>
                    <View style={{backgroundColor: '#e9e9e9', paddingHorizontal: 15, paddingVertical: 10}}>
                        <Text style={{color: '#000000', fontWeight: '600'}}>Selectionner une miniature</Text>
                    </View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 2}}>
                        {this.coverPhoto('Images', this.displayInterview)}
                    </View>
                    <View style={{backgroundColor: '#e9e9e9', paddingHorizontal: 15, paddingVertical: 10}}>
                        <Text style={{color: '#000000', fontWeight: '600'}}>Selectionner votre interview</Text>
                    </View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 2}}>
                        {this.coverVideo('All', this.displayInterview)}
                    </View>

                    <TouchableOpacity style={{
                        backgroundColor: '#336699',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 35
                    }} onPress={() => this.publishModal(type)}>
                        <Text style={{color: 'white'}}>Publier</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }

    coverPhoto(type, callback) {
        if (this.state.medias) {
            let originalWidth = this.state.medias[0].width; //result.width ;
            let originalHeight = this.state.medias[0].height; //result.height;
            let windowWidth = Dimensions.get('window').width;
            let widthChange = (windowWidth - 2) / originalWidth;
            return (
                <TouchableOpacity onPress={() => {
                    this._addMedia(type, callback)
                }} style={{

                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={{
                        borderWidth: 3,
                        borderColor: '#000000', width: originalWidth * widthChange, height: originalHeight * widthChange
                    }}
                           source={{uri: this.state.medias[0].uri}}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this._addMedia(type, callback)} style={{
                    paddingVertical: 40,
                    paddingHorizontal: 10,
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed'
                }}>
                    <Image style={timeLineStyle.profilePic}
                           source={require('../../../../assets/img/picto/add.png')}/>
                    <Text>Ajouter une photo</Text>
                </TouchableOpacity>
            )
        }
    }

    coverVideo(type, callback) {
        if (this.state.medias && this.state.medias[1]) {
            let originalWidth = this.state.medias[1].width; //result.width ;
            let originalHeight = this.state.medias[1].height; //result.height;
            let windowWidth = Dimensions.get('window').width;
            let widthChange = (windowWidth - 2) / originalWidth;
            return (
                <TouchableOpacity onPress={() => {
                    this._addMedia(type, callback)
                }} style={{

                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={{
                        borderWidth: 3,
                        borderColor: '#000000', width: originalWidth * widthChange, height: originalHeight * widthChange
                    }}
                           source={{uri: this.state.medias[1].uri}}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this._addMedia(type, callback)} style={{
                    paddingVertical: 40,
                    paddingHorizontal: 10,
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed'
                }}>
                    <Image style={timeLineStyle.profilePic}
                           source={require('../../../../assets/img/picto/add.png')}/>
                    <Text>Ajouter une photo</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        const {clubQuery, clubList} = this.state;
        const clubData = this._filterClub(clubQuery, clubList);
        return (
            <Modal style={{flex: 1}} animationType={"slide"} transparent={false}
                   visible={this.props.visible}

                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                <ScrollView>
                {this.conditionalRender()}
                {this.props.type === TypeEnum.goals || this.props.type === TypeEnum.assists ?
                    <View style={[{marginLeft: '7.5%', height: 50, width: '85%'}]}>
                        <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            containerStyle={styles.autocompleteContainer}
                            data={clubData}
                            defaultValue={clubQuery}
                            placeholder={'Nom du club affronté'}
                            onChangeText={text => this.setState({clubQuery: text})}
                            hideResults={this.state.hideClub}
                            renderItem={item => (

                                <TouchableOpacity onPress={() => this._setClub(item)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View> : null}
                </ScrollView>
            </Modal>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.medias !== nextState.medias;
    }

    renderImage(result, callback) {
        if (this.state.medias) {
            let originalWidth = this.state.medias[0].width; //result.width ;
            let originalHeight = this.state.medias[0].height; //result.height;
            let windowWidth = null || Dimensions.get('window').width;
            let widthChange = null || (windowWidth - 10) / originalWidth;
            return (
                <View style={{position: 'relative'}}>
                    <TouchableOpacity onPress={() => {
                        this.setState({medias: null}, () => {
                            this.forceUpdate();
                        });
                    }}
                                      style={{
                                          position: 'absolute',
                                          zIndex: 5,
                                          right: 10,
                                          top: -15,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          height: 30,
                                          width: 30,
                                          backgroundColor: 'rgba(0,0,0,0.4)',
                                          borderRadius: 15
                                      }}>
                        <Image source={require('../../../../assets/img/picto/white-cross.png')}
                               style={{width: 15, height: 15}}/>
                    </TouchableOpacity>
                    <Image source={{uri: this.state.medias[0].uri}} style={{
                        marginLeft: 5,
                        width: originalWidth * widthChange,
                        height: originalHeight * widthChange
                    }}/>
                </View>
            );
        } else {
            return null
        }
        //callback();
        //this.forceUpdate();
    }

    _addMedia = async (type, callback, index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: 'video'
        });

        if (!result.cancelled) {
            if (this.state.medias) {
                if (index) {
                    let mediaClone = Object.assign({},this.state.medias);
                    mediaClone[index] = {
                        uri: result.uri,
                        width: result.width,
                        height: result.height
                    };
                    this.setState({
                        medias: mediaClone
                    }, () => {
                        callback();
                    });
                } else {
                    this.setState({
                        medias: [...this.state.medias, {
                            uri: result.uri,
                            width: result.width,
                            height: result.height
                        }]
                    }, () => {
                        callback();
                    });
                }
            } else {
                this.setState({medias: [{uri: result.uri, width: result.width, height: result.height}]}, () => {
                    callback();
                });
            }

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

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
    };
};
export default connect(mapStateToProps)(PostModal);

const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: '#eeeeee'
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});
const STYLE = StyleSheet.create({
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between',
        height: 50,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    tabText: {
        color: '#003366',
        fontWeight: '700'
    },
    even: {
        backgroundColor: '#E7E7E7',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

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
/*
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
 */