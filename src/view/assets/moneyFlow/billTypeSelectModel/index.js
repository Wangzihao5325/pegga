import React, { Component } from 'react';
import {
    Animated,
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableHighlight,
    View,
    Text,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import Btn from '../../../..//component/btn';
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
        fadeAnim: new Animated.Value(0),
        data: [],
        type: '',
        title: '',
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.timer = null
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                }
            ).start();

        }, 300);

        const type = this.props.navigation.getParam('type', '');
        if (type) {
            this.setState({
                data: Enum.ASSETS[type],
                type,
                title: '请选择'
            });
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null
        }
    }

    render() {
        return (
            <Animated.View style={{ flex: 1, opacity: this.state.fadeAnim }}>
                <View style={styles.container}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.state.title}</Text>
                        </View>
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <Item
                                        key={item.key}
                                        item={item}
                                        callback={() => this.itemPress(item)}
                                        last={this.state.data.length - 1 === index}
                                    />
                                );
                            })
                        }
                        <Btn.Linear
                            style={styles.backBtn}
                            textStyle={styles.backBtnText}
                            btnPress={() => this.back(500)}
                            title='确定'
                        />
                    </View>
                </View>
            </Animated.View>
        )
        // return (
        //     <TouchableWithoutFeedback style={styles.touchable} onPress={() => this.props.navigation.goBack()}>
        //         <SafeAreaView style={styles.safeArea}>
        //             <View style={styles.container}>
        //                 {
        //                     this.state.data.map((item, index) => {
        //                         return (
        //                             <Item
        //                                 key={item.key}
        //                                 item={item}
        //                                 callback={() => this.itemPress(item)}
        //                                 last={this.state.data.length - 1 === index}
        //                             />
        //                         )
        //                     })
        //                 }
        //             </View>
        //         </SafeAreaView>
        //     </TouchableWithoutFeedback>

        // );
    }

    back = (value) => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 400
            }
        ).start();
        this.timer = setTimeout(() => {
            this.timer = null;
            this.props.navigation.goBack();
        }, value)
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
        this.back(500);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    itemContainer: {
        height: 45,
        width: Dimensions.get('window').width,
        backgroundColor: 'white'
    },
    itemTextNormal: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 16,
        color: 'rgb(40,46,60)'
    },
    itemTextHighlight: {
        fontFamily: 'PingFang-SC-Regular',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgb(64,99,213)'
    },
    titleContainer: {
        height: 60,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        marginTop: 20,
        alignSelf: 'center',
        fontFamily: 'PingFang-SC-Regular',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgb(40,46,60)'
    },
    backBtn: {
        height: 65,
        width: Dimensions.get('window').width,
    },
    backBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
    itemBtn: {
        height: 60,
        width: Dimensions.get('window').width,
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