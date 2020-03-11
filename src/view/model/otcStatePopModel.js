import React, { Component } from 'react';
import { Animated, SafeAreaView, View, Text, TouchableHighlight, FlatList, Dimensions, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import store from '../../store';
import { _clear_OTC_state_and_close_modal } from '../../store/actions/chatAction';

const Item = (props) => {
    return (
        <View style={{ height: 90, width: Dimensions.get('window').width - 30, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 80, width: Dimensions.get('window').width - 30, backgroundColor: 'white', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15 }}>
                <Image style={{ height: 48, width: 40, alignSelf: 'center', marginRight: 12 }} source={require('../../image/usual/group.png')} />
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'rgb(73,73,73)', fontFamily: 'PingFang-SC-Medium' }}>{`订单编号:${props.item.orderNo}`}</Text>
                    <Text style={{ fontSize: 14, color: 'rgb(188,192,203)', fontFamily: 'PingFang-SC-Medium' }}>有了新进展，请快去查看吧</Text>
                </View>
                <TouchableHighlight style={{ height: 80, width: 45, justifyContent: 'center', alignItems: 'center' }} underlayColor='transparent' onPress={() => props.callback(props.item.orderNo, props.index)}>
                    <Image style={{ height: 15, width: 15 }} source={require('../../image/arrow/arrow_mine.png')} />
                </TouchableHighlight>
            </View>
        </View>
    );
}

class OTCStatePopModel extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    constructor(props) {
        super(props);
        this.timer = null;
    }

    state = {
        fadeAnim: new Animated.Value(0),
        confirmText: '确认',
        title: '11',
        context: '11'
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
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ height: Dimensions.get('window').height - 300, width: Dimensions.get('window').width - 30 }}>
                        <FlatList
                            data={this.props.data}
                            renderItem={({ item, index }) => <Item item={item} index={index} callback={this.itemPressCallback} />}
                        />
                    </View>
                    <TouchableHighlight onPress={this.back} underlayColor='transparent' style={{ height: 45, width: 120, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontFamily: 'PingFang-SC-Medium', fontWeight: 'bold' }}>稍后查看</Text>
                    </TouchableHighlight>
                </SafeAreaView>
            </Animated.View>
        );
    }

    itemPressCallback = (orderNo, index) => {
        if (this.props.data.length > 1) {
            //前往订单列表
            this.backToList();
        } else {
            this.backToList();
            //前往订单详情
        }
    }

    backToList = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 400
            }
        ).start();
        this.timer = setTimeout(() => {
            this.timer = null;
            store.dispatch(_clear_OTC_state_and_close_modal());
            this.props.navigation.navigate('OrderServiceCenterView');
        }, 500)
    }

    back = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 400
            }
        ).start();
        this.timer = setTimeout(() => {
            this.timer = null;
            store.dispatch(_clear_OTC_state_and_close_modal());
            this.props.navigation.goBack();
        }, 500)
    }

    done = () => {
        if (this.props.navigation.state.params.confirm) {
            this.props.navigation.state.params.confirm();
        }
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
        }, 500)
    }
}

const mapStateToProps = (state) => ({
    data: state.chat.dataList
})

export default connect(mapStateToProps)(OTCStatePopModel);

const styles = StyleSheet.create({

});