import React, { PureComponent } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class NormalBtn extends PureComponent {
    static defaultProps = {
        colors: ['#6284E4', '#39DFB1'],
        colorStart: { x: 0, y: 0 },
        colorEnd: { x: 1, y: 0 },
        title: 'button',
        underlayColor: 'transparent',
        style: { flex: 1 },
        textStyle: { textAlign: 'center', textAlignVertical: 'center', color: 'white' }
    }

    render() {
        const { height, width } = this.props.style;
        const { isFrozen, frozenTitle, frozenTextStyle } = this.props;
        if (isFrozen) {
            return (
                <View style={[this.props.style, { backgroundColor: '#F2F2F2', display: 'flex', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={frozenTextStyle}>{`${frozenTitle}`}</Text>
                </View>
            );
        } else {
            return (
                <LinearGradient colors={this.props.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={this.props.style}>
                    <TouchableHighlight
                        style={[styles.default, { width, height }]}
                        onPress={this.btnPress}
                        underlayColor={this.props.underlayColor}
                    >
                        <Text style={this.props.textStyle}>{this.props.title}</Text>
                    </TouchableHighlight>
                </LinearGradient>
            );
        }
    }

    btnPress = () => {
        if (typeof this.props.btnPress == 'function') {
            this.props.btnPress();
        }
    }
}

const styles = StyleSheet.create({
    default: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDefault: {
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});