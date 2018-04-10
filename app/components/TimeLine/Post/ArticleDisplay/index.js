import React, {Component} from 'react';
import {
    Text,
    View, ScrollView, Image, StyleSheet, TouchableOpacity
} from 'react-native';

import LocalImage from "../Content/LocalImage/index";

class ArticleDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let content = JSON.parse(JSON.stringify(eval("(" + this.props.content.toString() + ")")));
        console.log(content)
        return (
            <View>
                <TouchableOpacity style={{position: 'absolute', left: 10, top: 10,justifyContent:'center',alignItems:'center', zIndex:100, backgroundColor:'rgba(0,0,0,0.5)', height:40,width:40, borderRadius:20}}
                                  onPress={() => {this.props.disband(false)}}>
                    <Image style={{width: 15, height: 15}} resizeMode='contain'
                           source={require('../../../../assets/img/picto/white-cross.png')} />
                </TouchableOpacity>
            <ScrollView>

                <LocalImage source={this.props.medias[0].path}/>
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
                        <Text style={{textAlign: 'center', fontSize: 16}}>{content.homeClub} {content.homeScore}
                            - {content.guessScore} {content.guessClub}</Text>
                    </View>

                    <View style={style.half}>
                        <Text style={style.title}>1 ère Mi-Temps</Text>
                        <Text style={{textAlign: 'left'}}>{content.firstHalf_content}</Text>
                    </View>

                    <LocalImage source={this.props.medias[1].path}/>
                    <View style={style.half}>
                        <Text style={style.title}>2 ème Mi-Temps</Text>
                        <Text style={{textAlign: 'left'}}>{content.secondHalf_content}</Text>
                    </View>

                    <View style={style.half}>
                        <Text style={style.title}>En Bref</Text>
                        <Text style={{textAlign: 'left'}}>{content.secondHalf_content}</Text>
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