import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    Image,
    Text,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native';
import Header from '../../../../component/header';
import Api from '../../../../socket';
import Item from './item';
import BottomInput from './bottomInput';
import { getHistoryMessages, addReceiveMessageListener } from "rongcloud-react-native-imlib";

export default class Chat extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        conversationType: null,
        targetId: null,
        userId: null,
        messageType: "",
        oldestMessageId: "-1",
        count: "10",
        messages: []
    }

    _receiveListener = () => {
        this.listener = addReceiveMessageListener(message => {
            const { content } = message.message;
            if (content.data && content.data.length > 999) {
                content.data = content.data.substr(0, 100) + "...";
            }
            console.log(message);
            if (message.message.targetId == this.state.targetId) {
                this.setState({ messages: [...this.state.messages, message.message] });
            }
        });
    }

    _historyMessageUpdate = async () => {
        const { conversationType, targetId, messageType, oldestMessageId, count } = this.state;
        const originMessages = await getHistoryMessages(
            conversationType,
            targetId,
            messageType,
            parseInt(oldestMessageId),
            parseInt(count)
        );
        let messages = this.state.messages.concat(originMessages.reverse());
        let nowOldestMessageId = -1;
        if (originMessages.length > 0) {
            nowOldestMessageId = originMessages[originMessages.length - 1].messageId
        }
        this.setState({ messages, oldestMessageId: `${nowOldestMessageId}` });
    }

    _appendMessage = async (messageId) => {
        const { conversationType, targetId, messageType, count } = this.state;
        const originMessages = await getHistoryMessages(
            conversationType,
            targetId,
            messageType,
            parseInt('-1'),
            parseInt(count)
        );
        let originMessagesRe = originMessages.reverse();
        let filterMsgs = originMessagesRe.filter((item) => {
            if (item.messageId >= messageId) {
                return true
            } else {
                return false
            }
        });
        let messages = this.state.messages.concat(filterMsgs);
        this.setState({ messages, oldestMessageId: `${messageId}` });
    }

    componentDidMount() {
        const targetId = this.props.navigation.getParam('targetId', null);
        const conversationType = this.props.navigation.getParam('conversationType', null);
        const userId = this.props.navigation.getParam('userId', null);
        if (targetId && conversationType) {
            this.setState({
                conversationType,
                targetId,
                userId
            }, () => {
                this._historyMessageUpdate();
                this._receiveListener();
            });
        }

    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove();
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='客服助手'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <FlatList
                        ref={list => this.list = list}
                        style={{ flex: 1 }}
                        data={this.state.messages}
                        renderItem={({ item }) => <Item item={item} userId={this.state.userId} />}
                        extraData={this.state.userId}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
                    <BottomInput
                        callback={this.dataRefresh}
                        conversationType={this.state.conversationType}
                        targetId={this.state.targetId}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    dataRefresh = (messageId) => {
        this._appendMessage(messageId);
    }

}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
});