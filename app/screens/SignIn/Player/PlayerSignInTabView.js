import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {View, Alert, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';

import {userActions} from '../../../_actions';

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
    },
    tab: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
const USERBASIC = [
    'firstname',
    'lastname',
    'birthdate'
];

const USERINFOS = [
    'email',
    'password'
];
const USERCLUB = [
    'club',
    'team',
    'poste'
];
const COACHBASIC = [
    'firstname',
    'lastname',
    'birthdate',
    'club',
];

const COACHINFOS = [
    'email',
    'password',
    'team',
];

class PlayerSignInTabView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        };

        this.checkIfComplete = this.checkIfComplete.bind(this);
        this.checkPlayerTabs = this.checkPlayerTabs.bind(this);
        this.objectContains = this.objectContains.bind(this);
    }

    displayAlert() {
        Alert.alert(
            'Une erreur est survenue',
            'Vous n\'avez pas remplis tous les champs sur cette page !',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }
    displayError() {
        Alert.alert(
            'Une erreur est survenue',
            'Veuillez vérifier vos informations',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }

    objectContains(ELEMENTS) {
        return ELEMENTS.every((element) => {
            return !!this.props.user[element];
        });
    }

    checkPlayerTabs(routeName) {

        switch (routeName) {
            case 'PlayerInfosfrom':
                return this.objectContains(USERBASIC);
            case 'PlayerClub':
                return this.objectContains(USERINFOS);
            case 'done':
                return this.objectContains(USERCLUB);

        }
    }

    checkFanTabs(routeName) {
        switch (routeName) {
            case 'FanInfos':
                return this.objectContains(USERBASIC);
            case 'done':
                return this.objectContains(USERINFOS);

        }
    }

    checkCoachTabs(routeName) {
        switch (routeName) {
            case 'CoachInfos':
                return this.objectContains(COACHBASIC);
            case 'done':
                return this.objectContains(COACHINFOS);
        }
    }

    checkIfComplete(routeName) {
        const ROUTE = this.props.navigation.state.routeName;
        switch (ROUTE) {
            case 'PlayerSignIn':
                return this.checkPlayerTabs(routeName);
            case 'FanSignIn':
                return this.checkFanTabs(routeName);
                break;
            case 'CoachSignIn':
                return this.checkCoachTabs(routeName);
                break;
            default:
                return null;
        }
    }

    render() {
        if(this.props.user.error){
            this.displayError();
        }
        const {routes} = this.props.navigation.state;
        const index = this.props.navigation.state.index;
        return (
            <View style={styles.tab}>
                <Text>{index + 1}/{routes.length}</Text>
                <View style={styles.tabContainer}>

                    {routes.map((route, Index, key) => (
                        <View style={{flexDirection: 'row'}}>
                            <View style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10 / 2,
                                backgroundColor: index >= Index ? '#003366' : '#cccccc'
                            }}/>
                            <View style={[{
                                backgroundColor: index <= Index ? '#cccccc' : '#003366'
                            }, {
                                width: 30,
                                marginTop: 4,
                                height: 2,
                                display: Index === (routes.length - 1) ? 'none' : 'flex'
                            }]}/>

                        </View>
                    ))}
                </View>
                <View style={{
                    flexDirection: 'row',
                    height: 80,
                    width: 250,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                        if (index > 0) {
                            this.props.navigation.navigate(routes[index - 1].key, {});
                        }
                    }}><Icon style={{display: index === 0 ? 'none' : 'flex'}} name={'chevron-left'} color='#cccccc'/>
                        <Text style={{color: '#cccccc'}}>{index === 0 ? '' : 'Precedent'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                        if (index + 1 !== routes.length) {
                            this.checkIfComplete(routes[index + 1].key) ? this.props.navigation.navigate(routes[index + 1].key, {}) : this.displayAlert();
                        } else if (index + 1 === routes.length) {
                            this.checkIfComplete('done') ? this.props.navigation.dispatch(userActions.register(this.props.user)) : this.displayAlert();
                        }
                    }
                    }>
                        <Text>{index + 1 === routes.length ? 'Fin' : 'Suivant'}</Text>
                        <Icon name={'chevron-right'} color='#003366'/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.registeringUser
    };
};
export default connect(mapStateToProps)(PlayerSignInTabView);