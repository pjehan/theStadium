import React, {Component} from 'react';

import Autocomplete from 'react-native-autocomplete-input';
import {View,StyleSheet,AsyncStorage, Text,KeyboardAvoidingView,TouchableOpacity, Picker, Item} from 'react-native';
import {GLOBAL_STYLE} from '../../../assets/css/global';
import CustomInput from '../../../components/CustomInput';
const style = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        height: 48,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
});

const programmingLanguages = [
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'JavaScript',
    value: 'js',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'Ruby',
    value: 'ruby',
  },
  {
    label: 'C#',
    value: 'csharp',
  },
  {
    label: 'C++',
    value: 'cpp',
  },
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'Go',
    value: 'go',
  }
];
export default class PlayerInfos extends Component {
  constructor(props) {
    super(props);
      this.state = {
          dataSource : ['oui','jesuis','cheunnnourry','marabou'],
          inputValue : '',
          query:'',
          clubQuery: '',
          teamQuery: '',

          clubList: ['FC GUICHEN', 'ZIZI', 'OUI'],
          teamList: ['Sénior D3', 'U17', 'Sénior féminine F1'],

          hideTeam: false,
          hideClub: false,

            poste: '',
          team: '',
    }
      this._filterData = this._filterData.bind(this)
  }
componentDidMount() {
    AsyncStorage.getItem('@appStore:clubList').then(value => {console.log(value);this.setState({team: value[0].label});this.forceUpdate()});
}
    _filterData(query, dataSource) {
        if (query === '') {
            return [];
        }
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return data.filter(data => data.search(regex) >= 0);
    }
    render() {
        const { teamQuery, clubQuery, clubList, teamList } = this.state;
        const teamData = this._filterData(teamQuery, teamList);
        const clubData = this._filterData(clubQuery, clubList);
        return (

          <View style={{flex: 7,backgroundColor:'white', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30}}>

              <View style={{flex: 2, justifyContent: 'center'}}>
                  <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Le football et vous</Text>
                  <Text style={[GLOBAL_STYLE.miniDescription]}>
                      Ajoutez de vraies informations pour vous permettre déchanger avec les joueurs et les clubs
                  </Text>
              </View>

              <KeyboardAvoidingView
                  style={{flex:3, justifyContent: 'space-around', alignItems:'center'}}
                  behavior="padding">
                  <View style={[{height:40,width:'85%'}]}>
                      <Autocomplete
                          autoCapitalize="none"
                          autoCorrect={false}
                          containerStyle={styles.autocompleteContainer}
                          data={clubData}
                          defaultValue={clubQuery}
                          placeholder={'Nom de votre Club'}
                          onChangeText={text => this.setState({ clubQuery: text })}
                          hideResults={this.state.hideClub}
                          renderItem={item => (
                              <TouchableOpacity onPress={() => this.setState({ clubQuery: item, hideClub: true })}>
                                  <Text>{item}</Text>
                              </TouchableOpacity>
                          )}
                      />
                  </View>
                  <Text>{this.state.team}</Text>
                  <View style={[{height:40,width:'85%'}]}>
                      <Autocomplete
                          autoCapitalize="none"
                          autoCorrect={false}
                          containerStyle={styles.autocompleteContainer}
                          data={teamData}
                          defaultValue={teamQuery}
                          placeholder={'Votre équipe'}
                          onChangeText={text => this.setState({ teamQuery: text })}
                          hideResults={this.state.hideTeam}
                          renderItem={item => (
                              <TouchableOpacity onPress={() => this.setState({ teamQuery: item, hideTeam: true })}>
                                  <Text>{item}</Text>
                              </TouchableOpacity>
                          )}
                      />
                  </View>
            <View style={{backgroundColor:'#eeeeee'}}>
          <Picker style={GLOBAL_STYLE.input}
          prompt="Poste joué"
    selectedValue={this.state.poste}
    onValueChange={itemValue => this.setState({ poste: itemValue })}>
    {programmingLanguages.map((i, index) => (
      <Picker.Item key={index} label={i.label} value={i.value} />
    ))}
      </Picker>
    </View>
    <View style={{justifyContent:'flex-start', alignItems: 'flex-start'}}>
      <Text style={{fontSize:12}}>Le nom de votre club napparait pas dans la liste </Text>
      <Text style={{fontSize:12}}>Signalez un problème </Text>
    </View>
              </KeyboardAvoidingView>
          </View>
        )
    }

}
const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor:'#eeeeee'
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});
