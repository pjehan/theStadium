import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TypeEnum} from "../contentType";
import LocalImage from './LocalImage';
import {View, Image, Dimensions, StyleSheet, Button, DatePickerAndroid, Text} from 'react-native';

let postContent;
let {height} = Dimensions.get('window');
const PostStyle = StyleSheet.create({
    assist_and_goals: {
        backgroundColor: '#00A65B',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 15,
        borderRadius: 5
    },
    assist_and_goals_icon: {
        height: 15,
        width: 15,
        marginRight: 5
    },
    assist_and_goals_text: {
        color: 'white',
        fontSize: 12
    }
});
export default class Content extends Component {

    constructor(props) {
        super(props);
        this.returnSimplePost = this.returnSimplePost.bind(this);
        this.returnArticle = this.returnArticle.bind(this);
        this.returnGoalPost = this.returnGoalPost.bind(this);
        this.returnAssistPost = this.returnAssistPost.bind(this);
        this.checkType = this.checkType.bind(this);
    }

    returnSimplePost() {
        let url = null;
        if (this.props.media) {
            /*switch(this.props.media) {
                case this.props.media.length = 1:
                    Media = (<LocalImage source={this.props.media[0].url} />)
                     break;
                case this.props.media.length > 1:
                    Media = null;
                    break;
            }*/
        }
        if (this.props.media.length > 0) {
            url = this.props.media[0].url;
        }
        return (
            <View>
                <Text style={{padding: 10, paddingLeft: 5, paddingRight: 5}}>
                    {this.props.content}
                </Text>
                {url ? <LocalImage source={url}/> : null}
            </View>);
    }

    returnAssistPost(owner, assists, club) {
        let assists_nbr;
        let scored;
        if (!club) {
            club = 'FC Carquefou'
        }
        if (assists > 1) {
            assists_nbr = assists + ' passes décisives';
        } else {
            assists_nbr = assists + ' passe décisive';
        }
        if (owner.sex === 'female') {
            scored = ' réalisée';
        } else {
            scored = ' réalisé';
        }
        return (
            <View style={{alignItems: 'center', marginBottom: 20}}>
                <View style={PostStyle.assist_and_goals}>
                    <Image style={PostStyle.assist_and_goals_icon} resizeMode='contain'
                           source={require('../../../../assets/img/picto/menu/actions/white_assist.png')}/>
                    <Text style={PostStyle.assist_and_goals_text}>Passe Décisive</Text>
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
        if (!club) {
            club = 'FC Carquefou'
        }
        if (goals > 1) {
            goals_nbr = goals + ' buts';
        } else {
            goals_nbr = goals + ' but';
        }
        if (owner.sex === 'female') {
            scored = 'marquée';
        } else {
            scored = 'marqué';
        }
        return (
            <View style={{alignItems: 'center', marginBottom: 20}}>

                <View style={PostStyle.assist_and_goals}>
                    <Image style={PostStyle.assist_and_goals_icon} resizeMode='contain'
                           source={require('../../../../assets/img/picto/menu/actions/white_goal.png')}/>
                    <Text style={PostStyle.assist_and_goals_text}>Passe Décisive</Text>
                </View>
                <Text>
                    {owner.firstName} a {scored} {goals_nbr} contre {club}
                </Text>
            </View>
        )
    }

    returnArticle() {
        let url = null;
        if (this.props.media.length > 0) {
            url = this.props.media[0].url;
        }
        return (
                <View>
                    {url ?
                        <View>
                        <View style={{position:'absolute',bottom:0,left:0,right:0,alignItems:'center',zIndex:10,height:150, backgroundColor:'rgba(0,0,0,0.5)'}}>
                            <View style={{borderRadius:5,width:100,backgroundColor:'#00A65B',paddingHorizontal:2,paddingVertical:5,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#ffffff'}}>Article</Text>
                            </View>
                            <View style={{alignSelf:'flex-start',marginLeft:5,justifyContent:'flex-end'}}>
                            <Text style={{color:'#ffffff',fontSize:18, fontWeight:'600'}}>{this.props.title}</Text>
                            <Text  style={{color:'#ffffff',fontSize:14,marginBottom:5}}>{this.props.club} {this.props.score} - {this.props.oponentScore} {this.props.oponentClub}</Text>
                            <Text  style={{color:'#ffffff',fontSize:12}}>Merveilleuse Victoire des joueurs !!! Ce fût un match intense du début à la fin, et c'est finalement avec un peu de ...</Text>
                            </View>
                            </View>
                        <LocalImage source={url} />
                        </View>
                        : null}
                </View>
        )
    }

    checkType() {
        const TYPE = this.props.postType;
        if (TYPE === TypeEnum.simple) {
            this.returnSimplePost()
        }
        else if (TYPE === TypeEnum.article) {
            this.returnArticle()
        }
        else if (TYPE === TypeEnum.goals) {
            this.returnGoalPost(this.props.owner, this.props.goals, this.props.club)
        }
        else if (TYPE === TypeEnum.assists) {
            this.returnAssistPost(this.props.owner, this.props.assist, this.props.club)
        }
    }

    componentWillMount() {
        this.checkType();
    }

    render() {
        const TYPE = this.props.postType;
        return (
            <View>
                {TYPE === TypeEnum.simple ? this.returnSimplePost() :
                    TYPE === TypeEnum.article ? this.returnArticle() :
                        TYPE === TypeEnum.goals ? this.returnGoalPost(this.props.owner, this.props.goals, this.props.club) :
                            this.returnAssistPost(this.props.owner, this.props.assist, this.props.club)}
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
    postType: PropTypes.number, /* Content Type */
    content: PropTypes.string, /* Content */
    goals_nbr: PropTypes.number, /* number of goals */
    assist_nbr: PropTypes.number, /* number of assists */
};