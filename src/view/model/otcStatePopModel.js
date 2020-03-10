import React, { Component } from 'react';
import { Animated, View, Text, TouchableHighlight, FlatList, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import store from '../../store';
import { _clear_OTC_state_and_close_modal } from '../../store/actions/chatAction';

const Item = (props) => {
    return (
        <View style={{ height: 100, width: Dimensions.get('window').width - 30, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 90, width: Dimensions.get('window').width - 50, backgroundColor: 'white', borderRadius: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text>{`您的订单编号:${props.item.orderNo}`}</Text>
                    <Text>有了新进展，请快去查看吧</Text>
                </View>
                <TouchableHighlight style={{ height: 90, width: 120 }} underlayColor='transparent' onPress={() => props.callback(props.item.orderNo, props.index)}>
                    <Text>前往</Text>
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <FlatList
                        style={{ height: Dimensions.get('window').height - 100, width: Dimensions.get('window').width - 30 }}
                        data={this.props.data}
                        renderItem={({ item, index }) => <Item item={item} index={index} callback={this.itemPressCallback} />}
                    />
                </View>
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