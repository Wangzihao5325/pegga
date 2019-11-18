import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { update_user_info } from '../../../../store/actions/userAction';
import Api from '../../../../socket';
import Header from '../../../../component/header';
import ItemInput from '../../ItemInput';
import Btn from '../../../../component/btn';
import Toast from '../../../../component/toast';

class NickName extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        editable: false,
        nickName: this.props.nickName,
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='昵称修改'
                    goback={() => this.props.navigation.goBack()}
                />
                <KeyboardAwareScrollView>
                    <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                        <ItemInput
                            margin
                            isControl
                            title='昵称'
                            placeholder='请输入昵称'
                            value={this.state.nickName}
                            callback={this.stateUpdate('nickName')}
                            editable={this.state.editable}
                        />

                        <Btn.Linear
                            style={styles.bottomBtn}
                            textStyle={styles.bottomBtnText}
                            btnPress={this.bottomBtnPress}
                            title={this.state.editable ? '提交' : '编辑'}
                        />

                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }

    stateUpdate = (key) => {
        return (value) => {
            this.setState({
                [key]: value
            });
        }
    }

    bottomBtnPress = () => {
        if (this.state.editable) {
            if (this.state.nickName === this.props.nickName) {
                Toast.show('请输入与之前不同的新昵称!');
                return;
            }
            if (!this.state.nickName.length || this.state.nickName.length == 0) {
                Toast.show('请输入昵称!');
                return;
            }
            Api.checkNickName(this.state.nickName, (result, code, msg) => {
                if (result.isNameBinding) {
                    Api.nickName(this.state.nickName, (result, code, message) => {
                        update_user_info();
                        Toast.show('修改昵称成功!');
                        this.props.navigation.goBack();
                    }, (result, code, message) => {
                        Toast.show('修改昵称失败!');
                    })
                } else {
                    Toast.show('该昵称已经被占用,请重新输入!');
                }
            });
        } else {
            this.setState({
                editable: true
            })
        }
    }
}

function mapState2Props(store) {
    return {
        nickName: store.user.info.nickName,
    }
}

export default connect(mapState2Props)(NickName);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    btn: {
        width: Dimensions.get('window').width - 30,
        height: 40,
        backgroundColor: '#4266D2',
        borderRadius: 10
    },
    btnText: {
        color: 'white',
        fontSize: 15
    },
    itemTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(133,133,133)'
    },
    itemState: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(40,46,60)'
    },
    bottomBtn: {
        height: 40,
        width: Dimensions.get('window').width - 30,
        borderRadius: 5,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    bottomBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
});