import React, { PureComponent } from 'react';
import { TouchableHighlight, View, Text, Image, Dimensions, StyleSheet } from 'react-native';

function Btn(props) {
    return (
        <TouchableHighlight style={styles.btn} onPress={props.callback} underlayColor='transparent'>
            <View style={styles.wrapper}>
                <Text style={styles.btnTitleText}>{props.title}</Text>
                <Image style={styles.btnIcon} source={require('../../../image/arrow/arrow_down.png')} />
            </View>
        </TouchableHighlight>
    );
}

export default class Select extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Btn title={this.props.type.alias} callback={this.typeSelect} />
                    <View style={styles.separator} />
                    <Btn title={this.props.timeType.alias} callback={this.timeTypeSelect} />
                </View>
            </View>
        );
    }

    typeSelect = () => {
        if (typeof this.props.typePress) {
            this.props.typePress(this.props.type);
        }
    }

    timeTypeSelect = () => {
        if (typeof this.props.timeTypePress) {
            this.props.timeTypePress(this.props.timeType);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: Dimensions.get('window').width,
        backgroundColor: '#F3F5F9'
    },
    innerContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 12,
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTitleText: {
        fontSize: 14,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium'
    },
    btnIcon: {
        height: 12,
        width: 12,
        marginLeft: 5
    },
    separator: {
        height: 10,
        width: 1,
        backgroundColor: 'rgb(222,222,222)'
    }
});