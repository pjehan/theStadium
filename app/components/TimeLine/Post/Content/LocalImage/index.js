import {
    View,
    Image,
    Dimensions,
} from 'react-native'
import React, {Component} from 'react';
let img = null;
let widthChange = null;
let windowWidth = null;
let originalHeight = null;
let originalWidth = null;
export default class LocalImage extends Component {
    constructor(props) {
        super(props);
        this.renderImage = this.renderImage.bind(this);
    }

    componentWillMount() {
        this.renderImage();
    }
    renderImage() {
        Image.getSize(this.props.source.uri ? this.props.source.uri : this.props.source, (width, height) => {
            originalWidth = null || width;
            originalHeight = null || height;
            windowWidth = null || Dimensions.get('window').width;
            widthChange = null || (windowWidth - 10) / originalWidth;
            img = (<Image source={{uri: this.props.source}} style={{width: originalWidth * widthChange, height: originalHeight * widthChange}}/>);
            this.forceUpdate();
        });
    }
    render() {
        if(img) {
            return (
                <View>
                    {img}
                </View>
            )
        }else {
            return null
        }
    }
};
