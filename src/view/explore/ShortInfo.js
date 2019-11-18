import React, { PureComponent } from 'react';
import {
    View,
    Image,
    Text,
    FlatList,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Api from '../../socket';

const Item = (props) => {
    let dateStr = new Date(props.item[7] * 1000);
    let time = `${dateStr}`.split(' ')[4];
    return (
        <View>
            <View style={styles.itemHeader}>
                <Image style={{ height: 11, width: 11 }} source={require('../../image/explore/tip.png')} />
                <Text style={styles.itemTime}>{`${time}`}</Text>
            </View>
            <View style={styles.itemTitle}>
                <Text style={styles.itemTitleText} numberOfLines={2} ellipsizeMode='tail'>{`${props.item[1]}`}</Text>
            </View>
            <View style={styles.itemContext}>
                <Text style={styles.itemContextText} numberOfLines={2} ellipsizeMode='tail'>{`${props.item[2]}`}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoText}>{`看涨${props.item[4]}人`}</Text>
                <Text style={[styles.infoText, { marginLeft: 46 }]}>{`看跌${props.item[5]}人`}</Text>
            </View>
            <View style={{ marginTop: 15, backgroundColor: 'rgb(235,235,335)', height: 1, width: Dimensions.get('window').width - 30, alignSelf: 'center' }} />
        </View>
    );
}

export default class ShortInfo extends PureComponent {
    state = {
        data: [],
        fields: []
    }
    componentDidMount() {
        Api.flash_news(res => {
            this.setState({
                data: res.data.data,
                fields: res.data.fields
            });
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    data={this.state.data}
                    renderItem={({ item }) => <Item item={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemHeader: {
        height: 35,
        width: Dimensions.get('window').width,
        marginTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemTime: {
        marginLeft: 11,
        fontSize: 14,
        color: 'rgb(133,133,133)',
        fontFamily: 'PingFang-SC-Medium'
    },
    itemTitle: {
        height: 50,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    itemTitleText: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold'
    },
    itemContext: {
        height: 50,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    itemContextText: {
        fontSize: 14,
        color: 'rgb(76,83,101)',
        fontFamily: 'PingFang-SC-Medium'
    },
    info: {
        height: 24,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12,
        color: 'rgb(151,160,181)'
    }
});