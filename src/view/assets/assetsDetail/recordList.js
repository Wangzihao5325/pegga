import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import Select from '../../../component/select';


export default class RecordList extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Select.ScrollLinear
                    data={[{ title: '充值记录', key: 'PQC' }, { title: '提现记录', key: 'USDT' }, { title: '转账记录', key: 'BTC' }]}
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