import React, {Component} from 'react';
import {Text, View,Modal, ScrollView, TouchableOpacity} from 'react-native';
import {StyleSheet, Image} from 'react-native';
import moment from 'moment'
import PropTypes from 'prop-types';
import {userActions} from "../../../../_actions/user";
import {postActions} from "../../../../_actions";
import {connect} from "react-redux";

let team = null;

class OwnerHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayDate: null,
            tools: false,
        };
        this.calculatePostTime = this.calculatePostTime.bind(this);
        this._displayTools = this._displayTools.bind(this);
    }

    componentWillMount() {
        this.calculatePostTime();
    }

    calculatePostTime() {
        let now = moment(new Date());
        let postDate = moment(this.props.postDate);

        let seconds = now.diff(postDate, 'seconds');
        let minutes = now.diff(postDate, 'minutes');
        let hours = now.diff(postDate, 'hours');
        let days = now.diff(postDate, 'days');
        let weeks = now.diff(postDate, 'weeks');
        let month = now.diff(postDate, 'month');
        let years = now.diff(postDate, 'years');

        if (seconds < 100) {
            switch (true) {
                case seconds < 2:
                    this.state.displayDate = seconds + ' seconde';
                    break;
                case seconds > 1:
                    this.state.displayDate = seconds + ' secondes';
                    break
            }
        } else if (minutes < 60) {
            switch (true) {
                case minutes < 2:
                    this.state.displayDate = minutes + ' minute';
                    break;
                case (minutes > 1):
                    this.state.displayDate = minutes + ' minutes';
                    break;
            }
        } else if (hours < 24) {
            switch (true) {
                case hours < 2:
                    this.state.displayDate = hours + ' heure';
                    break;
                case hours > 1:
                    this.state.displayDate = hours + ' heures';
                    break;
            }
        } else if (days < 7) {
            switch (true) {
                case days < 2:
                    this.state.displayDate = days + ' jour';
                    break;
                case days > 1:
                    this.state.displayDate = days + ' jours';
                    break;
            }
        } else if (weeks < 4) {
            switch (true) {
                case weeks < 2:
                    this.state.displayDate = weeks + ' semaine';
                    break;
                case weeks > 1:
                    this.state.displayDate = weeks + ' semaines';
                    break;
            }
        } else if (month < 12) {
            this.state.displayDate = month + ' mois';
        } else {
            switch (true) {
                case years < 2:
                    this.state.displayDate = years + ' an';
                    break;
                case years > 1:
                    this.state.displayDate = years + ' ans';
                    break;
            }
        }
    }

    _isUser(user, inspected) {
        return user === inspected.id;
    }

    _displayTools() {
        return (
            <Modal animationType={"slide"} transparent={true}
                   visible={this.state.tools}

                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                <View style={{
                    backgroundColor: 'rgba(0,0,0,0.5)', flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        height: 200,
                        width: 200,
                        borderRadius: 10,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center'
                    }}>
                        {this._isUser(this.props.ownerID, this.props.currentUser) ?
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                height: 40,
                                borderTopColor: '#cccccc',
                                borderTopWidth: 1,
                                borderBottomColor: '#cccccc',
                                borderBottomWidth: 0.5
                            }}
                                              onPress={() => {
                                              }}>
                                <Text style={{textAlign: 'center', color: '#003366'}}>Supprimer</Text>
                            </TouchableOpacity> : null}
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            height: 40,
                            borderTopColor: '#cccccc',
                            borderTopWidth: 0.5,
                            borderBottomColor: '#cccccc',
                            borderBottomWidth: 0.5
                        }}
                                          onPress={() => {
                                          }}>
                            <Text style={{textAlign: 'center', color: '#003366'}}>Signalez un abus</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            height: 40,
                            borderTopColor: '#cccccc',
                            borderTopWidth: 0.5,
                            borderBottomColor: '#cccccc',
                            borderBottomWidth: 1
                        }}
                                          onPress={() => {
                                              this.setState({tools: false})
                                          }}>
                            <Text style={{textAlign: 'center', color: '#003366'}}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    goToProfile() {
        this.props.goToProfileParent();
    }

    render() {
        return (
                <View style={PostStyle.ownerStyle}>
                    {this._displayTools()}
                    <TouchableOpacity style={PostStyle.ownerStyle} onPress={() => {
                        this.goToProfile()
                    }}>
                        {(this.props.team && !this.props.team.club.profilePicture) || (!this.props.team && !this.props.Owner.profilepicture) ?
                            <View style={[PostStyle.profilePic, {backgroundColor: '#cccccc'}]}/> :
                            <Image style={PostStyle.profilePic}
                                   source={{uri: !this.props.team ? this.props.Owner.profilepicture : this.props.team.club.profilePicture}}/>
                        }
                        <View>
                            <Text style={PostStyle.title}>{this.props.Owner}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                {this.props.team ?
                                    <Text style={{
                                        paddingVertical: 2,
                                        paddingHorizontal: 5,
                                        fontSize: 10,
                                        backgroundColor: '#003366',
                                        color: '#ffffff',
                                        marginRight: 10
                                    }}>{this.props.team.category.label} {this.props.team.division.label}</Text> :
                                    null
                                }
                                <View style={{flexDirection: 'row'}}>
                                    <Image resizeMode="contain" style={{height: 15, width: 15}}
                                           source={require('../../../../assets/img/picto/actualite/picto-time-gris.png')}/>
                                    <Text style={PostStyle.timeText}>{this.state.displayDate}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.setState({tools: true})
                    }} style={{flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 8}}>
                        <View style={{height: 5, width: 5, backgroundColor: '#cccccc', borderRadius: 8}}/>
                        <View style={{
                            height: 5,
                            width: 5,
                            backgroundColor: '#cccccc',
                            borderRadius: 8,
                            marginLeft: 2,
                            marginRight: 2
                        }}/>
                        <View style={{height: 5, width: 5, backgroundColor: '#cccccc', borderRadius: 8}}/>
                    </TouchableOpacity>
                </View>

        )

    }
}

mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        inspectedUser: state.inspectedUser.user,
        isFetching: state.inspectedUser.fetching,
        postList: state.postList.posts,
    };
};
export default connect(mapStateToProps)(OwnerHeader);
/**
 * Props
 */
OwnerHeader.propTypes = {
    postDate: PropTypes.any.isRequired, /* getaccesstoken of Facebook API */
    Owner: PropTypes.string.isRequired, /* SecretToken of Facebook API */
   // team: PropTypes.string, /* Indicade refresh time of Facebook Widget in second */
};
OwnerHeader.defaultProps = {
    postDate: new Date(), /* getaccesstoken of Facebook API */
    Owner: 'Cheunn Nourry', /* SecretToken of Facebook API */
};
const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5
    },
    profilePic: {
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
    userAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    ownerStyle: {
        flex:1,
        flexDirection: 'row',
        padding: 5,
    },
    userActionText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
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
        fontWeight: '400',
        marginLeft: 2
    }
});