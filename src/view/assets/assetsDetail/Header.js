import React, { PureComponent } from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';

export default class Header extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.backContainer} onPress={this.props.goBack} underlayColor='transparent'>
                    <Image style={styles.backIcon} source={require('../../../image/arrow/back_arrow_white.png')} />
                </TouchableHighlight>
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 20, width: 20, borderRadius: 15, marginRight: 10 }} source={require('../../../image/coinIcon/PQC.png')} />
                    <Text style={{ marginLeft: 5, color: 'white', fontSize: 17 }}>{this.props.title}</Text>
                </View>
                <TouchableHighlight style={styles.rightBtnContainer} onPress={this.props.goMoneyFlow} underlayColor='transparent'>
                    <Text style={{ color: 'white', fontSize: 15 }}>账单</Text>
                </TouchableHighlight>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 44,
        marginTop: 24,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    backContainer: {
        height: 20,
        width: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15
    },
    backIcon: {
        height: 20,
        width: 20,
        borderRadius: 15,
    },
    rightBtnContainer: {
        height: 20,
        width: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 15
    }
});