import React, { PureComponent } from 'react';
import {
    TouchableHighlight,
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
export default class Item extends PureComponent {
    static defaultProps = {
        title: 'title',
        bottomLine: false,
        margin: false
    }

    render() {
        return (
            <TouchableHighlight style={[styles.btn, this.props.margin ? { marginTop: 10 } : null]} onPress={this.btnPress} underlayColor='transparent'>
                <View style={[styles.container, this.props.bottomLine ? styles.bottomLine : null]}>
                    {this.props.avater && <Image style={styles.image} source={this.props.avater} />}
                    <View style={this.props.avater ? styles.titleContainer : styles.titleContainerWithoutAvater}>
                        <Text style={[styles.titleText, this.props.titleTextStyle]}>{this.props.title}</Text>
                        {typeof this.props.stateText == 'string' && <Text style={[styles.stateText, this.props.StateTextStyle]}>{`${this.props.stateText}`}</Text>}
                    </View>
                    <Image style={styles.arrow} source={require('../../image/arrow/arrow_mine.png')} />
                </View>
            </TouchableHighlight>
        );
    }

    btnPress = () => {
        if (typeof this.props.btnPress == 'function') {
            this.props.btnPress();
        }
    }

}

const styles = StyleSheet.create({
    btn: {
        height: 55,
        width: Dimensions.get('window').width,
        display: 'flex',
        paddingHorizontal: 15,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomLine: {
        borderBottomColor: '#FAFAFC',
        borderBottomWidth: 1
    },
    image: {
        height: 20,
        width: 20,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    titleContainerWithoutAvater: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)'
    },
    arrow: {
        height: 15,
        width: 15,
    },
    stateText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(242,106,58)',
    },
    titleText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)',
    },
});