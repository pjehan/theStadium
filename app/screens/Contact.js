import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Alert,
    Keyboard,
    TimePickerAndroid,
    Platform, Modal, KeyboardAvoidingView
} from 'react-native';
import {connect} from "react-redux";
import CustomInput from "../components/CustomInput";
import {GLOBAL_STYLE} from "../assets/css/global";
import {Icon} from "react-native-elements";
import DateTimePicker from 'react-native-modal-datetime-picker';
import utils from "../config/utils";
import {teamAction} from "../_actions/team";

const initialState = {
    isEditing: false,
    lundiStart: null,
    lundiEnd: null,
    mardiStart: null,
    mardiEnd: null,
    mercrediStart: null,
    mercrediEnd: null,
    jeudiStart: null,
    jeudiEnd: null,
    vendrediStart: null,
    vendrediEnd: null,
    lundiDate: false,
    mardiDate: false,
    mercrediDate: false,
    jeudiDate: false,
    vendrediDate: false,

    lundiDateEnd: false,
    mardiDateEnd: false,
    mercrediDateEnd: false,
    jeudiDateEnd: false,
    vendrediDateEnd: false,
}

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = initialState

        this.onChangeInfos = this.onChangeInfos.bind(this);
        this.renderContact = this.renderContact.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this._handleTimePicked = this._handleTimePicked.bind(this);
        this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
        this._showDateTimePicker = this._showDateTimePicker.bind(this);
        this._handleDatePicked = this._handleDatePicked.bind(this);
    }

    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue});
    }

    _isUser(user, inspected) {
        return user.id === inspected.id;
    }

    _showDateTimePicker(state) {
        this.setState({[state]: true});
    }

    _hideDateTimePicker(state) {
        this.setState({[state]: false});
    }

    _handleDatePicked = (date) => {
        return date;
    };
    _displayAlert = (time) => {
        Alert.alert(
            'Attention',
            time === 'End' ? 'Vous ne pouvez pas terminer l\'entrainement avant le début de ce dernier !' : 'Vous ne pouvez pas démarrer l\'entrainement après la fin de celui ci',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    };

    _handleTimePicked(state, time) {
        //
        let day = state;
        let hours = time.getHours();
        let minutes = time.getMinutes();
        day.includes('End') ? day = day.split('End')[0] : day = day.split('Start')[0];

        this.setState({[state]: hours + 'h' + (minutes < 10 ? '0' + minutes : minutes)});
        if (state.includes('End')) {
            if (this.state[day + 'Start']) {
                if (this.state[day + 'Start']) {
                    const stateArray = this.state[day + 'Start'].split('h');
                    if (parseInt(stateArray[0], 10) > hours || ((parseInt(stateArray[0], 10) === hours) && parseInt(stateArray[1], 10) > minutes)) {
                        this._displayAlert('End');
                        this.setState({[state]: null});
                    }

                }
            }
        } else {
            if (this.state[day + 'End']) {
                if (this.state[day + 'End']) {
                    const stateArray = this.state[day + 'End'].split('h');
                    if (parseInt(stateArray[0], 10) < hours || ((parseInt(stateArray[0], 10) === hours) && parseInt(stateArray[1], 10) < minutes)) {
                        this._displayAlert();
                        this.setState({[state]: null});
                    }

                }
            }
        }
        //this.setState({[state]: time.getHours() + 'h' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) });
        state.includes('End') ? day += 'DateEnd' : day += 'Date';
        this._hideDateTimePicker(day);
    };

    _contactSend() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        const teamP = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        const user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;

        const trainingHoursP = teamP.trainingHours ? JSON.parse(teamP.trainingHours) : null;

        const lundi = (this.state.lundiStart && this.state.lundiEnd) ? this.state.lundiStart + ' - ' + this.state.lundiEnd : trainingHoursP.lundi ? trainingHoursP.lundi : "";
        const mardi = (this.state.mardiStart && this.state.mardiEnd) ? this.state.mardiStart + ' - ' + this.state.mardiEnd : trainingHoursP.mardi ? trainingHoursP.mardi : "";
        const mercredi = (this.state.mercrediStart && this.state.mercrediEnd) ? this.state.mercrediStart + ' - ' + this.state.mercrediEnd : trainingHoursP.mercredi ? trainingHoursP.mercredi : "";
        const jeudi = (this.state.jeudiStart && this.state.jeudiEnd) ? this.state.jeudiStart + ' - ' + this.state.jeudiEnd : trainingHoursP.jeudi ? trainingHoursP.jeudi : "";
        const vendredi = (this.state.vendrediStart && this.state.vendrediEnd) ? this.state.vendrediStart + ' - ' + this.state.vendrediEnd : trainingHoursP.vendredi ? trainingHoursP.vendredi : "";
        const trainingHours = JSON.stringify({
            lundi: lundi,
            mardi: mardi,
            mercredi: mercredi,
            jeudi: jeudi,
            vendredi: vendredi
        });
        const club = {
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        };
        const team = {
            trainingHours: trainingHours,
            trainingAddress: this.state.trainingAddress,
            matchAddress: this.state.matchAddress,
        };
        Object.assign(this.props.currentUser.teams[0].team, team, club);

        this.props.dispatch(teamAction.putTeam(this.props.currentUser.teams[0].team.id, team));
    }

    resetTimer = (day) => {
        this.setState({[day + 'End']: null, [day + 'Start']: null});
    };

    render() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        const type = state.inspectedUser ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
        const team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        const user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;

        return (
            <KeyboardAvoidingView style={{
                backgroundColor: '#ffffff',
                flex: 1,
                paddingTop: 20,
                flexDirection: 'column',

            }}>
                {utils._isUser(state.currentUser, state.inspectedUser) ?
                    (
                        <View style={{flexDirection: 'row', justifyContent: this.state.isEditing ? 'space-between' : 'flex-end' }}>
                            {this.state.isEditing ?
                                <TouchableOpacity style={{alignSelf: 'flex-start', marginLeft: 10, paddingBottom: 10}}
                                                  onPress={() => {
                                                      if (this.state.isEditing) {
                                                          Alert.alert(
                                                              'Attention',
                                                              'Êtes-vous sûr de vouloir annuler, les modifications effectuées seront perdues ?',
                                                              [
                                                                  {
                                                                      text: 'Retour',
                                                                      onPress: () => console.log('Cancel Pressed'),
                                                                      style: 'cancel'
                                                                  },
                                                                  {
                                                                      text: 'Oui', onPress: () => {
                                                                      this.setState(initialState);
                                                                      this.forceUpdate()
                                                                  }
                                                                  },
                                                              ],
                                                              {cancelable: true}
                                                          )
                                                      } else {
                                                          this.setState({isEditing: !this.state.isEditing});
                                                          this.forceUpdate()
                                                      }
                                                  }}>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <Icon type='font-awesome' name='times' size={15}
                                              color="#cccccc"/>
                                        <Text style={{marginLeft: 5, color: "#cccccc"}}>Annuler</Text>

                                    </View>
                                </TouchableOpacity>
                            : null}
                            <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 10, paddingBottom: 10}}
                                              onPress={() => {
                                                  if (this.state.isEditing) {
                                                      this._contactSend();
                                                  }
                                                  this.setState({isEditing: !this.state.isEditing});
                                                  this.forceUpdate()
                                              }}><View
                                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{
                                    marginRight: 5,
                                    color: "#003366"
                                }}>{this.state.isEditing ? 'Valider' : 'Modifier'}</Text>
                                <Icon type='font-awesome' name={this.state.isEditing ? 'check' : 'pencil'} size={15}
                                      color="#003366"/>
                            </View>
                            </TouchableOpacity>
                        </View>
                    )
                    : null}
                {!this.state.isEditing ? this.renderContact() : this.renderEdit()}
            </KeyboardAvoidingView>
        )
    }

    renderEdit() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        const type = state.inspectedUser ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
        const team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        const user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;

        const trainingHours = team.trainingHours ? JSON.parse(team.trainingHours) : null;
        return (
            <ScrollView contentContainerStyle={{
                paddingHorizontal: 20, paddingVertical: 10
            }}>
                <View>
                    <Text style={{color: '#003366', fontSize: 14, fontWeight: '600'}}>Téléphone (Accueil Club)</Text>
                    <CustomInput
                        type={'text'}
                        container={{marginTop: 10}}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={team.club.phoneNumber ? team.club.phoneNumber : 'Numéro du téléphone'}
                        state={'phoneNumber'}
                        input={GLOBAL_STYLE.input}
                        onChangeParent={(state, newvalue) => {
                            this.onChangeInfos(state, newvalue)
                        }}
                    />
                </View>
                <View style={{height: 1, backgroundColor: '#cccccc'}}/>
                <View style={{paddingVertical: 10}}>
                    <Text style={{marginTop: 10, color: '#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Siège du
                        Club)</Text>
                    <CustomInput
                        type={'text'}
                        container={{marginTop: 10}}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={team.club.address ? team.club.address : 'Adresse du siège'}
                        state={'address'}
                        input={GLOBAL_STYLE.input}
                        onChangeParent={(state, newvalue) => {
                            this.onChangeInfos(state, newvalue)
                        }}
                    />

                    <Text style={{marginTop: 10, color: '#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Lieu
                        d'entrainement)</Text>
                    <CustomInput
                        type={'text'}
                        container={{marginTop: 10}}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={team.trainingAddress ? team.trainingAddress : 'Adresse d\'entraînement'}
                        state={'trainingAddress'}
                        input={GLOBAL_STYLE.input}
                        onChangeParent={(state, newvalue) => {
                            this.onChangeInfos(state, newvalue)
                        }}/>

                    <Text style={{marginTop: 10, color: '#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Lieu de
                        Match)</Text>
                    <CustomInput
                        type={'text'}
                        container={{marginTop: 10}}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={team.matchAddress ? team.matchAddress : 'Lieu de match'}
                        state={'matchAddress'}
                        input={GLOBAL_STYLE.input}
                        onChangeParent={(state, newvalue) => {
                            this.onChangeInfos(state, newvalue)
                        }}/>
                </View>
                <View style={{height: 1, backgroundColor: '#cccccc'}}/>
                <View style={{marginVertical: 10, width: '100%'}}>
                    <Text style={{color: '#003366', fontSize: 14, fontWeight: '600'}}>Horaire d'entraînements</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                        justifyContent: 'space-between'
                    }}>
                        <Text>Lundi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal: 10, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('lundiDate')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.lundiStart ? this.state.lundiStart : 'Début'}</Text>

                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.lundiDate}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('lundiStart', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('lundiDate')
                                    }}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 20, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('lundiDateEnd')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.lundiEnd ? this.state.lundiEnd : 'Fin'}</Text>

                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.lundiDateEnd}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('lundiEnd', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('lundiDateEnd')
                                    }}
                                />
                            </TouchableOpacity>
                            {this.state.lundiStart || this.state.lundiEnd ? <TouchableOpacity
                                style={{marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}
                                onPress={() => {
                                    this.resetTimer('lundi')
                                }}>
                                <Icon type='font-awesome' name={'times'} color='#ff0000'/>
                            </TouchableOpacity> : null}
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Mardi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal: 10, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('mardiDate')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.mardiStart ? this.state.mardiStart : 'Début'}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.mardiDate}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('mardiStart', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('mardiDate')
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 20, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('mardiDateEnd')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.mardiEnd ? this.state.mardiEnd : 'Fin'}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.mardiDateEnd}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('mardiEnd', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('mardiDateEnd')
                                    }}
                                />
                            </TouchableOpacity>
                            {this.state.mardiStart || this.state.mardiEnd ? <TouchableOpacity
                                style={{marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}
                                onPress={() => {
                                    this.resetTimer('mardi')
                                }}>
                                <Icon type='font-awesome' name={'times'} color='#ff0000'/>
                            </TouchableOpacity> : null}
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Mercredi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal: 10, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('mercrediDate')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.mercrediStart ? this.state.mercrediStart : 'Début'}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.mercrediDate}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('mercrediStart', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('mercrediDate')
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 20, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('mercrediDateEnd')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.mercrediEnd ? this.state.mercrediEnd : 'Fin'}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.mercrediDateEnd}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('mercrediEnd', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('mercrediDateEnd')
                                    }}
                                />
                            </TouchableOpacity>
                            {this.state.mercrediStart || this.state.mercrediEnd ?
                                <TouchableOpacity
                                    style={{marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}
                                    onPress={() => {
                                        this.resetTimer('mercredi')
                                    }}>
                                    <Icon type='font-awesome' name={'times'} color='#ff0000'/>
                                </TouchableOpacity> : null}
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Jeudi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal: 10, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('jeudiDate')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.jeudiStart ? this.state.jeudiStart : 'Début'}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.jeudiDate}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('jeudiStart', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('jeudiDate')
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 20, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('jeudiDateEnd')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.jeudiEnd ? this.state.jeudiEnd : 'Fin'}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.jeudiDateEnd}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('jeudiEnd', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('jeudiDateEnd')
                                    }}
                                />
                            </TouchableOpacity>
                            {this.state.jeudiStart || this.state.jeudiEnd ? <TouchableOpacity
                                style={{marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}
                                onPress={() => {
                                    this.resetTimer('jeudi')
                                }}>
                                <Icon type='font-awesome' name={'times'} color='#ff0000'/>
                            </TouchableOpacity> : null}
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Vendredi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal: 10, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('vendrediDate')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.vendrediStart ? this.state.vendrediStart : 'Début'}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.vendrediDate}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('vendrediStart', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('vendrediDate')
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 20, padding: 10, backgroundColor: '#003366'}}
                                              onPress={() => {
                                                  this._showDateTimePicker('vendrediDateEnd')
                                              }}>
                                <Text
                                    style={{color: '#ffffff'}}>{this.state.vendrediEnd ? this.state.vendrediEnd : 'Fin'}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.vendrediDateEnd}
                                    onConfirm={(date) => {
                                        this._handleTimePicked('vendrediEnd', date)
                                    }}
                                    onCancel={() => {
                                        this._hideDateTimePicker('vendrediDateEnd')
                                    }}
                                />
                            </TouchableOpacity>
                            {this.state.vendrediStart || this.state.vendrediEnd ? <TouchableOpacity
                                style={{marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}
                                onPress={() => {
                                    this.resetTimer('vendredi')
                                }}>
                                <Icon type='font-awesome' name={'times'} color='#ff0000'/>
                            </TouchableOpacity> : null}
                        </View>
                    </View>
                </View>

                <View style={{height: 1, backgroundColor: '#cccccc'}}/>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>


                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Attention',
                            'Êtes-vous sûr de vouloir annuler, les modifications effectuées seront perdues ?',
                            [
                                {text: 'Retour', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {
                                    text: 'Oui', onPress: () => {
                                    this.setState(initialState);
                                    this.forceUpdate()
                                }
                                },
                            ],
                            {cancelable: true}
                        )

                    }} style={{
                        alignItems: 'center',
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        justifyContent: 'center',
                        marginVertical: 10,
                        padding: 10,
                        width: '50%',
                        backgroundColor: '#cccccc'
                    }}>
                        <Text>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        justifyContent: 'center',
                        marginVertical: 10,
                        padding: 10,
                        width: '50%',
                        backgroundColor: '#003366'
                    }} onPress={() => {
                        this._contactSend();
                        this.setState({isEditing: !this.state.isEditing});
                        this.forceUpdate()
                    }}>
                        <Text style={{color: '#ffffff', fontWeight: '600'}}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    renderContact() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        const type = state.inspectedUser ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
        const team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        const user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;

        const trainingHours = team.trainingHours ? JSON.parse(team.trainingHours) : {};
        return (
            <ScrollView contentContainerStyle={{
                paddingHorizontal: 20, paddingVertical: 10
            }}>

                <View style={{paddingVertical: 10}}>
                    <Text style={{color: '#003366', fontSize: 14, fontWeight: '600'}}>Téléphone (Accueil Club)</Text>
                    <Text>{team.club.phoneNumber ? team.club.phoneNumber : 'Non renseigné'}</Text>
                </View>
                <View style={{height: 1, backgroundColor: '#cccccc'}}/>
                <View style={{paddingVertical: 10}}>
                    <Text style={{marginTop: 10, color: '#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Siège du
                        Club)</Text>
                    <Text>{team.club.address ? team.club.address : 'Non renseigné'}</Text>

                    <Text style={{marginTop: 10, color: '#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Lieu
                        d'entrainement)</Text>
                    <Text>{team.trainingAddress ? team.trainingAddress : 'Non renseigné'}</Text>

                    <Text style={{marginTop: 10, color: '#003366', fontSize: 14, fontWeight: '600'}}>Adresse (Lieu de
                        Match)</Text>
                    <Text style={{marginBottom: 10}}>{team.matchAddress ? team.matchAddress : 'Non renseigné'}</Text>
                </View>
                <View style={{height: 1, backgroundColor: '#cccccc'}}/>
                <View style={{marginVertical: 10}}>
                    <Text style={{color: '#003366', fontSize: 14, fontWeight: '600'}}>Horaire d'entraînements</Text>
                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Lundi:</Text>
                        <Text
                            style={{alignSelf: 'flex-end'}}>{trainingHours.lundi ? trainingHours.lundi : 'Repos'}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Mardi:</Text>
                        <Text
                            style={{alignSelf: 'flex-end'}}>{trainingHours.mardi ? trainingHours.mardi : 'Repos'}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Mercredi:</Text>
                        <Text
                            style={{alignSelf: 'flex-end'}}>{trainingHours.mercredi ? trainingHours.mercredi : 'Repos'}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Jeudi:</Text>
                        <Text
                            style={{alignSelf: 'flex-end'}}>{trainingHours.jeudi ? trainingHours.jeudi : 'Repos'}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Vendredi:</Text>
                        <Text
                            style={{alignSelf: 'flex-end'}}>{trainingHours.vendredi ? trainingHours.vendredi : 'Repos'}</Text>
                    </View>
                </View>
            </ScrollView>
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