import {Dimensions, Image} from "react-native";
import React from "react";
let img = null;
let widthChange = null;
let windowWidth = null;
let originalHeight = null;
let originalWidth = null;
export default function  renderImage(source) {

    Image.getSize(source.uri ? source.uri : source, (width, height) => {
        originalWidth = null || width;
        originalHeight = null || height;
        windowWidth = null || Dimensions.get('window').width;
        widthChange = null || (windowWidth - 10) / originalWidth;
        img = (<Image source={{uri: source}} style={{width: originalWidth * widthChange, height: originalHeight * widthChange}}/>);
        return img;
    });
}