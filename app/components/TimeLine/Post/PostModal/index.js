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

class PostModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            medias: {
                uri:'',
                width:0,
                height:0
            },
            height:50,
            goals_assists: false,

        };
        this.displayGoalsAssists = this.displayGoalsAssists.bind(this);
        this.displaySimpleArticle = this.displaySimpleArticle.bind(this);
        this.onChangeInfos = this.onChangeInfos.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.publishModal = this.publishModal.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderOwner = this._renderOwner.bind(this);
    }

    onChangeInfos(state, newvalue) {
        this.setState({post: {...this.state.post, [state]: newvalue}});
    }

    toggleModal(visible, type) {
        this.props.toggleModal(visible, type);
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
                    <View style={[timeLineStyle.profilePic, {backgroundColor: '#cccccc'}]}/> }
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
        ModalContent = (
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
        ModalContent = (
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
                             input={[{flex: 1, padding: 20, marginTop: 10,height: Math.max(80, this.state.height)}]}
                             state={'content'}
                             textColor={'#000000'}
                             borderColor={'transparent'}
                             backgroundColor={'#ffffff'}
                             security={false}
                             onChangeSizeParent={(size)=>{
                                 this.setState({height:size})
                             }}
                             onChangeParent={(state, newvalue) => {
                                 this.onChangeInfos(state, newvalue)
                             }}/>
                <View>
                    {SelectedMedia}

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
        const {clubQuery, clubList} = this.state;
        const clubData = this._filterClub(clubQuery, clubList);
        return (
            <Modal style={{flex: 1}} animationType={"slide"} transparent={false}
                   visible={this.props.visible}

                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                {ModalContent}
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
            </Modal>
        )
    }

    renderImage(result, callback) {
        let originalWidth = result.width;
        let originalHeight = result.height;
        let windowWidth = null || Dimensions.get('window').width;
        let widthChange = null || (windowWidth - 10) / originalWidth;
        SelectedMedia = (
            <View style={{position: 'relative'}}>
                <TouchableOpacity onPress={() => {
                    SelectedMedia = null;
                    this.setState({medias: null});
                    this.displaySimpleArticle(TypeEnum.simple);
                    this.forceUpdate();
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
                <Image source={{uri: result.uri}} style={{
                    marginLeft: 5,
                    width: originalWidth * widthChange,
                    height: originalHeight * widthChange
                }}/>
            </View>
        );
        this.displaySimpleArticle(TypeEnum.simple);
        this.forceUpdate();
    }

    _addMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (!result.cancelled) {
            console.log(result);
            this.setState({medias: {uri: result.uri, width: result.width, height: result.height}});
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