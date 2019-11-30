import React, { PureComponent } from 'react';
import { TouchableHighlight, Image, Text, View, Platform, Dimensions } from 'react-native';

const WIDTH = (Dimensions.get('window').width - 45) / 2;
const HEIGHT = WIDTH / 160 * 90;

export default class ImageUpload extends PureComponent {
    render() {
        if (this.props.value) {
            let uri = Platform.OS == 'ios' ? this.props.value.sourceURL : this.props.value.path;
            return (
                <View style={{ height: HEIGHT, width: WIDTH, position: 'relative' }}>
                    <Image style={{ height: HEIGHT, width: WIDTH, borderRadius: 5 }} source={{ uri }} />
                    <TouchableHighlight onPress={this.delBtnPress} style={{ height: 20, width: 20, position: 'absolute', top: 10, right: 10, display: 'flex', backgroundColor: '#CCCBCC', borderRadius: 10 }}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../image/usual/delete_pic.png')} />
                    </TouchableHighlight>
                </View>
            );
        } else {
            return (
                <TouchableHighlight underlayColor='transparent' onPress={this.btnPress} style={{ height: HEIGHT, width: WIDTH, borderRadius: 5, borderWidth: 1, borderStyle: 'dotted', borderColor: 'rgb(188,192,203)' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 45, width: 45 }} source={require('../../../image/mine/photo_icon.png')} />
                        <Text style={{ marginTop: 5 }} >{`${this.props.title}`}</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    btnPress = () => {
        if (typeof this.props.callback == 'function') {
            this.props.callback();
        }
    }

    delBtnPress = () => {
        if (typeof this.props.del == 'function') {
            this.props.del();
        }
    }
}