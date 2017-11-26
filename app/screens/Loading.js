import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { styles } from '../assets/css/global';

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
      <View style={[styles.mainColorBG, styles.justifyEnd]}>
        <Image style={styles.middleLogo} source={require('../assets/img/thestadium/logo-blanc.png')} />

        <View style={styles.sponsor}>
          <Text style={styles.sponsorText}> Partenaire principal </Text>
          <Image style={styles.sponsorI} source={require('../assets/img/thestadium/logo-blanc.png')} />
        </View>
      </View>
    )
  }
}
