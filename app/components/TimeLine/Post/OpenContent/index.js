import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    TextInput
} from 'react-native';
import {Icon} from 'react-native-elements'
import LocalImage from "../Content/LocalImage/index";
class OpenContent extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal(visible) {
        this.props.toggleModal(visible);
    }
    render()  {
        return (
            <Modal style={{backgroundColor:'#000000',flex:1}} animationType={"slide"} transparent={false}
                   visible={this.props.visible}
                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                <View style={{backgroundColor:'#000000'}}>
                <View style={{justifyContent:'space-around', flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => this.toggleModal(false)}>
                        <Icon name='clear' color='#ffffff' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{}}>
                        <Icon type="font-awesome" name='ellipsis-h' color='#ffffff' />
                    </TouchableOpacity>
                </View>
                    <Text style={{marginTop:20, marginBottom:20, color:'#ffffff'}}>
                        Les jeunes du club on été entrainé par l'ancien pro du club MR BIBOU
                    </Text>
                    <LocalImage source={'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'} />
                </View>
            </Modal>
            )
    }
}
export default OpenContent;