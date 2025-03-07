import React, { PureComponent } from 'react';
import { View, TouchableHighlight, Text, Image, Dimensions, StyleSheet } from 'react-native';
import I18n from '../../../../global/doc/i18n';
import Select from '../../../../component/select';

export default class Header extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableHighlight style={styles.backBtn} onPress={this.goBack} underlayColor='transparent'>
                        <Image style={styles.backBtnImage} source={require('../../../../image/arrow/back_arrow_black.png')} />
                    </TouchableHighlight>
                </View>
                <Select.SwichLinear
                    data={[{ title: I18n.BUY_IN, key: 0 }, { title: I18n.SELL_OUT, key: 1 }]}
                    selectValue={this.props.tradeType}
                    callback={this.tradeTypeChange}
                    isControl
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
                    <TouchableHighlight underlayColor='transparent' onPress={this.goAdList}>
                        <Text>广告管理</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    goAdList = () => {
        this.props.navi.replace('AdManagementView');
    }

    goBack = () => {
        if (this.props.navi) {
            this.props.navi.goBack();
        }
    }

    tradeTypeChange = (item, index) => {
        if (typeof this.props.callback == 'function') {
            this.props.callback(item, index);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    backBtn: {
        height: 20,
        width: 20
    },
    backBtnImage: {
        height: 20,
        width: 20
    }
});