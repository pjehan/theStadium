import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { GLOBAL_STYLE } from '../assets/css/global';

const navigateAction = NavigationActions.navigate({
  routeName: 'Login',
  params: {},

  // navigate can have a nested navigate action that will be run inside the child router
//  action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
})

export default class Loading extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoggedIn: false
      }
    }

// need to add method to get data from server and redirect
componentDidMount() {
  setTimeout(() => {
    this.setState({isLoggedIn: true})
  }, 1000)
}
  render() {
    var {navigate} = this.props.navigation;
    if(this.state.isLoggedIn == true) {
      navigate("Login", {})
    }
    return (
      <View style={[GLOBAL_STYLE.mainColorBG, GLOBAL_STYLE.justifyEnd]}>
        <Image style={GLOBAL_STYLE.middleLogo} source={require('../assets/img/thestadium/logo-blanc.png')} />

        <View style={GLOBAL_STYLE.sponsor}>
          <Text style={GLOBAL_STYLE.sponsorText}> Partenaire principal </Text>
          <Image style={GLOBAL_STYLE.sponsorI} source={require('../assets/img/thestadium/logo-blanc.png')} />
        </View>
      </View>
    )
  }
}
