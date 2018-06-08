import React, {Component} from 'react';

import {
    Text,
    View,
    TextInput,
    Keyboard,
    DatePickerAndroid,
    TouchableOpacity,
    Platform,
    TimePickerAndroid, ScrollView,
    Modal
} from 'react-native';
import CustomInput from "../CustomInput";

export default class SearchDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            query: ''
        };
        this._filterClub = this._filterClub.bind(this);
        this._renderResult = this._renderResult.bind(this);
        this.onChangeInfos = this.onChangeInfos.bind(this);
    }

    onChangeInfos(state, newvalue){
        this.setState({[state]: newvalue});
    }

    _filterClub(query, dataSource) {
        if (query === '') {
            return [];
        }
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if (data) {
            return data.filter(data => data.name.search(regex) >= 0);
        }
    }

    _setClub(item) {
        this.setState({
            clubQuery: item.name,
            club: item.name,
            post: {content: item.name},
            hideClub: true,
        });
    }

    _renderResult() {
        return null
    }


    render(){
        const {query, dataList} = this.state;
        const data = this._filterClub(query, dataList);
        return (
            <Modal style={{flex: 1}} animationType={"slide"} transparent={false}
                   visible={this.props.visible}

                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: '#cccccc',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: 40
                }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({visible:false})
                    }}>
                        <Text>Annuler</Text>
                    </TouchableOpacity>
                    <Text style={{fontWeight: '600'}}>{this.props.title}</Text>
                    <TouchableOpacity onPress={() => {
                    }}>
                        <Text style={{fontWeight: '600', color: '#003366'}}>Valider</Text>
                    </TouchableOpacity>
                </View>
                <CustomInput
                    container={{justifyContent:'flex-start',flex:1}}
                    placeholder={'Rechercher...'}
                    input={[{flex:1, padding: 5}]}
                    state={'search'}
                    textColor={'#000000'}
                    placeholderTextColor={'#cccccc'}
                    borderColor={'#cccccc'}
                    backgroundColor={'#ffffff'}
                    security={false}
                    returnKeyType={'done'}
                    onChangeParent={(state, newvalue) => this.onChangeInfos(state, newvalue)}
                />
                {this._renderResult()}
            </Modal>
        )
    }
}
