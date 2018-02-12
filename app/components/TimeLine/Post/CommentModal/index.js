import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    FlatList
} from 'react-native';
import {Icon} from 'react-native-elements';
import CustomInput from "../../../CustomInput";
import {GLOBAL_STYLE} from "../../../../assets/css/global";

const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width:'100%',
        paddingTop:5,
        paddingBottom: 5,
        borderBottomWidth:0.5,borderColor:'#cccccc',
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius:45,
        marginRight: 10,
        marginLeft:10,
    },
    text: {
        color:'black',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500'
    },
    content: {
      fontSize:14,
        paddingRight:80
    },
    userAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10
    },
    ownerStyle: {
        flexDirection: 'row',
        padding:5,
    },
    userActionText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:10
    },
    actionText: {
        fontSize: 12
    },
    teamText: {
        color: "white",
        fontSize:12
    },
    teamBackground: {
        backgroundColor: '#003366',
        padding: 10,
        paddingTop:2,
        paddingBottom:2
    },
    timeText: {
        fontSize:12,
        color:'#cccccc',
        fontWeight: '400',
        marginLeft:2
    }
});
export default class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments : this.props.post.post_comments || null,
            userMessage:'',
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderList = this.renderList.bind(this);
        };

    renderItem(item){
        return (
            <View style={PostStyle.container}>
                <View style={PostStyle.ownerStyle}>
                <Image style={PostStyle.profilePic} source={{uri: item.user.profilePic}}/>
                    <View>
                    <Text style={PostStyle.title}>{item.user.firstName} {item.user.lastName}</Text>
                        <Text style={PostStyle.content}>{item.comment}</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderList() {

            return (
                <FlatList
                    data={this.state.comments}
                    renderItem={({item}) => this.renderItem(item)}
                />
            )

    }
    toggleModal(visible) {
        this.props.toggleCommentModal(visible);
    }

onChange(state, newvalue) {
    this.setState({[state]: newvalue})
}
onSendComment() {
console.log('send');
}

    render() {
        return (
            <View>
                <Modal animationType={"slide"} transparent={false}
                       visible={this.props.visible}
                       onRequestClose={() => {
                           console.log("Modal has been closed.")
                       }}>
                    <View style={{flexDirection: 'row',backgroundColor:'#eeeeee',borderBottomWidth:0.5,borderColor:'#cccccc', justifyContent: 'center',alignItems:'center', height: 70}}>
                    <TouchableOpacity>
                        <Icon color='#003366'
                              size={25}
                              name={'expand-less'}
                              onPress={() => {
                                  this.toggleModal(false)
                              }} />
                        <Text style={{color:'#003366'}}>Revenir à l'article</Text>
                    </TouchableOpacity>
                    </View>
                    {this.renderList()}
                    <View style={{justifyContent:'center', backgroundColor:'#cccccc', padding:5}}>
                    <CustomInput
                        ref={input => { this.textInput = input }}
                        container={{alignItems:'center',backgroundColor:'#ffffff', borderRadius:35,height:35, flexDirection:'row'}}
                        input={{flex:4,borderRadius:35,height:'100%', paddingHorizontal:10}}
                        textColor={'#333333'}
                        placeholder={'Commentez...'}
                        security={false}
                        action={'send'}
                        state={'userMessage'}
                        onChangeParent={(state,newvalue) => this.onChange(state,newvalue)}
                        onTriggeredAction={(value) => this.onSendComment(value)}
                    />
                    </View>
                </Modal>
            </View>
        )
    }
}