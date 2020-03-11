import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    Platform,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native';
import Header from '../../../../component/header';
import Api from '../../../../socket';
import Item from './item';
import BottomInput from './bottomInput';
import { getHistoryMessages, ConversationType, addReceiveMessageListener } from "rongcloud-react-native-imlib";
import { connect } from 'react-redux'

class Chat extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        conversationType: null,
        targetId: null,
        targetName: '',
        userId: null,
        messageType: "",
        oldestMessageId: "-1",
        count: "1000",
        messages: []
    }

    _receiveListener = () => {
        this.listener = addReceiveMessageListener(message => {
            const { content } = message.message;
            if (content.data && content.data.length > 999) {
                content.data = content.data.substr(0, 100) + "...";
            }
            if (message.message.targetId == this.state.targetId) {
                this.setState({ messages: [...this.state.messages, message.message] }, () => {
                    setTimeout(() => { this.list.scrollToEnd({ animated: true }) }, 1000)
                });
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
        //console.log(originMessages);
        let messages = this.state.messages.concat(originMessages.reverse());
        let nowOldestMessageId = -1;
        if (originMessages.length > 0) {
            nowOldestMessageId = originMessages[originMessages.length - 1].messageId
        }
        this.setState({ messages, oldestMessageId: `${nowOldestMessageId}` }, () => {
            setTimeout(() => {
                this.list.scrollToEnd({ animated: true });
            }, 1000);
        });
    }

    _appendHistoryMessage = async () => {
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
    }

    _appendMessage = async (messageId) => {
        const { conversationType, targetId, messageType, count } = this.state;
        const originMessages = await getHistoryMessages(
            conversationType,
            targetId,
            messageType,
            parseInt('-1'),
            parseInt('10')
        );
        let originMessagesRe = originMessages.reverse();
        let filterMsgs = originMessagesRe.filter((item) => {
            if (item.messageId >= messageId) {
                return true
            } else {
                return false
            }
        });
        //let messages = this.state.messages.concat(filterMsgs);
        this.setState({ messages: [...this.state.messages, ...filterMsgs], oldestMessageId: `${messageId}` },
            () => {
                setTimeout(() => {
                    this.list.scrollToEnd({ animated: true });
                }, 1000);
            });
    }

    _GroupNotice = (uid) => {
        Api.groupNotice(uid, (res) => {
            if (res && !res.visited) {
                this.timer = setTimeout(() => {
                    this.props.navigation.navigate('PopModel', {
                        confirmText: '确定',
                        title: '群公告',
                        context: res.content,
                    }, 2000);
                });
            }
        });
    }

    componentDidMount() {
        const targetId = this.props.navigation.getParam('targetId', null);
        const conversationType = this.props.navigation.getParam('conversationType', null);
        const userId = this.props.navigation.getParam('userId', null);
        const targetName = this.props.navigation.getParam('name', null);//name
        if (targetId && conversationType) {
            this.setState({
                conversationType,
                targetId,
                userId,
                targetName
            }, () => {
                this._historyMessageUpdate();
                this._receiveListener();
            });
            if (conversationType == ConversationType.GROUP) {
                this._GroupNotice(targetId);
            }
        }

    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove();
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={this.state.targetName}
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
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
                    <BottomInput
                        callback={this.dataRefresh}
                        conversationType={this.state.conversationType}
                        targetId={this.state.targetId}
                        userId={this.state.userId}
                        nickName={this.props.nickName}
                        navi={this.props.navigation}
                        uuid={this.props.uuid}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    dataRefresh = (messageId) => {
        this._appendMessage(messageId);
    }

}

const mapStateToProps = (state) => ({
    nickName: state.user.info.nickName,
    uuid: state.user.info.uuid,
})

export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
});