import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal, Dimensions,
    Image, ScrollView,
} from 'react-native';

import {GLOBAL_STYLE} from '../../../../../assets/css/global';
import CustomInput from "../../../../CustomInput";
import {ImagePicker} from 'expo';
import LocalImage from "../Content/LocalImage/index";

let originalWidth = null;
let originalHeight = null;
let windowWidth = null;
let widthChange = null;
export default class articleDisplay extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <ScrollView>
                <LocalImage source={this.props.medias[0]} />
                <View style={{marginHorizontal:5,marginVertical:20}}>
                    <Text>
                        {this.props.title}
                    </Text>
                    <View>
                        <Text>{this.props.owner.teams[0].team.club.name}</Text>
                        <Text>{this.props.owner.teams[0].team.club.name} - {this.props.owner.teams[0].team.club.name}</Text>
                        <Text>{this.props.owner.teams[0].team.club.name}</Text>
                    </View>

                    <View>
                        <Text>1 ère Mi-Temps</Text>
                        <Text>test</Text>
                    </View>

                    <View>
                        <LocalImage source={this.props.medias[1]} />
                        <Text>2 ème Mi-Temps</Text>
                        <Text>test</Text>
                    </View>

                    <View>
                        <Text>En Bref</Text>
                        <Text>test</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}