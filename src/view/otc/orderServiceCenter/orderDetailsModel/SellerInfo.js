import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class SellerInfo extends PureComponent {
    state = {
        sellerName: '',
        orderCompleteRateRecentMonth: '',
        totalAppealsRecentMonth: '',
        successAppealsRecentMonth: ''
    }

    static getDerivedStateFromProps(props, state) {
        if (props.orderType === 0) {
            const {
                sellerName = '游客',
                orderCompleteRateRecentMonth = '',
                successAppealsRecentMonth = 0,
                totalAppealsRecentMonth = 0
            } = props.sellerInfo;

            return {
                sellerName: sellerName ? sellerName : '游客',
                orderCompleteRateRecentMonth: orderCompleteRateRecentMonth ? orderCompleteRateRecentMonth : '0.00 %',
                successAppealsRecentMonth: successAppealsRecentMonth ? successAppealsRecentMonth : 0,
                totalAppealsRecentMonth: totalAppealsRecentMonth ? totalAppealsRecentMonth : 0
            }
        } else if (props.orderType === 1) {
            const {
                buyerName = '游客',
                orderCompleteRateRecentMonth = '',
                successAppealsRecentMonth = 0,
                totalAppealsRecentMonth = 0
            } = props.buyerInfo;

            return {
                sellerName: buyerName ? buyerName : '游客',
                orderCompleteRateRecentMonth: orderCompleteRateRecentMonth ? orderCompleteRateRecentMonth : '0.00 %',
                successAppealsRecentMonth: successAppealsRecentMonth ? successAppealsRecentMonth : 0,
                totalAppealsRecentMonth: totalAppealsRecentMonth ? totalAppealsRecentMonth : 0
            }
        } else {
            return null;
        }
    }

    render() {
        let avaterText = this.state.sellerName.slice(0, 1);
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.props.seeDetail} style={styles.top}>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <LinearGradient
                                style={styles.avater}
                                colors={['#39DFB1', '#6284E4']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                            >
                                <Text style={styles.avaterText}>{`${avaterText}`}</Text>
                            </LinearGradient>
                            <Text style={styles.name}>{`${this.state.sellerName}`}</Text>
                        </View>
                        <Image style={{ height: 15, width: 15 }} source={require('../../../../image/arrow/arrow_mine.png')} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoContext}>{`${this.state.orderCompleteRateRecentMonth}`}</Text>
                        <Text style={styles.infoTitle}>近30日成交率</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoContext}>{`${this.state.totalAppealsRecentMonth}`}</Text>
                        <Text style={styles.infoTitle}>近30日申诉</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoContext}>{`${this.state.successAppealsRecentMonth}`}</Text>
                        <Text style={styles.infoTitle}>近30日胜诉</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: Dimensions.get('window').width,
        backgroundColor: 'white'
    },
    top: {
        height: 25,
        width: Dimensions.get('window').width
    },
    avater: {
        height: 30,
        width: 30,
        borderRadius: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avaterText: {
        color: 'white',
        fontSize: 20
    },
    name: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 17,
        color: 'rgb(40,46,60)',
        marginLeft: 10
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContext: {
        color: 'rgb(40,46,60)',
        fontSize: 17
    },
    infoTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(133,133,133)',
        marginTop: 10
    }
});