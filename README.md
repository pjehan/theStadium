
theStadium
# theStadium  [![npm version](https://badge.fury.io/js/native-base.svg)](https://badge.fury.io/js/native-base) [![npm version](https://badge.fury.io/js/react-native.svg)](https://badge.fury.io/js/react-native)

__________________________________________

# Table of Content

1. [Pre-requierements](#1-Pre-requierements)
2. [Installation](#2-Installation)
3. [Components](https://github.com/GeekyAnts/NativeBase-KitchenSink)
4. [Gngn](#13-about-the-creators)

## Pre-requierements
Package | Version | Dev
--- |:---:|:---:
[NodeJS](https://nodejs.org/en/) | 5.6 > | ✖
[react-native-scripts](https://github.com/react-community/create-react-native-app) | 1.5.0 | ✖

## Installation
 - `npm install` : install all dependencies
 - `npm start` : start packager
 - `npm run android` : start packager on android devices
 - `npm run ios` : start packager on ios devices
 - `npm run test` : (not implemented yet) Runs the jest test runner on your tests.

## Components
**Folder architechture**
> Here's the folder architechture of the app. This architechture is based on redux's integration

- `_actions` : install all dependencies
 - `_constant` : All constants you can find in the app, mainly redux's constants
 - `_services` : Handle the API requests
 - `_reducers` : Redux Reducers
 - `assets` : All assets of the app, such as css or images
 - `config`: Configuration files, API url, token storage etc
 - `components`: All the components you can find in the app
 - `layout`: header or footer, should be mooved to components
 - `screens`: Screens components.
 - 
 # Components

# ChoiceModal
`ChoiceModalContainer.show(options, callback)`
``` 
options = {
    options: Array || Object Array
    title?: String
    message?: String
}
```
callback returns the item's index in options.options[`index`];

Option | Required ? | Type
--- |:---: | :---:
options | Yes | Array or Object Array
title | No | String
message | No | String
<br/>
```js
import React, {Component} from 'react';

import { View, TouchableOpacity } from 'react-native';
import {ChoiceModalContainer} from "../components/ChoiceModal/index";
const TEST_BTN = ["Option 1", "Option 2"];
const TEST_OBJECT = [{label: "Option 1", function: function1()}, {label: "Option2", function: function2()}];
class Example extends Component {
render() {
return(
    <View>
        <TouchableOpacity onPress={() => {
                    ChoiceModalContainer.show(
                        {
                            options: TEST_BTN,
                            title: "Test",
                            message: "Classic message that will describe what you are                             going to do with this modal"
                        },
                        buttonIndex => {
                            buttonIndex === 0 ? this.function1() : buttonIndex ===                             1 ? this.function2() : null
                        }
                    )
                }
            }>
            
            <TouchableOpacity onPress={() => {
                    ChoiceModalContainer.show(
                        {
                            options: TEST_OBJECT,
                            title: "Test",
                            message: "Classic message that will describe what you are                             going to do with this modal"
                        },
                        buttonIndex => {
                            this.TEST_OBJECT[buttonIndex].function
                        }
                    )
                }
            }>
</View>
)
}
}
```<br />
  