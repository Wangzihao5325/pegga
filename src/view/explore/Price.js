import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableHighlight, FlatList, Dimensions, StyleSheet } from 'react-native';
import Api from '../../socket';
//none,currency_asc,curreency_des,hour_asc,hour_des 
const Header = (props) => {
    let currencyImage = require('../../image/explore/default.png');
    let hourImage = require('../../image/explore/default.png');
    switch (props.state) {
        case 'currency_asc':
            currencyImage = require('../../image/explore/ascending.png');
            hourImage = require('../../image/explore/default.png');
            break;
        case 'curreency_des':
            currencyImage = require('../../image/explore/descending.png');
            hourImage = require('../../image/explore/default.png');
            break;
        case 'hour_asc':
            hourImage = require('../../image/explore/ascending.png');
            currencyImage = require('../../image/explore/default.png');
            break;
        case 'hour_des':
            hourImage = require('../../image/explore/descending.png');
            currencyImage = require('../../image/explore/default.png');
            break;
        default:
            break;
    }
    return (
        <View style={styles.headerContainer}>
            <View style={{ flex: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={styles.headerText}>资产</Text>
            </View>
            <TouchableHighlight style={{ flex: 9 }} onPress={() => props.callback('currency', props.state)} underlayColor='transparent'>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={styles.headerText}>美元</Text>
                    <Image style={{ height: 11, width: 11 }} source={currencyImage} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={{ flex: 8 }} onPress={() => props.callback('hour', props.state)} underlayColor='transparent'>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={styles.headerText}>24H</Text>
                    <Image style={{ height: 11, width: 11 }} source={hourImage} />
                </View>
            </TouchableHighlight>
            <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={styles.headerText}>市值</Text>
            </View>
        </View>
    )
}

const Item = (props) => {
    let cap = (props.item[9] / 100000000).toFixed(0);
    let capStr = `${cap}亿`;
    if (cap / 10000 > 1) {
        capStr = `${(cap / 10000).toFixed(2)}万亿`;
    }
    let textStyle = { fontSize: 17, color: 'rgb(20,153,64)' };
    if (props.item[14] < 0) {
        textStyle.color = 'rgb(212,36,40)'
    }
    return (
        <View>
            <View style={styles.itemContainer}>
                <View style={{ flex: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image style={styles.avater} source={{ uri: `http://static.niuyan.com/${props.item[4]}` }} />
                    <Text style={{ marginLeft: 10, fontSize: 17, color: 'rgb(40,46,60)' }}>{`${props.item[3]}`}</Text>
                </View>
                <View style={{ flex: 9, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={textStyle}>{`${(props.item[10]).toFixed(2)}`}</Text>
                </View>
                <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={textStyle}>{`${props.item[14]}%`}</Text>
                </View>
                <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, color: 'rgb(88,92,102)', fontFamily: 'PingFang-SC-Regular', fontWeight: 'bold' }}>{`${capStr}`}</Text>
                </View>
            </View>
            <View style={{ height: 1, width: Dimensions.get('window').width - 30, alignSelf: 'center', backgroundColor: '#F3F3F3' }} />
        </View>
    );
}

const Footer = (props) => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>- 数据来源“牛眼行情” -</Text>
        </View>
    );
}

export default class Price extends PureComponent {
    state = {
        originData: [],
        data: [],
        fields: [],
        orderType: 'none'//none,currency_asc,curreency_des,hour_asc,hour_des 
    }

    componentDidMount() {
        Api.coin_news_global((res) => {
            this.setState({
                originData: res.data.data,
                data: res.data.data,
                fields: res.data.fields
            });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    state={this.state.orderType}
                    callback={this.orderChange}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    data={this.state.data}
                    renderItem={({ item }) => <Item item={item} />}
                    ListFooterComponent={<Footer />}
                />
            </View>
        );
    }

    orderChange = (type, state) => {
        if (type == 'currency') { //none->asc
            switch (state) {
                case 'none':
                case 'hour_asc':
                case 'hour_des':
                    {
                        let ascData = this.state.data.sort((a, b) => {
                            return a[10] - b[10]
                        });
                        this.setState({
                            data: ascData,
                            orderType: 'currency_asc'
                        });
                    }
                    break;
                case 'currency_asc':
                    {
                        let ascData = this.state.data.sort((a, b) => {
                            return b[10] - a[10]
                        });
                        this.setState({
                            data: ascData,
                            orderType: 'curreency_des'
                        });
                    }
                    break;
                case 'curreency_des':
                    {
                        let originData = this.state.originData.concat()
                        this.setState({
                            data: originData,
                            orderType: 'none'
                        });
                    }
                    break;
                default:
                    break;
            }
        } else if (type == 'hour') {
            switch (state) {
                case 'none':
                case 'currency_asc':
                case 'curreency_des':
                    {
                        let ascData = this.state.data.sort((a, b) => {
                            return a[14] - b[14]
                        });
                        this.setState({
                            data: ascData,
                            orderType: 'hour_asc'
                        });
                    }
                    break;
                case 'hour_asc':
                    {
                        let ascData = this.state.data.sort((a, b) => {
                            return b[14] - a[14]
                        });
                        this.setState({
                            data: ascData,
                            orderType: 'hour_des'
                        });
                    }
                    break;
                case 'hour_des':
                    {
                        let originData = this.state.originData.concat()
                        this.setState({
                            data: originData,
                            orderType: 'none'
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 40,
        width: Dimensions.get('window').width,
        backgroundColor: '#F3F5F9',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        color: 'rgb(133,133,133)',
        fontSize: 14,
        fontFamily: 'PingFang-SC-Medium'
    },
    itemContainer: {
        height: 60,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avater: {
        height: 21,
        width: 21
    },
    footer: {
        height: 45,
        width: Dimensions.get('window').width,
        backgroundColor: '#F3F5F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerText: {
        color: 'rgb(208,217,233)',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Medium'
    }
});