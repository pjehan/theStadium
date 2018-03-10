import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import connect from "react-redux/es/connect/connect";

const MENU = [
    {
        label : 'Profil',
        action: 'Profil',
        params: {},
    },
    {
        label : 'Partager à mes amis',
        action: 'oui',
        params: {},
    },
    {
        label : 'Réglages',
        action: 'za',
        params: {},
    },
    {
        label : 'Aide',
        action: 'rearae',
        params: {},
    },
]

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post
        };

        this.onPressHandler = this.onPressHandler.bind(this);
    }

    onPressHandler(action, params) {
        let {navigate} = this.props.navigation;
        const users = {
            currentUser: this.props.currentUser,
            inspectedUser: this.props.inspectedUser,
        }
        if(action !== 'Profil'){
            navigate(action, users);
        } else {
            navigate("Profile", users);
        }
    }

    componentDidUpdate() {
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#ffffff'}}>
                {MENU.map((menu, key) => (
                <TouchableOpacity style={{paddingLeft:15,justifyContent:'center',height:50, borderBottomColor: '#cccccc',borderBottomWidth: 1,}}
                                  onPress={() => this.onPressHandler(menu.action, menu.params)}>

                    <Text>{menu.label.toUpperCase()}</Text>
                    <Icon style={{position: 'absolute', right: 0}}
                          color='#003366'
                          size={35}
                          name={'chevron-right'}/>
                </TouchableOpacity>
                ))}
            </View>
        )
    }
}const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        inspectedUser: state.inspectedUser,
    };
};
export default connect(mapStateToProps)(Menu);
