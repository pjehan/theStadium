import {
    Image,
    Dimensions,
} from 'react-native'
import React, {Component} from 'react';

export default class LocalImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {

        Image.getSize(this.props.source, (width, height) => {
            let originalWidth = width;
            let originalHeight = height;
            let windowWidth = Dimensions.get('window').width;
            let widthChange = (windowWidth - 10) / originalWidth;
            this.setState({width: originalWidth * widthChange, height: originalHeight * widthChange});
        });
    }

    render() {
        return (
            <Image source={{uri: this.props.source}} style={{width: this.state.width, height: this.state.height}}/>
        )
    }
};
