import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  {TypeEnum} from "../contentType";
import LocalImage from './LocalImage';
import {View,Image,Dimensions,StyleSheet,Button,DatePickerAndroid,Text} from 'react-native';
let postContent;
let Media;
export default class Content extends Component {

    constructor(props) {
        super(props);
        this.returnSimplePost = this.returnSimplePost.bind(this);
        this.returnArticle = this.returnArticle.bind(this);
        this.returnGoalPost = this.returnGoalPost.bind(this);
        this.returnAssitPost = this.returnAssitPost.bind(this);
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
                {this.props.content}
            </Text>
                {Media}
            </View>);
    }
    returnGoalPost() {}
    returnAssitPost() {}
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
        else if (TYPE === TypeEnum.goals){this.returnGoalPost()}
        else if (TYPE === TypeEnum.assists){this.returnGoalPost()}
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
    type: PropTypes.string, /* Content Type */
    content: PropTypes.string, /* Content */
    goals_nbr: PropTypes.number, /* number of goals */
    assist_nbr: PropTypes.number, /* number of assists */
};