import React, {Component} from 'react';
import {Text,Share, View, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import connect from "react-redux/es/connect/connect";

const MENU = [
    {
        label: 'Profil',
        action: 'Profile',
        params: {},
    },
    {
        label: 'Partager à mes amis',
        action: 'Share',
        params: {},
    },
    {
        label: 'Réglages',
        action: 'MyAccount',
        params: {},
    },
    {
        label: 'Aide',
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
            inspectedUser: this.props.currentUser,
        };

        if (action === 'Profile' && this.props.currentUser.userType.label === 'Coach') {
            navigate("CoachProfile", users);
        } else if(action === 'Profile' && this.props.currentUser.userType.label === 'Supporter') {
            navigate("FanProfile", users);
        }else if (action === 'Share'){
            Share.share({
                message: 'The stadium une appli vraiment cool',
                url: 'www.google.com',
                title: 'Inscrivez vous sur cette appli !!!'
            },{
                // Android only:
                dialogTitle: 'Partager à vos amis',
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
        }
        else {
            navigate(action, users)
        }
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                {MENU.map((menu, key) => (
                    <TouchableOpacity style={{
                        paddingLeft: 15,
                        justifyContent: 'center',
                        height: 50,
                        borderBottomColor: '#cccccc',
                        borderBottomWidth: 1,
                    }}
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
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        inspectedUser: state.inspectedUser,

    };
};
export default connect(mapStateToProps)(Menu);
