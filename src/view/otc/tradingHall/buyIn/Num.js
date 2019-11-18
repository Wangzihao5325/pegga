import React, { PureComponent } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
import Btn from '../../../../component/btn';

export default class Num extends PureComponent {
    render() {
        let coinNumText = this.props.tradeType ? '买入' : '卖出';
        let moneyNumText = this.props.tradeType ? '需支出' : '可获得';
        let canTradeNum = this.props.amount;
        // if (this.props.tradeType == 0) {
        //     canTradeNum = Math.min(this.props.amount, this.props.myAmount);
        // }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`${this.props.coinType}`}</Text>
                <View style={styles.coinNum}>
                    <View style={styles.coinNumContainer} >
                        <TextInput
                            style={{ flex: 1 }}
                            keyboardType='number-pad'
                            value={this.props.coinNum}
                            onChangeText={(value) => this.props.coinNumCallback(value)}
                            placeholder={`可${coinNumText}数量${canTradeNum}`}
                        />
                        <Text style={styles.unitText}>{`${this.props.coinType}`}</Text>
                    </View>
                    <Btn.Linear
                        style={styles.btn}
                        textStyle={styles.btnText}
                        title={`全部${coinNumText}`}
                        btnPress={() => this.props.tradeAll(canTradeNum)}
                    />
                </View>
                <Text style={[styles.title, { marginTop: 15 }]}>{`${this.props.currencyType}`}</Text>
                <View style={styles.coinNum}>
                    <View style={styles.coinNumContainer} >
                        <TextInput
                            editable={false}
                            style={{ flex: 1 }}
                            value={this.props.moneyNum}
                            //onChangeText={(value) => this.props.moneyNumCallback(value)}
                            placeholder={`${moneyNumText}数量`}
                        />
                        <Text style={styles.unitText}>{`${this.props.currencyType}`}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: Dimensions.get('window').width - 30,
        height: 200,
        borderRadius: 5,
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        alignSelf: 'flex-start',
        marginTop: 20,
        fontSize: 14,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Regular'
    },
    coinNum: {
        marginTop: 10,
        height: 45,
        width: Dimensions.get('window').width - 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        marginLeft: 15,
        height: 35,
        width: 70,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white'
    },
    coinNumContainer: {
        flex: 1,
        height: 35,
        borderRadius: 5,
        borderColor: '#DADADA',
        borderWidth: 1,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    unitText: {
        fontSize: 14,
        fontFamily: 'PingFang-SC-Regular',
        color: 'rgb(188,192,203)',
        fontWeight: 'bold'
    }
});