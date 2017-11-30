import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import moment from 'moment'
import PropTypes from 'prop-types';

const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width:'100%',
        paddingTop:5,
        paddingBottom: 5
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius:45,
        marginRight: 5
    },
    text: {
        color:'black',
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
        marginTop:10
    },
    ownerStyle: {
        flexDirection: 'row',
        padding:5,
    },
    userActionText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:10
    },
    actionText: {
        fontSize: 12
    },
    teamText: {
        color: "white",
        fontSize:12
    },
    teamBackground: {
        backgroundColor: '#003366',
        padding: 10,
        paddingTop:2,
        paddingBottom:2
    },
    timeText: {
        fontSize:12,
        color:'#cccccc',
        fontWeight: '500',
        marginLeft:2
    }
});
let team = null;
class OwnerHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayDate: null,
        };
        this.calculatePostTime = this.calculatePostTime.bind(this);
    }

    componentWillMount() {
        this.calculatePostTime();
        if(this.props.team) {
            /*<View style={PostStyle.teamBackground}>
                    <Text style={PostStyle.teamText}>U13 DRH</Text>
                </View>
                <View style={{
                height: 8,
                    width: 8,
                    backgroundColor: '#cccccc',
                    borderRadius: 8,
                    marginLeft: 6,
                    marginRight: 6
            }}></View>*/
        }
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

        if(seconds < 100) {
            switch(true) {
                case seconds < 2:
                    this.state.displayDate = seconds + ' seconde';
                    break;
                case seconds > 1:
                    this.state.displayDate = seconds + ' secondes';
                    break
            }
        } else if (minutes < 60) {
            switch(true) {
                case minutes < 2:
                    this.state.displayDate = minutes + ' minute';
                    break;
                case (minutes > 1):
                    this.state.displayDate = minutes + ' minutes';
                    break;
            }
        }else if(hours < 24) {
            switch(true) {
                case hours < 2:
                    this.state.displayDate = hours + ' heure';
                    break;
                case hours > 1:
                    this.state.displayDate = hours + ' heures';
                    break;
            }
        }else if(days < 7) {
            switch(true) {
                case days < 2:
                    this.state.displayDate = days + ' jour';
                    break;
                case days > 1:
                    this.state.displayDate = days + ' jours';
                    break;
            }
        }else if(weeks < 4) {
            switch(true) {
                case weeks < 2:
                    this.state.displayDate = weeks + ' semaine';
                    break;
                case weeks > 1:
                    this.state.displayDate = weeks + ' semaines';
                    break;
            }
        }else if(month < 12) {
            this.state.displayDate = month + ' mois';
        }else{
            switch(true) {
                case years < 2:
                    this.state.displayDate = years + ' an';
                    break;
                case years > 1:
                    this.state.displayDate = years + ' ans';
                    break;
            }
        }
    }

    render() {
        return (<View style={PostStyle.ownerStyle}>
            <Image style={PostStyle.profilePic} source={require('../../../../assets/img/TA-Rennes.jpg')}/>
            <View>
                <Text style={PostStyle.title}>{this.props.Owner}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {this.team}
                    <View style={{flexDirection: 'row'}}>
                        <Image resizeMode="contain" style={{height: 15, width: 15}}
                               source={require('../../../../assets/img/picto/actualite/picto-time-gris.png')}/>
                        <Text style={PostStyle.timeText}>{this.state.displayDate}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 8}}>
                <View style={{height: 8, width: 8, backgroundColor: '#cccccc', borderRadius: 8}}></View>
                <View style={{
                    height: 8,
                    width: 8,
                    backgroundColor: '#cccccc',
                    borderRadius: 8,
                    marginLeft: 2,
                    marginRight: 2
                }}></View>
                <View style={{height: 8, width: 8, backgroundColor: '#cccccc', borderRadius: 8}}></View>
            </TouchableOpacity>
        </View> )
    }
}
/**
 * Props
 */
OwnerHeader.propTypes = {
    postDate: PropTypes.any.isRequired, /* getaccesstoken of Facebook API */
    Owner: PropTypes.string.isRequired, /* SecretToken of Facebook API */
    team: PropTypes.string, /* Indicade refresh time of Facebook Widget in second */
};
OwnerHeader.defaultProps = {
    postDate: new Date(), /* getaccesstoken of Facebook API */
    Owner: 'Cheunn Nzorjai', /* SecretToken of Facebook API */
};
export default OwnerHeader;2017, 11, 30, 23, 0, 0 , 0