import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    FormItem,
    TextInput,
    Text,
    Button,
} from 'react-native';
import Header from '../../../component/header';
import {
    addConnectionStatusListener,
    connect,
    disconnect,
    setReconnectKickEnable,
    ConversationType,
    getConversation,
    getConversationList,
} from "rongcloud-react-native-imlib";
import { connect as reduxConnect } from 'react-redux';
import Api from '../../../socket/index';

class Chat extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        message: "连接结果：",
        status: 0,
        token: this.props.token
    };
    componentDidMount() {
        this.listener = addConnectionStatusListener(status => this.setState({ status }));
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    setToken = token => this.setState({ token });

    connect = () =>
        connect(
            this.state.token,
            userId => this.setState({ message: "连接成功：" + userId }),
            errorCode => this.setState({ message: "连接失败：" + errorCode }),
            () => this.setState({ message: "Token 不正确或已过期" })
        );

    toChat = () => {
        this.props.navigation.navigate('IMChatView', { conversationType: ConversationType.PRIVATE, targetId: '10010', userId: this.props.userId });
    }

    getCon = async () => {
        const conversation = await getConversationList([ConversationType.GROUP], 10, 0);
        const con = await getConversation(ConversationType.GROUP, 'aaa');
        console.log(con);
    }

    customService = () => {
        Api.chatCustomerService((res) => {

        });
    }

    group = () => {
        Api.chatGroups((res) => { });
    }

    render() {
        const { status, message, token } = this.state;
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='聊天'
                    goback={() => this.props.navigation.goBack()}
                />
                <TextInput value={token} onChangeText={this.setToken} placeholder="请提供 Token" />
                <Button title="连接服务器" onPress={this.connect} />
                <Button title="断开连接（继续接收推送）" onPress={() => disconnect()} />
                <Button title="断开连接（不再接收推送）" onPress={() => disconnect(false)} />
                <Button title="断线重连时踢出重连设备" onPress={() => setReconnectKickEnable(true)} />
                <Button title="断线重连时不踢出重连设备" onPress={() => setReconnectKickEnable(true)} />
                <Button title="查看系统客服列表" onPress={this.customService} />
                <Button title="查看用户群组" onPress={this.group} />
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.message}>连接状态监听：{status}</Text>
                <Button title='聊天' onPress={this.toChat} />
                <Button title='con' onPress={this.getCon} />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.chat.token,
    userId: state.chat.userId
})

export default reduxConnect(mapStateToProps)(Chat)

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    body: { padding: 16 },
    message: { marginTop: 16 }
});