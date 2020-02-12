import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    FormItem,
    TextInput,
    Text,
    Button,
    Image,
    FlatList,
    View,
    TouchableHighlight
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
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

class Item extends Component {
    render() {
        let name = ''
        switch (this.props.item.type) {
            case ConversationType.PRIVATE:
                name = this.props.item.nickName;
                break;
            case ConversationType.GROUP:
                name = this.props.item.name;
                break;
            default:
                break;
        }
        //let subName = name.substr(0, 1);
        return (
            <TouchableHighlight style={{ height: 70, width: Dimensions.get('window').width, paddingHorizontal: 15 }} onPress={this.props.callback} underlayColor='transparent'>
                <View style={{ height: 70, width: Dimensions.get('window').width - 30, flexDirection: 'row', alignItems: 'center', borderBottomColor: '#F8F9FB', borderBottomWidth: 1 }}>
                    <Image style={styles.avater} source={require('../../../image/usual/group_avater.png')} />
                    <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 2, justifyContent: 'flex-start', paddingLeft: 8 }}>
                        <Text>{`${name}`}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

class CustomItem extends Component {
    render() {
        let name = ''
        switch (this.props.item.type) {
            case ConversationType.PRIVATE:
                name = this.props.item.nickName;
                break;
            case ConversationType.GROUP:
                name = this.props.item.name;
                break;
            default:
                break;
        }
        //let subName = name.substr(0, 1);
        let imageSource = this.props.index % 2 == 0 ? require('../../../image/usual/tx_g.png') : require('../../../image/usual/tx_b.png');
        return (
            <TouchableHighlight style={{ height: 100, width: 80 }} onPress={this.props.callback} underlayColor='transparent'>
                <View style={{ height: 100, width: 80, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={[styles.avater, { height: 55, width: 55 }]} source={imageSource} />
                    <Text style={{ marginTop: 10, fontSize: 13, color: 'rgb(49,56,73)', fontFamily: 'PingFang-SC-Medium' }}>{`${name}`}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

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
        token: this.props.token,

        data: [],
        customData: [],
        groupData: [],
    };

    componentDidMount() {
        this.listener = addConnectionStatusListener(status => this.setState({ status }));
        this.connect();
        setReconnectKickEnable(true);
        this.listDataFetch();
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

    toChat = (item) => {
        let name = ''
        switch (item.type) {
            case ConversationType.PRIVATE:
                name = item.nickName;
                break;
            case ConversationType.GROUP:
                name = item.name;
                break;
            default:
                break;
        }
        this.props.navigation.navigate('IMChatView', { conversationType: item.type, targetId: item.uuid, userId: this.props.userId, name });
    }

    getCon = async () => {
        const conversation = await getConversationList([ConversationType.GROUP], 10, 0);
        const con = await getConversation(ConversationType.GROUP, 'aaa');
        //console.log(con);
    }

    listDataFetch = async () => {
        let serviceList = await Api.chatCustomerService();
        let groupList = await Api.chatGroups();
        if (serviceList && groupList) {
            let serviceListData = serviceList.map((item) => {
                let itemWithType = _.assign({}, item);
                itemWithType.type = ConversationType.PRIVATE;
                return itemWithType;
            });

            let groupListData = groupList.map(item => {
                let itemWithType = _.assign({}, item);
                itemWithType.type = ConversationType.GROUP;
                return itemWithType;
            })

            let data = serviceListData.concat(groupListData);
            this.setState({
                data,
                customData: serviceListData,
                groupData: groupListData
            });
        }
    }

    render() {
        //const { status, message, token } = this.state;
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='聊天'
                    goback={() => this.props.navigation.goBack()}
                />
                {/* <TextInput value={token} onChangeText={this.setToken} placeholder="请提供 Token" />
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
                <Button title='con' onPress={this.getCon} /> */}
                <View style={{ height: 100, width: Dimensions.get('window').width, backgroundColor: '#F3F5F9' }}>
                    <FlatList
                        //
                        data={this.state.customData}
                        horizontal={true}
                        renderItem={({ item, index }) => <CustomItem index={index} item={item} callback={() => this.toChat(item)} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <FlatList
                    data={this.state.groupData}
                    renderItem={({ item }) => <Item item={item} callback={() => this.toChat(item)} />}
                    keyExtractor={(item, index) => index.toString()}
                />
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
    message: { marginTop: 16 },
    avater: {
        borderRadius: 5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});