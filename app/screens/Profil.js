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
let stats = null;
export default class Profil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goals: 0,
            assist: 0,
            strongFoot: strongFoot[1],
            weight: 0,
            height: 100,
        }
        this._renderStats = this._renderStats.bind(this);
        this._renderChange = this._renderChange.bind(this);
        this._confirmChange = this._renderStats.bind(this);
    }

    componentWillMount() {
        this._renderStats();
    }

    _renderStats() {
        stats = (
            <View>
                <TouchableOpacity onPress={() => {
                    this._renderChange()
                }} style={[STYLE.tab, {justifyContent: 'center'}]}>
                    <Text style={STYLE.tabText}>Milieu axial, 25ans</Text>
                    <Icon style={{right: 20, position: 'absolute'}} name="create" size={20} color="#003366"/>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>But</Text>
                    <Text>{this.state.goals}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Passe Décisive</Text>
                    <Text>{this.state.assist}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Poids</Text>
                    <Text>{this.state.weight} kg</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Taille</Text>
                    <Text>{this.state.height} cm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLE.tab, STYLE.even]}>
                    <Text style={STYLE.tabText}>Pied fort</Text>
                    <Text>{this.state.strongFoot}</Text>
                </TouchableOpacity>
            </View>
        );
        this.forceUpdate();
    }

    _confirmChange() {
        this._renderStats();
        this.forceUpdate();
    }

    onChange(state, newvalue) {
        this.setState({[state]: newvalue})
    }

    _renderChange() {
        stats = (
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
                             default={this.state.goals}
                             color="#003366"
                             numColor="#003366"
                             onNumChange={(num) => {
                                 this.setState({goals: num})
                             }}/>
                </View>
                <TouchableOpacity style={[STYLE.tab]}>
                    <Text style={STYLE.tabText}>Nombre de passe décisives</Text>
                    <Spinner max={1000}
                             min={0}
                             default={this.state.assist}
                             color="#003366"
                             numColor="#003366"
                             onNumChange={(num) => {
                                 this.setState({assist: num})
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
                        placeholder={this.state.weight.toString()}
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
                        placeholder={this.state.height.toString()}
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
                            })} selectedValue={this.state.strongFoot}
                            prompt="Pied Fort">


                        {strongFoot.map((i, index) => (
                            <Picker.Item key={index} label={i} value={i}/>
                        ))}

                    </Picker>
                </View>
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
                {stats}
            </View>
        )
    }
};
