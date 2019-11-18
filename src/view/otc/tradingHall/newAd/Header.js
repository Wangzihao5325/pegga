import React, { PureComponent } from 'react';
import { View, TouchableHighlight, Image, Dimensions, StyleSheet } from 'react-native';

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
                    data={[{ title: '买入', key: 0 }, { title: '卖出', key: 1 }]}
                    selectValue={this.props.tradeType}
                    callback={this.tradeTypeChange}
                    isControl
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} />
            </View>
        );
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