import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet,
    Picker
} from 'react-native';
import {Icon} from 'react-native-elements';

import Spinner from 'react-native-number-spinner';
import CustomInput from "../components/CustomInput";
import {userActions} from "../_actions/user";

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
});
let strongFoot = ['Gauche', 'Droit', 'Ambidextre'];


let stats = {};
let statsComponent = null;
export default class Profil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goalsNbr: null,
            passNbr: null,
            strongFoot: strongFoot[1],
            weight: null,
            height: null,
        };
        this._renderStats = this._renderStats.bind(this);
        this._renderChange = this._renderChange.bind(this);
        this._confirmChange = this._renderStats.bind(this);
        this.stateSetting = this.stateSetting.bind(this);
    }

    componentWillMount() {

        this.stateSetting();
        this._renderStats();
        this.forceUpdate();
    }

    stateSetting(){
        const {navigation} = this.props;
        const state = navigation.state.params;
        stats = state.inspectedUser.stats;

        this.setState({goalsNbr: state.stats.goalsNbr});
        this.setState({passNbr: state.stats.passNbr});
        this.setState({weight: state.stats.weight});
        this.setState({height: state.stats.height});
        this.setState({id: state.stats.id});
    }

    _renderStats() {
        const {navigation} = this.props;
        const state = navigation.state.params;
        statsComponent = (
            <View>
                <TouchableOpacity onPress={() => {
                    state.currentUser === state.inspectedUser ? this._renderChange() : null
                }} style={[STYLE.tab, {justifyContent: 'center'}]}>
                    <Text style={STYLE.tabText}>Milieu axial, 25ans</Text>
                    {state.currentUser === state.inspectedUser ? <Icon style={{right: 20, position: 'absolute'}} name="create" size={20} color="#003366"/> : null}
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>But</Text>
                    <Text>{stats.goalsNbr}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Passe Décisive</Text>
                    <Text>{stats.passNbr}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Poids</Text>
                    <Text>{stats.weight} kg</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Taille</Text>
                    <Text>{stats.height} cm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Pied fort</Text>
                    <Text>{stats.strongFoot}</Text>
                </TouchableOpacity>
            </View>
        );
        this.forceUpdate();
    }

    _confirmChange() {
        this.props.dispatch(userActions.putPlayer(stats));
        this._renderStats();
    }
    onChange(state, newvalue) {
        this.setState({[state]: newvalue});

       stats[state] = newvalue;
    }

    _renderChange() {
        const {navigation} = this.props;
        const state = navigation.state.params;
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
                <TouchableOpacity style={{flex:2/4, alignItems:'center', justifyContent:'center', marginTop:50,padding:10, backgroundColor:'#003366'}} onPress={() => {
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
        return (
            <View style={{backgroundColor: '#ffffff'}}>
                <Image style={{height: 200, width: width}} resizeMode={'cover'}
                       source={require('../assets/img/thestadium/profil.jpeg')}/>
                {statsComponent}
            </View>
        )
    }
};
