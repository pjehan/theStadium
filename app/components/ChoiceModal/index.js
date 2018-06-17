import React, {Component} from 'react';
import {ActionSheetIOS, FlatList, Modal, Platform, Text, TouchableOpacity, View} from 'react-native';

class ChoiceModalContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            items: [],
        };
    }
    static choiceModalInstance;
    static show(config, callback) {
        this.choiceModalInstance.showActionSheet(config, callback);
    }
    showActionSheet(config, callback) {
        if (Platform.OS === "ios") {
            if (typeof config.options[0] === "object") {
                let options = config.options;
                config.options = options.map(item => {
                    return item.text;
                });
                ActionSheetIOS.showActionSheetWithOptions(config, callback);
            } else {
                ActionSheetIOS.showActionSheetWithOptions(config, callback);
            }
        } else {
            this.setState({
                items: config.options,
                title: config.title,
                message: config.message,
                destructiveButtonIndex: config.destructiveButtonIndex,
                cancelButtonIndex: config.cancelButtonIndex,
                modalVisible: true,
                callback: callback,
            });
        }
    }
    componentDidMount() {
        if (!this.props.autoHide && this.props.duration) {
            console.warn(`It's not recommended to set autoHide false with duration`);
        }
    }
    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.state.callback(this.state.cancelButtonIndex);
                    this.setState({ modalVisible: false });
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.state.callback(this.state.cancelButtonIndex);
                        this.setState({ modalVisible: false });
                    }}
                    style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        flex: 1,
                        alignItems:'center',
                        justifyContent: "center"
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            backgroundColor: "#fff",
                            height: this.state.length * 80,
                            maxHeight: "100%",
                            paddingHorizontal: 15,
                            paddingTop:15,
                            width:'90%',
                            elevation: 4,
                            marginTop:'auto',
                            borderRadius:10,
                        }}
                    >
                        {this.state.title ? <Text style={{textAlign:'center', fontSize:16, fontWeight:'bold',color: "#757575" }}>{this.state.title}</Text> : null}
                        {this.state.message ? <Text style={{textAlign:'center', color: "#757575", fontSize:14 }}>{this.state.message}</Text> : null }
                        {this.state.title ? <View style={{marginTop:15,height:1, backgroundColor:'#cccccc'}}/> : null }
                        <FlatList
                            data={this.state.items}
                            keyExtractor={(item, index) => String(index)}
                            ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:'#cccccc'}}/>}
                            renderItem={({ index, item }) => {
                                return typeof this.state.items[0] === "string" ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.state.callback(parseInt(index));
                                            this.setState({ modalVisible: false });
                                        }}
                                        style={{alignItems:'center',justifyContent:'center',width:'100%', height:50,backgroundColor:'#ffffff'}}>
                                        <Text style={{color:'#003366',fontSize:16,fontWeight:'bold'}}>{item}</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.state.callback(parseInt(index));
                                            this.setState({ modalVisible: false });
                                        }}
                                        style={{ borderColor: "transparent" ,}}>
                                        <Text style={{color:'#1E82FF',fontSize:16,fontWeight:'bold'}}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop:'auto',alignItems:'center',justifyContent:'center',borderRadius:10,marginVertical:6,height:50,backgroundColor:'#ffffff', width:'90%'}} onPress={() => {
                        this.state.callback(this.state.cancelButtonIndex);
                        this.setState({ modalVisible: false });
                    }}>
                        <Text style={{color:'#FF0000',fontSize:16,fontWeight:'bold'}}>Annuler</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }
}

export {ChoiceModalContainer}