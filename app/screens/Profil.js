import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet,
    Picker, ActivityIndicator, Modal
} from 'react-native';
import {Icon} from 'react-native-elements';
import Placeholder from 'rn-placeholder';
import Spinner from 'react-native-number-spinner';
import CustomInput from "../components/CustomInput";
import {userActions} from "../_actions/user";
import Moment from "moment";
import {connect} from "react-redux";

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
    role: {flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        height: 50,
        justifyContent: 'center',
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
let strongFoot = ['Gauche', 'Droit', 'Ambidextre'];


let stats = {};
let statsComponent = null;
const initialState = {
    goalsNbr: null,
    passNbr: null,
    strongFoot: strongFoot[1],
    weight: null,
    height: null,
}

class Profil extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this._renderStats = this._renderStats.bind(this);
        this._renderChange = this._renderChange.bind(this);
        this._confirmChange = this._renderStats.bind(this);
        this.stateSetting = this.stateSetting.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.stateSetting();
        }
    }

    componentWillMount() {
        this.stateSetting();
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.props.dispatch(userActions.removePlayer());
        statsComponent = null;
        stats = {};
        this.setState(initialState)
    }

    _isUser(user, inspected) {
        return user.id === inspected.id;
    }

    stateSetting() {
        const {navigation} = this.props;
        const state = navigation.state.params;

        if (this._isUser(state.currentUser, state.inspectedUser)) {
            stats = state.inspectedUser.stats;
        } else if (this.props.inspectedUser && this.props.inspectedUser.id) {
            stats = this.props.inspectedUser.stats;
        }
        this.setState({goalsNbr: stats.goalsNbr});
        this.setState({passNbr: stats.passNbr});
        this.setState({weight: stats.weight});
        this.setState({height: stats.height});
        this.setState({id: stats.id});
        this.forceUpdate();
    }

    _renderStats() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        return (
            <View>
                <View style={STYLE.role}>
                <Placeholder.Line
                    color="#003366"
                    width="75%"
                    textSize={14}
                    style={{alignSelf:'center'}}
                    onReady={this.state.goalsNbr || this.state.goalsNbr === 0}>
                    <TouchableOpacity  onPress={() => {
                        this._isUser(state.currentUser, state.inspectedUser) ? this._renderChange() : null
                    }} style={STYLE.tab}>
                        <Text style={STYLE.tabText}>Milieu axial, 25ans</Text>
                        {this._isUser(state.currentUser, state.inspectedUser) ?
                            <Icon style={{right: 20, position: 'absolute'}} name="create" size={20}
                                  color="#003366"/> : null}
                    </TouchableOpacity>
                </Placeholder.Line>
                </View>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>But</Text>
                    <Placeholder.Line
                        style={{alignSelf:'center'}}
                        color="#003366"
                        width="33%"

                        textSize={14}
                        onReady={this.state.goalsNbr || this.state.goalsNbr === 0}>
                        <Text>{stats.goalsNbr}</Text>
                    </Placeholder.Line>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Passe Décisive</Text>
                    <Placeholder.Line
                        style={{alignSelf:'center'}}
                        color="#003366"
                        width="33%"

                        textSize={14}
                        onReady={this.state.passNbr || this.state.passNbr === 0}>
                        <Text>{stats.passNbr}</Text>
                    </Placeholder.Line>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Poids</Text>
                    <Placeholder.Line
                        style={{alignSelf:'center'}}
                        color="#003366"
                        width="33%"

                        textSize={14}
                        onReady={this.state.weight}>
                        <Text>{stats.weight} kg</Text>
                    </Placeholder.Line>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Taille</Text>
                    <Placeholder.Line
                        style={{alignSelf:'center'}}
                        color="#003366"
                        width="33%"

                        textSize={14}
                        onReady={this.state.height}>
                        <Text>{stats.height} cm</Text>
                    </Placeholder.Line>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Pied fort</Text>
                    <Placeholder.Line
                        style={{alignSelf:'center'}}
                        color="#003366"
                        width="33%"

                        textSize={14}
                        onReady={this.state.strongFoot !== null}>
                        <Text>{stats.strongFoot}</Text>
                    </Placeholder.Line>
                </TouchableOpacity>
            </View>
        );

    }

    _confirmChange() {
        this.props.dispatch(userActions.putPlayer(stats));
        statsComponent = null;
        this._renderStats();
    }

    onChange(state, newvalue) {
        this.setState({[state]: newvalue});

        stats[state] = newvalue;
    }

    _loadingModal() {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.isFetching}
                onRequestClose={() => {
                    console.log('close modal')
                }}>
                <View style={STYLE.modalBackground}>
                    <View style={STYLE.activityIndicatorWrapper}>
                        <ActivityIndicator
                            size={'large'}/>
                        <Text>Récupération des données utilisateurs en cours</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    _renderChange() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        stats = this.props.inspectedUser.stats || state.inspectedUser.stats;
        statsComponent = (
            <View>
                <TouchableOpacity onPress={() => {
                    this._confirmChange()
                }} style={[STYLE.tab, {justifyContent: 'center'}]}>
                    <Text style={STYLE.tabText}>Milieu axial, 25ans</Text>
                    <Icon style={{right: 20, position: 'absolute'}} name="create" size={20} color="#003366"/>
                </TouchableOpacity>
                <View style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Nombre de buts</Text>
                    <Spinner max={1000}
                             min={0}
                             default={stats.goalsNbr}
                             color="#003366"
                             numColor="#003366"
                             onNumChange={(num) => {
                                 stats.goalsNbr = num
                             }}/>
                </View>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Nombre de passe décisives</Text>
                    <Spinner max={1000}
                             min={0}
                             default={stats.passNbr}
                             color="#003366"
                             numColor="#003366"
                             onNumChange={(num) => {
                                 stats.passNbr = num;
                             }}/>
                </TouchableOpacity>
                <View style={[STYLE.tab, STYLE.even, {justifyContent: 'space-between'}]}>
                    <Text style={STYLE.tabText}>Poids en KG</Text>
                    <CustomInput
                        onChangeParent={(state, newvalue) => this.onChange(state, newvalue)}
                        keyboardType={'numeric'}
                        textColor={'#333333'}
                        input={{width: 50}}
                        container={{justifyContent: 'flex-end'}}
                        placeholder={stats.weight}
                        state={'weight'}/>

                </View>
                <View style={[STYLE.tab, STYLE.even, {justifyContent: 'space-between'}]}>
                    <Text style={STYLE.tabText}>Taille en cm</Text>
                    <CustomInput
                        onChangeParent={(state, newvalue) => this.onChange(state, newvalue)}
                        keyboardType={'numeric'}
                        textColor={'#333333'}
                        input={{width: 50}}
                        container={{justifyContent: 'flex-end'}}
                        placeholder={stats.height}
                        state={'height'}/>

                </View>
                <View style={[STYLE.tab, STYLE.even, {justifyContent: 'space-between'}]}>
                    <Text style={STYLE.tabText}>Pieds Fort</Text>
                    <Picker style={{
                        width: 100,
                        paddingLeft: 20,
                        paddingRight: 20,
                        height: 40,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                            onValueChange={itemValue => this.setState({strongFoot: itemValue}, function () {
                                this.forceUpdate();
                            })} selectedValue={stats.strongFoot}
                            prompt="Pied Fort">


                        {strongFoot.map((i, index) => (
                            <Picker.Item key={index} label={i} value={i}/>
                        ))}

                    </Picker>
                </View>
                <TouchableOpacity style={{
                    flex: 2 / 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                    padding: 10,
                    backgroundColor: '#003366'
                }} onPress={() => {
                    this.props.navigation.dispatch(userActions.putPlayer(stats));
                    this._renderStats();
                }}>
                    <Text>Valider</Text>
                </TouchableOpacity>
            </View>
        );
        this.forceUpdate();
    }

    render() {
        let {width} = Dimensions.get('window');
        const {navigation} = this.props;
        const state = navigation.state.params;
        return (
            <View style={{backgroundColor: '#ffffff'}}>
                <Image style={{height: 200, width: width}} resizeMode={'cover'}
                       source={require('../assets/img/thestadium/profil.jpeg')}/>
                {this.props.isFetching || !state.inspectedUser.stats ? null : this.stateSetting.bind(this)}

                {this._renderStats()}
            </View>
        )
    }
};
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        inspectedUser: state.inspectedUser.user,
        isFetching: state.inspectedUser.fetching,
    };
};
export default connect(mapStateToProps)(Profil);