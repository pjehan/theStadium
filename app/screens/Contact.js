import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Keyboard,
    TimePickerAndroid,
    Platform, Modal
} from 'react-native';
import {connect} from "react-redux";
import CustomInput from "../components/CustomInput";
import {GLOBAL_STYLE} from "../assets/css/global";
import {Icon} from "react-native-elements";
import DateTimePicker from 'react-native-modal-datetime-picker';


class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            lundiDate:false,
            mardiDate:false,
            mercrediDate:false,
            jeudiDate:false,
            vendrediDate:false,

            lundiDateEnd:false,
            mardiDateEnd:false,
            mercrediDateEnd:false,
            jeudiDateEnd:false,
            vendrediDateEnd:false,
        };

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
    _showDateTimePicker(state){
        this.setState({[state]: true});
        console.log(this.state)
    }

    _hideDateTimePicker(state){
        this.setState({[state]: false});
    }

    _handleDatePicked = (date) => {
        return date;
    };

    _handleTimePicked(state, time) {
        this.setState({[state]: time.getHours() + 'h' + time.getMinutes()});
        state.includes('End') ? state = state.split('End')[0] + 'DateEnd' : state = state.split('Start')[0] + 'Date';
        this._hideDateTimePicker(state);
    };

    _contactSend() {
        const trainingHours =`{ "lundi": ${this.state.lundiStart}}`;
        const club = {
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        };
        const team = {
            trainingHours:null,
            trainingAddress: this.state.trainingAddress,
            matchAddress: this.state.matchAddress,
        };
        console.log(trainingHours)
    }

    render() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        const type = state.inspectedUser ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
        const team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        const user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;

        const trainingHours = JSON.parse(team.trainingHours);
        return (
            <View style={{
                backgroundColor: '#ffffff',
                flex: 1,
                paddingTop: 20,
                flexDirection: 'column',
                paddingHorizontal: 20
            }}>

                <TouchableOpacity style={{alignSelf: 'flex-end', paddingBottom: 10}} onPress={() => {
                    this.setState({isEditing: !this.state.isEditing});
                    this.forceUpdate()
                }}>
                    {this._isUser(state.currentUser, state.inspectedUser) ?
                        <Icon name="create" size={20}
                              color="#003366"/> : null}
                </TouchableOpacity>
                {!this.state.isEditing ? this.renderContact() : this.renderEdit()}
            </View>
        )
    }

    renderEdit() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        const type = state.inspectedUser ? state.inspectedUser.userType.label : this.props.inspectedUser.userType.label;
        const team = state.inspectedUser.teams ? state.inspectedUser.teams[0].team : this.props.inspectedUser.teams[0].team;
        const user = state.inspectedUser ? state.inspectedUser : this.props.inspectedUser;

        const trainingHours = JSON.parse(team.trainingHours);
        return (
            <ScrollView>

                <View style={{paddingVertical: 10}}>
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
                        placeholder={team.trainingAddress ? team.trainingAddress : 'Addresse d\'entraînement'}
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
                <View style={{marginVertical: 10}}>
                    <Text style={{color: '#003366', fontSize: 14, fontWeight: '600'}}>Horaire d'entraînements</Text>
                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        flex: 1,
                        justifyContent: 'space-between',
                        alignItems:'center',
                        marginVertical: 10
                    }}>
                        <Text>Lundi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal:10,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('lundiDate')} }>
                                <Text style={{color:'#ffffff'}}>Début : {this.state.lundiStart}</Text>

                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.lundiDate}
                                    onConfirm={(date) => {this._handleTimePicked('lundiStart', date)}}
                                    onCancel={() => {this._hideDateTimePicker('lundiDate')}}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:20,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('lundiDateEnd')} }>
                            <Text style={{color:'#ffffff'}}> Fin : {this.state.lundiEnd}</Text>

                            <DateTimePicker
                                mode={'time'}
                                isVisible={this.state.lundiDateEnd}
                                onConfirm={(date) => {this._handleTimePicked('lundiEnd', date)}}
                                onCancel={() => {this._hideDateTimePicker('lundiDateEnd')}}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Mardi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal:10,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('mardiDate')} }>
                                <Text style={{color:'#ffffff'}}>Début : {this.state.mardiStart}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.mardiDate}
                                    onConfirm={(date) => {this._handleTimePicked('mardiStart', date)}}
                                    onCancel={() => {this._hideDateTimePicker('mardiDate')}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:20,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('mardiDateEnd')} }>
                                <Text style={{color:'#ffffff'}}> Fin : {this.state.mardiEnd}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.mardiDateEnd}
                                    onConfirm={(date) => {this._handleTimePicked('mardiEnd', date)}}
                                    onCancel={() => {this._hideDateTimePicker('mardiDateEnd')}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Mercredi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal:10,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('mercrediDate')} }>
                                <Text style={{color:'#ffffff'}}>Début : {this.state.mercrediStart}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.mercrediDate}
                                    onConfirm={(date) => {this._handleTimePicked('mercrediStart', date)}}
                                    onCancel={() => {this._hideDateTimePicker('mercrediDate')}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:20,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('mercrediDateEnd')} }>
                                <Text style={{color:'#ffffff'}}> Fin : {this.state.mercrediEnd}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.mercrediDateEnd}
                                    onConfirm={(date) => {this._handleTimePicked('mercrediEnd', date)}}
                                    onCancel={() => {this._hideDateTimePicker('mercrediDateEnd')}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Jeudi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal:10,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('jeudiDate')} }>
                                <Text style={{color:'#ffffff'}}>Début : {this.state.jeudiStart}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.jeudiDate}
                                    onConfirm={(date) => {this._handleTimePicked('jeudiStart', date)}}
                                    onCancel={() => {this._hideDateTimePicker('jeudiDate')}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:20,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('jeudiDateEnd')} }>
                                <Text style={{color:'#ffffff'}}> Fin : {this.state.jeudiEnd}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.jeudiDateEnd}
                                    onConfirm={(date) => {this._handleTimePicked('jeudiEnd', date)}}
                                    onCancel={() => {this._hideDateTimePicker('jeudiDateEnd')}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        width: '60%',
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}>
                        <Text>Vendredi:</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <TouchableOpacity style={{marginHorizontal:10,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('vendrediDate')} }>
                                <Text style={{color:'#ffffff'}}>Début : {this.state.vendrediStart}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.vendrediDate}
                                    onConfirm={(date) => {this._handleTimePicked('vendrediStart', date)}}
                                    onCancel={() => {this._hideDateTimePicker('vendrediDate')}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:20,padding:10,backgroundColor:'#003366'}} onPress={() => {this._showDateTimePicker('vendrediDateEnd')} }>
                                <Text style={{color:'#ffffff'}}> Fin : {this.state.vendrediEnd}</Text>
                                <DateTimePicker
                                    mode={'time'}
                                    isVisible={this.state.vendrediDateEnd}
                                    onConfirm={(date) => {this._handleTimePicked('vendrediEnd', date)}}
                                    onCancel={() => {this._hideDateTimePicker('vendrediDateEnd')}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                <TouchableOpacity style={{padding:10, backgroundColor:'#cccccc'}}>
                    <Text>Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{padding:10, backgroundColor:'#003366'}} onPress={() => {this._contactSend()}}>
                    <Text style={{color:'#ffffff'}}>Confirmer</Text>
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

        const trainingHours = JSON.parse(team.trainingHours);
        return (
            <View>

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