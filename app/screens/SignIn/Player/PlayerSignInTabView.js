import React, {Component} from 'react';
import { Icon } from 'react-native-elements';

import {View,StyleSheet, Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
    },
    tab: {
        alignItems: 'center',
        backgroundColor:'white',
    },
});
export default class PlayerSignInTabView extends Component {
    render() {
        const { routes } = this.props.navigation.state;
        const index = this.props.navigation.state.index;
            return (
                <View style={styles.tab}>
                    <Text>{index + 1}/{routes.length}</Text>
                    <View style={styles.tabContainer}>

                    {routes.map((route, Index, key) => (
                        <View style={{flexDirection: 'row'}}>
                            <View style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10/2,
                                backgroundColor:  index >= Index ? '#003366' : '#cccccc'
                            }} />
                        <View style={[{
                            backgroundColor: index <= Index ? '#cccccc' : '#003366'
                        },{width: 30,
                            marginTop:4,
                            height:2,
                            display: Index === (routes.length - 1) ? 'none' : 'flex'
                            }]}/>

                        </View>
                    ))}
                </View>
                <View style={{flexDirection: 'row', height: 80, width:250, justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
                  if(index > 0) {
                  this.props.navigation.navigate(routes[index - 1].key, {});
                }
              }}><Icon style={{display: index == 0 ? 'none' : 'flex'}} name={'chevron-left'} color='#cccccc'/>
                  <Text style={{color:'#cccccc'}}>{index == 0 ? '' : 'Precedent'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
                  if(index + 1 != routes.length){
                  this.props.navigation.navigate(routes[index + 1].key, {})}
                }
                }>
                <Text>{index + 1 == routes.length ? 'Fin' : 'Suivant'}</Text>
                <Icon name={'chevron-right'} color='#003366'/>
                </TouchableOpacity>
                </View>
</View>
            );
    }
}
