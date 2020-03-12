import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image, Dimensions, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from '../../../../component/toast';
import Api from '../../../../socket';
import LinearGradient from 'react-native-linear-gradient';
import {
    sendMessage,
    sendMediaMessage,
    ConversationType,
    MentionedType,
    recallMessage,
    cancelSendMediaMessage,
    ObjectName
} from "rongcloud-react-native-imlib";
import { NavigationEvents } from 'react-navigation';

const Item = (props) => {
    return (
        <TouchableHighlight style={{ width: 40, height: 60 }} onPress={props.callback} >
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                <Image style={{ height: 25, width: 25 }} source={props.source} />
                <Text>{`${props.title}`}</Text>
            </View>
        </TouchableHighlight>
    );
}

const FuncTabs = (props) => {
    return (
        <View style={{ backgroundColor: 'white', height: 80, width: Dimensions.get('window').width, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25 }}>
            <Item title='图片' source={require('../../../../image/customService/picture_icon.png')} callback={props.imageUpload} />
        </View>
    );
}

export default class BottomInput extends PureComponent {
    state = {
        isShow: false,
        value: '',
        isMentioned: false,
        mentionedList: [],
        isContainNoName: false,
    }

    naviDidFocus = () => {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        let btnImage = this.state.isShow ? require('../../../../image/customService/close.png') : require('../../../../image/customService/function.png');
        return (
            <View>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
                <View style={styles.container}>
                    <TextInput
                        ref={input => this.input = input}
                        style={styles.input}
                        value={this.state.value}
                        onChangeText={this.textChange}
                        returnKeyType='done'
                    />
                    <TouchableHighlight style={styles.btn} onPress={this.tabsShow} underlayColor='transparent'>
                        <Image style={{ height: 33, width: 33 }} source={btnImage} />
                    </TouchableHighlight>
                    {Boolean(this.state.value) &&
                        <TouchableHighlight style={styles.sendBtn} onPress={this.submit} underlayColor='transparent'>
                            <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 33, width: 66, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>发送</Text>
                            </LinearGradient>
                        </TouchableHighlight>
                    }
                </View>
                {this.state.isShow &&
                    <FuncTabs imageUpload={this.imageUpload} />
                }
            </View>
        );
    }

    submit = () => {
        if (!this.state.value) {
            Toast.show('请输入内容');
            return;
        }
        const { conversationType, targetId } = this.props;
        const { value } = this.state;
        let extra = JSON.stringify({ userId: this.props.userId, userName: this.props.nickName ? this.props.nickName : '游客' });
        let content = { objectName: ObjectName.Text, content: value, extra };
        // if (this.state.isMentioned) {
        //     let metionArr = this.state.mentionedList.map((res) => { return res.uuid });
        //     content = { objectName: ObjectName.Text, content: value, mentionedInfo: { type: MentionedType.PART, userIdList: [...metionArr] }, extra }
        // }
        const message = { conversationType, targetId, content };
        const callback = {
            success: messageId => {
                this.setState({
                    value: '',
                    isMentioned: false,
                    isContainNoName: false,
                    mentionedList: []
                });
                this.props.callback(messageId);
            },
            cancel: () => {
                Toast.show('取消发送');
            },
            error: (errorCode, messageId, message) => {
                Toast.show(`消息发送失败：${errorCode}`);
            }
        };
        sendMessage(message, callback);
    }

    textChange = (value) => {
        if (this.props.conversationType == ConversationType.GROUP && value && typeof value == 'string') {
            if ((this.state.value.length < value.length) && (value.charAt(value.length - 1) == '@')) {
                this.props.navi.navigate('AtList',
                    {
                        targetId: this.props.targetId,
                        uuid: this.props.uuid,
                        callback: (atItem) => {
                            let itemName = atItem.nickName ? atItem.nickName : '游客';
                            let isContainNoName = this.state.isContainNoName || (atItem.nickName ? false : true);
                            //let uuid = atItem.uuid;
                            this.setState({
                                value: `${value}${itemName} `,
                                isMentioned: true,
                                isContainNoName,
                                mentionedList: [...this.state.mentionedList, atItem]
                            });
                        }
                    });
            }
            if (this.state.isMentioned && (this.state.value.length > value.length)) {//群组 删除文字 清空@
                if (this.state.isContainNoName) {
                    Toast.show('可能存在一个或多个初始昵称');
                    this.setState({
                        value: '',
                        mentionedList: [],
                        isMentioned: false
                    });
                    return;
                }
                let regValue = this.state.value.concat();
                let filterArr = this.state.mentionedList.filter((item) => {
                    let isContain = value.indexOf(`@${item.nickName} `);
                    if (isContain >= 0) {
                        return true;
                    } else {
                        regValue = regValue.split(`@${item.nickName} `).join('');
                        return false
                    }
                });
                this.setState({
                    value: filterArr.length == this.state.mentionedList.length ? value : regValue,
                    mentionedList: filterArr,
                    isMentioned: filterArr.length > 0 ? true : false
                });
                return;
            }
        }
        this.setState({
            value
        });
    }

    tabsShow = () => {
        this.setState((preState) => {
            return ({
                isShow: !preState.isShow
            });
        });
    }

    imageUpload = () => {
        this.setState({
            isShow: false
        });
        ImagePicker.openPicker({
            multiple: false,
            //includeBase64: true
        }).then(images => {
            let uri = images.path || images.sourceURL;
            const { conversationType, targetId } = this.props;
            let extra = JSON.stringify({ userId: this.props.userId, userName: this.props.nickName ? this.props.nickName : '游客' });
            let content = { objectName: ObjectName.Image, local: uri, isFull: true, extra };
            const message = { conversationType, targetId, content };
            const callback = {
                success: messageId => {
                    this.props.callback(messageId);
                },
                cancel: () => {
                    Toast.show('取消发送');
                },
                error: (errorCode, messageId, message) => {
                    Toast.show(`消息发送失败：${messageId}`);
                }
            };
            sendMediaMessage(message, callback);
        }).catch(e => {
            if (Platform.OS == 'android') {
                Toast.show('选择图片失败');
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    input: {
        flex: 1,
        height: 33,
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 5,
        backgroundColor: '#F3F5F9',
        paddingVertical: 0
    },
    btn: {
        height: 33,
        width: 33,
        marginTop: 10,
        marginLeft: 15
    },
    sendBtn: {
        height: 33,
        width: 66,
        marginTop: 10,
        marginLeft: 15,
        backgroundColor: 'red',
        borderRadius: 5
    }
});
//