import {GLOBAL_STYLE} from "../assets/css/global";
import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ScrollView, FlatList
} from 'react-native';
import CustomInput from "../components/CustomInput";
import {connect} from "react-redux";
import {userActions} from "../_actions/user";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: null
        }
    }
    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue});
    }

    searchUser() {
        this.props.navigation.dispatch(userActions.searchUser(this.state.search))
    }
    _renderItem(item) {
        console.log(item);
        return <View key={this.props.userList.indexOf(item)} ><Text>{item.firstname}</Text></View>
    }

    _renderList(){
        const {userList} = this.props;

        return(
            <FlatList
                data={userList}
                renderItem={({item}) => this._renderItem(item)}
            />
        );
    }
    render() {
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>
                <View>
                <CustomInput
                             container={{justifyContent: 'flex-start'}}
                             placeholder={'Rechercher'}
                             input={[{borderWidth:1, padding: 5, marginTop: 10}]}
                             state={'search'}
                             textColor={'#000000'}
                             placeholderTextColor={'#cccccc'}
                             borderColor={'#cccccc'}
                             backgroundColor={'#ffffff'}
                             security={false}
                             onChangeParent={(state, newvalue) => {
                                 this.onChangeInfos(state, newvalue)
                             }}/>
                <TouchableOpacity onPress={() => {this.searchUser()}}>
                    <Text>
                        Rechercher
                    </Text>
                </TouchableOpacity>
                </View>
                <ScrollView>
                    {this.props.userList && !this.props.isFetching ? this._renderList() : null}
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userList: state.searchList.user,
        isFetching: state.searchList.fetching
    };
};
export default connect(mapStateToProps)(Search);