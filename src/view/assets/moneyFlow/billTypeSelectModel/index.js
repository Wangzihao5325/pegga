import React, { Component } from 'react';
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableHighlight,
    View,
    Text,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';

import Enum from '../../../../global/Enum';
import store from '../../../../store';
import { assets_update_bill_type, assets_update_bill_time_type } from '../../../../store/actions/assetsAction';

function Item(props) {
    return (
        <TouchableHighlight style={styles.itemBtn} onPress={props.callback} underlayColor='transparent'>
            <View style={styles.wrapper}>
                <View style={styles.wrapper}>
                    <Text style={styles.itemTitle}>{props.item.alias}</Text>
                </View>
                {!props.last && <View style={styles.separator} />}
            </View>
        </TouchableHighlight>
    );
}

export default class BillTypeSelectModel extends Component {

    state = {
        data: [],
        type: ''
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', '');
        if (type) {
            this.setState({
                data: Enum.ASSETS[type],
                type
            });
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.touchable} onPress={() => this.props.navigation.goBack()}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <Item
                                        key={item.key}
                                        item={item}
                                        callback={() => this.itemPress(item)}
                                        last={this.state.data.length - 1 === index}
                                    />
                                )
                            })
                        }
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>

        );
    }

    itemPress = (item) => {
        switch (this.state.type) {
            case 'BILL_TYPE':
                store.dispatch(assets_update_bill_type(item));
                break;
            case 'BILL_TIME_TYPE':
                store.dispatch(assets_update_bill_time_type(item));
                break;
            default:
                break;
        }
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center'
    },
    touchable: {
        flex: 1,
    },
    container: {
        borderRadius: 10,
        marginBottom: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.2,
            },
            android: {
                borderColor: 'rgb(222,222,222)',
                borderWidth: 1
            }
        })

    },
    itemBtn: {
        height: 60,
        width: Dimensions.get('window').width - 50,
        backgroundColor: 'white'
    },
    itemTitle: {
        fontSize: 16,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium',
        letterSpacing: 5
    },
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: {
        height: 1,
        width: Dimensions.get('window').width - 100,
        backgroundColor: 'rgba(188,192,203,0.3)'
    }
});