import React from 'react';
import {timeLineStyle} from "../../assets/css/global";
import {Text, TouchableOpacity, View} from "react-native";
import {Avatar} from "../User/Avatar/index";

const Team = (props) => {
    return (
        <View style={[props.style, {marginLeft: '7.5%', height: 100, width: '85%'}]}>
            <View>
                <Avatar user={props.team.club}/>
                <View style={{flexDirection: 'column'}}>
                    <Text style={timeLineStyle.title}>{props.team.club.name}</Text>
                    <Text style={{
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        fontSize: 10,
                        backgroundColor: '#003366',
                        color: '#ffffff',
                        marginRight: 10
                    }}>{props.team.category.label} {props.team.division.label}</Text>
                </View>
            </View>
        </View>
    )
};

const SelectedTeam = (props) => {
    console.log(props);
    return (
        props.team ? <Team team={props.team}/> : <NoTeam placeholder={props.placeholder}/>
    )
};

const NoTeam = (props) => {
    return (
        <View style={[props.style, {marginLeft: '7.5%', height: 100, width: '85%'}]}>
            <View onPress={() => {
                props.controlFunc()
            }} style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={[timeLineStyle.profilePic, {backgroundColor: '#cccccc'}]}/>
                <Text style={[timeLineStyle.title, {color: '#979797'}]}>{props.placeholder}</Text>
            </View>
        </View>
    )
};

export default SelectedTeam;