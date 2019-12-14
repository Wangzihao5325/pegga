import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '../../../global/doc/i18n';

import Select from '../../../component/select';


export default class RecordList extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Select.ScrollLinear
                    data={[{ title: I18n.ASSETS_RECHARGE_RECORD, key: 'PQC' }, { title: I18n.ASSETS_WITHDRAW_RECORD, key: 'USDT' }, { title: I18n.ASSETS_TRANSFER_RECORD, key: 'BTC' }]}
                    isFlex={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 15
    }
});