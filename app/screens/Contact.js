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
import {connect} from "react-redux";


class Contact extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const {navigation} = this.props;
        const state = navigation.state.params;
        let type = state.inspectedUser ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
        let team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        let user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;
        return (
            <View style={{backgroundColor:'#ffffff',flex:1,paddingTop:20, flexDirection:'column', paddingHorizontal:20}}>
                <View style={{paddingVertical: 10}}>
                    <Text style={{color:'#003366', fontSize: 14, fontWeight: '600'}}>Téléphone (Accueil Club)</Text>
                    <Text>{team.club.phoneNbr ? team.club.phoneNbr : 'Nom renseigné'}</Text>
                </View>
                <View style={{height:1, backgroundColor:'#cccccc'}}/>
                <View style={{paddingVertical:10}}>
                    <Text style={{marginTop:10, color:'#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Siège du Club)</Text>
                    <Text>{team.club.address ? team.club.address : 'Nom renseigné'}</Text>

                    <Text style={{marginTop:10, color:'#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Lieu d'entrainement)</Text>
                    <Text>{team.club.training_address ? team.club.training_address : 'Nom renseigné'}</Text>

                    <Text style={{marginTop:10, color:'#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Lieu de Match)</Text>
                    <Text style={{marginBottom:10}}>{team.club.match_address ? team.club.match_address : 'Nom renseigné'}</Text>
                </View>
                <View style={{height:1, backgroundColor:'#cccccc'}}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.ownerList.posts,
        inspectedUser: state.inspectedUser.user,
        isFetching: state.inspectedUser.fetching,
        currentUser: state.currentUser.user
    };
};
export default connect(mapStateToProps)(Contact);