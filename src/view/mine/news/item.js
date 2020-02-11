import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet, Dimensions } from 'react-native'
export default class Item extends PureComponent {

    state = {
        isClick: false
    }

    btnPress = () => {
        this.setState({
            isClick: true
        });
        this.props.callback(this.props.item);
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableHighlight onPress={this.btnPress} underlayColor='transparent'>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: 70, width: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {this.props.item.unRead && !this.state.isClick &&
                                    <Image style={{ height: 6, width: 6 }} source={require('../../../image/usual/red.png')} />
                                }
                            </View>
                            <Text style={{ fontSize: 16, color: 'rgb(40,46,60)', fontFamily: 'PingFang-SC-Medium' }}>{`${this.props.item.title}`}</Text>
                        </View>
                        <Image style={{ height: 13, width: 13 }} source={require('../../../image/arrow/enter.png')} />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 80,
        width: Dimensions.get('window').width,
        backgroundColor: '#F3F5F9',
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    container: {
        height: 70,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //paddingHorizontal: 15,
        paddingRight: 15
    }
});