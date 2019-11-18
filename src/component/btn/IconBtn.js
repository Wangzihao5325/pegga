import React, { PureComponent } from 'react';
import {
    TouchableHighlight,
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

export default class IconBtn extends PureComponent {
    static defaultProps = {
        underlayColor: 'transparent',
    }

    render() {
        return (
            <TouchableHighlight
                style={[styles.btn, this.props.style]}
                onPress={this.btnPress}
                underlayColor={this.props.underlayColor}
            >
                <View style={styles.container}>
                    <Image style={[styles.Image, this.props.imageStyle]} source={this.props.source} />
                    {typeof this.props.title == 'string' && <Text style={[styles.title, this.props.titleStyle]}>{`${this.props.title}`}</Text>}
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

const styles = StyleSheet.create({
    btn: {
        padding: 1
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Image: {
        height: 25,
        width: 25
    },
    title: {
        fontSize: 15,
        fontFamily: 'PingFang-SC-Regular',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});