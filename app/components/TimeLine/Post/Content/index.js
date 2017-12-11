import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  {TypeEnum} from "../contentType";
import LocalImage from './LocalImage';
import {View,Image,Dimensions,StyleSheet,Button,DatePickerAndroid,Text} from 'react-native';
let postContent;
let Media;
const PostStyle = StyleSheet.create({
    assist_and_goals: {
        backgroundColor: '#00A65B',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        alignItems:'center',
        marginTop:25,
        marginBottom:15,
        borderRadius:5
    },
    assist_and_goals_icon: {
        height:15,
        width:15,
        marginRight:5
    },
    assist_and_goals_text: {
        color:'white',
        fontSize:12
    }
});
export default class Content extends Component {

    constructor(props) {
        super(props);
        this.returnSimplePost = this.returnSimplePost.bind(this);
        this.returnArticle = this.returnArticle.bind(this);
        this.returnGoalPost = this.returnGoalPost.bind(this);
        this.returnAssistPost = this.returnAssistPost.bind(this);
    }
    returnSimplePost() {
        if(this.props.media){
            /*switch(this.props.media) {
                case this.props.media.length = 1:
                    Media = (<LocalImage source={this.props.media[0].url} />)
                     break;
                case this.props.media.length > 1:
                    Media = null;
                    break;
            }*/
        }
        if(this.props.media.length = 1){
            Media = (<LocalImage source={this.props.media[0].url}/>)
        }
        postContent = (
            <View>
            <Text style={{padding:10, paddingLeft:5, paddingRight:5}}>
                {this.content}
            </Text>
                {Media}
            </View>);
    }
    returnAssistPost(owner, assists, club) {
        let assists_nbr;
        let scored;
        if (!club) {club= 'FC Carquefou'}
        if(assists > 1) {
            assists_nbr = assists + ' passes décisives';
        }else {
            assists_nbr = assists + ' passe décisive';
        }
        if(owner.sex === 'female'){
            scored = ' marquée';
        }else {
            scored = ' marqué';
        }
        postContent = (
            <View>
                <View style={PostStyle.assist_and_goals}>
                    <Image style={PostStyle.assist_and_goals_icon} resizeMode='contain' source={require('../../../../assets/img/picto/menu/actions/white_goal.png')}/>
                    <Text>Passe Décisive</Text>
                </View>
                <Text>
                    {owner.firstName} a {scored} {assists_nbr} contre {club}
                </Text>
            </View>
        )
    }
    returnGoalPost(owner, goals, club) {
        let goals_nbr;
        let scored;
        if (!club) {club= 'FC Carquefou'}
        if(goals > 1) {
            goals_nbr = goals + ' buts';
        }else {
            goals_nbr = goals + ' but';
        }
        if(owner.sex === 'female'){
            scored = 'réalisée';
        }else {
            scored = 'réalisé';
        }
        postContent = (
            <View style={{alignItems:'center',marginBottom:20}}>
                <View style={PostStyle.assist_and_goals}>
                    <Image style={PostStyle.assist_and_goals_icon} resizeMode='contain' source={require('../../../../assets/img/picto/menu/actions/white_assist.png')}/>
                    <Text style={PostStyle.assist_and_goals_text}>Passe Décisive</Text>
                </View>
                <Text>
                    {owner.firstName} a {scored} {goals_nbr} contre {club}
                </Text>
            </View>
        )
    }
    returnArticle() {
        postContent = (
            <View>
                <View>
                    <Text>
                        foekaéifneaiknfikeanf
                    </Text>
                </View>
            </View>
        )
    }
    componentWillMount(){
        const TYPE = this.props.type;
        if(TYPE === TypeEnum.simple){this.returnSimplePost()}
        else if (TYPE === TypeEnum.article){this.returnArticle()}
        else if (TYPE === TypeEnum.goals){this.returnGoalPost(this.props.owner, this.props.goals, this.props.club)}
        else if (TYPE === TypeEnum.assists){this.returnAssistPost(this.props.owner, this.props.assist, this.props.club)}
        /*
        switch(TYPE) {
            case (TYPE === TypeEnum.simple):

                this.returnSimplePost();
                break;
            case (TYPE === TypeEnum.article):
                this.returnArticle();
                break;
            case (TYPE === TypeEnum.goals):
                this.returnGoalPost();
                break;
            case (TYPE === TypeEnum.assists):
                this.returnAssitPost();
                break;
        }*/
        }

    render() {
        return (
                <View>
                    {postContent}
                </View>
        )
    }
}
/**
 * Props
 */
Content.propTypes = {
    owner: PropTypes.object,
    club: PropTypes.string,
    type: PropTypes.string, /* Content Type */
    content: PropTypes.string, /* Content */
    goals_nbr: PropTypes.number, /* number of goals */
    assist_nbr: PropTypes.number, /* number of assists */
};