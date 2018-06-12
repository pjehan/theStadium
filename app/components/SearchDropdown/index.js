import React, {Component} from 'react';

import {
    Text,
    View,
    TextInput,
    Keyboard,
    DatePickerAndroid,
    TouchableOpacity,
    Platform, StyleSheet,
    TimePickerAndroid, ScrollView,
    Modal, FlatList
} from 'react-native';
import CustomInput from "../CustomInput";
const initialState = {
    dataList: [],
    query: '',
}
export default class SearchDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this._filterClub = this._filterClub.bind(this);
        this._renderResult = this._renderResult.bind(this);
        this.onChangeInfos = this.onChangeInfos.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps
        console.log(this.props)
        if(!nextProps.dataList){

        }
    }

    onChangeInfos(state, newvalue){
        this.setState({[state]: newvalue});
    }

    _filterClub(query, dataSource) {
        if (query === '') {
            return [];
        }else{
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if (data) {
            return data.filter(data => data.name.search(regex) >= 0);
        }
        }
    }

    _onClose(canceled, data) {
        if(!canceled) {
            this.props.onModalClose(false, data);
            this.setState(initialState)
        }else {
            this.props.onModalClose(false, null);
            this.setState(initialState)
        }
    }

    _renderResult(data) {
        return (
            <FlatList
                data={data}
                renderItem={({item}) => this._renderItem(item)}
            />
        )
    }

    _renderItem(item){
        return (
            <TouchableOpacity onPress={() => this._onClose(false, item)}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    _renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderColor: '#cccccc',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 40
            }}>
                <TouchableOpacity onPress={() => {
                    this._onClose(true)
                }}>
                    <Text>Annuler</Text>
                </TouchableOpacity>
                <Text style={{fontWeight: '600'}}>{this.props.title}</Text>
                <TouchableOpacity onPress={() => {
                }}>
                    <Text style={{fontWeight: '600', color: '#003366'}}>Valider</Text>
                </TouchableOpacity>
            </View>
        )
    }


    render(){
        const {query, dataList} = this.state;
        const data = this._filterClub(query, this.props.dataList);
        return (
            <Modal style={{flex: 1}} animationType={"slide"} transparent={false}
                   visible={this.props.visible}

                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                {this._renderHeader()}
                <View style={[searchStyle.inputContainer]}>

                    <CustomInput
                        container={{justifyContent:'flex-start',flex:1,paddingHorizontal:10}}
                        placeholder={'Rechercher'}
                        state={'query'}
                        textColor={'#000000'}
                        placeholderTextColor={'#cccccc'}
                        borderColor={'#cccccc'}
                        backgroundColor={'#ffffff'}
                        security={false}
                        onChangeParent={(state, newvalue) => this.onChangeInfos(state, newvalue)}
                    />
                </View>
                {this._renderResult(data)}
            </Modal>
        )
    }
}
const searchStyle =  StyleSheet.create({
    tabText: {
        marginLeft:15,
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
    tabs:{
        flexDirection:'row',
        alignItems:'center'
    },
    tabContainer: {
        backgroundColor:'#FFF',
        paddingHorizontal:10,
        paddingVertical:15
    },
    inputContainer: {
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingVertical:10,
        alignItems:'center',
    },
    commentInputText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginVertical: 6,
        marginHorizontal: 10,
    },
});