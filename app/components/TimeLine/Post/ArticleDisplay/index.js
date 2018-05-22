import React, {Component} from 'react';
import {
    Text,
    View, ScrollView, Image, StyleSheet, TouchableOpacity,Dimensions
} from 'react-native';

import LocalImage from "../Content/LocalImage/index";

class ArticleDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let content = JSON.parse(JSON.stringify(eval("(" + this.props.content.toString() + ")")));
        const  originalWidth1 = this.props.medias[0].width;
        const originalHeight1 = this.props.medias[0].height;
        const windowWidth = Dimensions.get('window').width;
        const widthChange1 = (windowWidth - 10) / originalWidth1;
        const  originalWidth2 = this.props.medias[1].width;
        const originalHeight2 = this.props.medias[1].height;
        const widthChange2 = (windowWidth - 10) / originalWidth2;
        this.props.medias[0].path = this.props.medias[0].path.replace(new RegExp(/\\/g),"/");
        this.props.medias[0].path = this.props.medias[0].path.replace('public/', '');

        this.props.medias[1].path = this.props.medias[1].path.replace(new RegExp(/\\/g),"/");
        this.props.medias[1].path = this.props.medias[1].path.replace('public/', '');
        return (
            <View>
                <TouchableOpacity style={{position: 'absolute', left: 10, top: 10,justifyContent:'center',alignItems:'center', zIndex:100, backgroundColor:'rgba(0,0,0,0.5)', height:40,width:40, borderRadius:20}}
                                  onPress={() => {this.props.disband(false)}}>
                    <Image style={{width: 15, height: 15}} resizeMode='contain'
                           source={require('../../../../assets/img/picto/white-cross.png')} />
                </TouchableOpacity>
                <ScrollView>

                    <Image source={{uri:'http://192.168.1.95:3000/' + this.props.medias[0].path}} style={{width: originalWidth1 * widthChange1, height: originalHeight1 * widthChange1}}/>
                    <View
                        style={{flexDirection: 'row', paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{width: 20, height: 30}} resizeMode='contain'
                               source={require('../../../../assets/img/picto/menu/actions/article.png')}/>
                        <Text style={{color: '#00A65B', marginLeft: 10, fontSize: 12, fontWeight: '500'}}>Article</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: '#00A65B', alignSelf: 'center', width: '10%'}}/>
                    <View style={{marginHorizontal: 5, marginVertical: 20}}>
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>
                            {this.props.title}
                        </Text>
                        <View>
                            <Text style={{textAlign: 'center', fontSize: 16}}>{content.homeClub.name} {content.homeScore}
                                - {content.guessScore} {content.guessClub.name}</Text>
                        </View>

                        <View style={style.half}>
                            <Text style={style.title}>1 ère Mi-Temps</Text>
                            <Text style={{textAlign: 'left'}}>{content.firstHalf_content}</Text>
                        </View>

                        <Image source={{uri: 'http://192.168.1.95:3000/' + this.props.medias[1].path}} style={{width: originalWidth2 * widthChange2, height: originalHeight2 * widthChange2}}/>
                        <View style={style.half}>
                            <Text style={style.title}>2 ème Mi-Temps</Text>
                            <Text style={{textAlign: 'left'}}>{content.secondHalf_content}</Text>
                        </View>

                        <View style={style.half}>
                            <Text style={style.title}>En Bref</Text>
                            <Text style={{textAlign: 'left'}}>{content.conclusion}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ArticleDisplay;
const style = StyleSheet.create({
    title: {marginBottom: 20, textAlign: 'center', fontSize: 14, fontWeight: '500'},
    half: {
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 10
    }
});