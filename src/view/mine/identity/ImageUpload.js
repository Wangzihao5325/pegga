import React, { PureComponent } from 'react';
import { TouchableHighlight, Image, Text, View, Dimensions } from 'react-native';

const WIDTH = (Dimensions.get('window').width - 45) / 2;
const HEIGHT = WIDTH / 160 * 90;

export default class ImageUpload extends PureComponent {
    render() {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={this.btnPress} style={{ height: HEIGHT, width: WIDTH, borderRadius: 5, borderWidth: 1, borderStyle: 'dotted', borderColor: 'rgb(133,133,133)' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 45, width: 45 }} source={require('../../../image/mine/photo_icon.png')} />
                    <Text style={{ marginTop: 5 }} >{`${this.props.title}`}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    btnPress = () => {
        if (typeof this.props.callback == 'function') {
            this.props.callback();
        }
    }
}