import React, { Component } from 'react';
import { Animated, View, Text, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BTN_WIDTH = (Dimensions.get('window').width - 135) / 2;
const Confirm = (props) => {
    return (
        <View style={styles.popContainer}>
            <Text style={styles.popTitle}>{`${props.title}`}</Text>
            <View style={styles.contextWrapper}>
                <Text>{`${props.context}`}</Text>
            </View>
            <View style={styles.btnWrapper}>
                <TouchableHighlight onPress={props.cancel} style={styles.btn}>
                    <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
                        <View style={styles.linearBoard}>
                            <Text style={styles.cancel}>取消</Text>
                        </View>
                    </LinearGradient>
                </TouchableHighlight>
                <TouchableHighlight onPress={props.done} style={styles.btn}>
                    <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
                        <Text style={styles.confirm}>{props.comfirmText}</Text>
                    </LinearGradient>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default class PopModel extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    constructor() {
        this.timer = null;
    }

    state = {
        fadeAnim: new Animated.Value(0),
        confirmText: '确认',
        title: '',
        context: ''
    }

    componentDidMount() {
        const confirmText = this.props.navigation.getParam('confirmText', '确认');
        const title = this.props.navigation.getParam('title', '提示');
        const context = this.props.navigation.getParam('context', '您是否确认此操作');
        this.setState({
            confirmText,
            title,
            context
        });

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
                    <Confirm
                        cancel={this.back}
                        done={this.done}
                        title={this.state.title}
                        context={this.state.context}
                        comfirmText={this.state.confirmText}
                    />
                </View>
            </Animated.View>
        );
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
        this.props.navigation.state.params.confirm();
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

const styles = StyleSheet.create({
    popContainer: {
        height: 210,
        width: Dimensions.get('window').width - 60,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 30
    },
    popTitle: {
        marginTop: 20,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 17,
        color: 'rgb(40,46,60)',
        alignSelf: 'center'
    },
    contextWrapper: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contextText: {
        fontSize: 15,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium'
    },
    btnWrapper: {
        height: 40,
        width: Dimensions.get('window').width - 60 - 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        alignSelf: 'center'
    },
    btn: {
        height: 40,
        width: BTN_WIDTH,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearBoard: {
        height: 38,
        width: BTN_WIDTH - 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    cancel: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: 'rgb(94,131,229)'
    },
    confirm: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: 'white'
    }
});