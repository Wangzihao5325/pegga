import React, { PureComponent } from 'react';
import { View, Image, Text, FlatList, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import Api from '../../socket';
import NavigationService from '../../app/router/NavigationService';

const Item = (props) => {
    const goToDetail = () => {
        NavigationService.navigate('NewsWeb', { uri: props.item[4] });
    }
    let dataStr = new Date(props.item[7] * 1000);
    let time = `${dataStr}`.split(' ')[4];
    return (
        <TouchableHighlight style={styles.container} onPress={goToDetail} underlayColor='transparent'>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#F4F4F4', borderBottomWidth: 1 }}>
                <View style={{ flex: 1, height: 80, paddingRight: 15, marginTop: 20 }}>
                    <Text style={styles.itemHeader} numberOfLines={2} ellipsizeMode='tail'>{`${props.item[2]}`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={styles.info}>{`${props.item[6]}`}</Text>
                        <Text style={styles.info}>{`${time}`}</Text>
                    </View>
                </View>
                <Image style={{ height: 80, width: 110, borderRadius: 5, marginTop: 20 }} source={{ uri: props.item[5] }} />
            </View>
        </TouchableHighlight>
    )
}

export default class Info extends PureComponent {
    state = {
        data: [],
        fields: []
    }
    componentDidMount() {
        Api.explore_news(res => {
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
    container: {
        height: 120,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    itemHeader: {
        fontSize: 17,
        color: 'black',
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        marginTop: 5
    },
    info: {
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(179,179,179)',
        fontSize: 12
    }
});