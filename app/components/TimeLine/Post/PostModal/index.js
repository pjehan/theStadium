import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import  {TypeEnum} from "../contentType";
import CustomInput from '../../../CustomInput'
import { styles } from '../../../../assets/css/global';
let ModalContent;
const timeLineStyle = StyleSheet.create({
    tabContainer: {
        justifyContent: 'space-between',
        backgroundColor:'#ffffff',
        flexDirection:'row',
        width: '100%',
        height: 40
    },
    tabButton: {
        backgroundColor: 'white',
        flex:1,
        height:'100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    tabButtonText:{
        color: '#003366',
        fontWeight: '400',
    },
    tabButtonPicto: {
        height:15,
        width:15,
        marginRight:5
    },
    buttonBorder: {
        alignSelf:'center',
        height:'70%',
        width:1,
        backgroundColor:'#cccccc'
    },
    singlePost: {
        marginBottom: 200
    },profilePic: {
        width: 45,
        height: 45,
        borderRadius:45,
        marginRight: 5
    },
    text: {
        color:'black',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
});
class PostModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goals_nbr: 0,
            assists_nbr: 0,
            goals_assists: false,

        };
        this.displayGoalsAssists = this.displayGoalsAssists.bind(this)
        this.displaySimpleArticle = this.displaySimpleArticle.bind(this)
        this.onChangeInfos = this.onChangeInfos.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }
    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue})
    }
    toggleModal(visible, type) {
        this.props.toggleModal(visible, type);
    }

    componentWillMount() {
        switch(this.props.type) {
            case TypeEnum.goals:
                this.displayGoalsAssists(TypeEnum.goals);
                break;
            case TypeEnum.assists:
                this.displayGoalsAssists(TypeEnum.assists);
                break;
            case TypeEnum.simple:
                this.displaySimpleArticle();
                break;
            case TypeEnum.article:
                this.displaySimpleArticle();
                break;
        }
    }
    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        switch(this.props.type) {
            case TypeEnum.goals:
                this.displayGoalsAssists(TypeEnum.goals);
                break;
            case TypeEnum.assists:
                this.displayGoalsAssists(TypeEnum.assists);
                break;
            case TypeEnum.simple:
                this.displaySimpleArticle();
                break;
            case TypeEnum.article:
                this.displaySimpleArticle();
                break;
        }
    }
    displayGoalsAssists(type) {
        let Title;
        let Description;
        if(type === TypeEnum.goals) {
            Title = 'But';
            Description = 'Vous avez changé le cours du match !';
        } else {
            Title = 'Passe décisive';
            Description= 'Vous avez mis en valeur votre coéquipier(e) grâce à une passe'
        }
        ModalContent = (<Modal animationType={"slide"} transparent={false}
                               visible={this.props.visible}
                               onRequestClose={() => {
                                   console.log("Modal has been closed.")
                               }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => {
                        this.toggleModal(false, type)
                    }}>
                        <Text>Annuler</Text>
                    </TouchableOpacity>
                    <Text>{Title}</Text>
                    <TouchableOpacity>
                        <Text>Publiez</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modal}>
                    <View style={timeLineStyle.ownerStyle}>
                        <Image style={timeLineStyle.profilePic} source={require('../../../../assets/img/TA-Rennes.jpg')}/>
                        <Text style={timeLineStyle.title}>{this.props.owner.firstName + '' + this.props.owner.lastName}</Text>
                    </View>
                    <Text style={styles.text}>{Description}</Text>
                </View>
                <CustomInput
                    container={''}
                    placeholder={'L\' équipe que vous avez affronté'}
                    input={styles.input}
                    description={'Ecrivez le nom complet de l\' équipe'}
                    state={'club'}
                    textColor={'#333333'}
                    borderColor={'transparent'}
                    backgroundColor={'#eeeeee'}
                    security={false}
                    onChangeParent={(state, newvalue) => {
                        this.onChangeInfos(state, newvalue)
                    }}
                />
            </Modal>

        )
    }

    displaySimpleArticle() {

    }
    render() {
        return (
            <View>
            {ModalContent}
            </View>
            )
    }
}
/**
 * Props
 */
PostModal.propTypes = {
    owner: PropTypes.object,
    /* visible or not */
    type: PropTypes.string, /* Content Type */
};
export default PostModal;