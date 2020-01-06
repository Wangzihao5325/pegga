import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    Text,
    TouchableHighlight,
    Platform,
    StyleSheet,
    PermissionsAndroid,
} from 'react-native';
import { WebView } from 'react-native-webview';
import CameraRoll from "@react-native-community/cameraroll";
import Header from '../../../component/header';
import Variables from '../../../global/Variables';
import * as Config from '../../../global/Config';
import RNFetchBlob from 'rn-fetch-blob';

export default class Invite extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _image_save = async (url) => {
        const runSuccess = `window.myToast('保存完成');
        true;`;
        const runFailed = `window.myToast('保存失败');
        true;`;
        const noAccess = `window.myToast('权限不足');
        true;`;
        if (Platform.OS == 'ios') {
            let newPath = await CameraRoll.saveToCameraRoll(url, 'photo');
            if (newPath) {
                this.webView.injectJavaScript(runSuccess);
            } else {
                this.webView.injectJavaScript(runFailed);
            }
        } else if (Platform.OS == 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': '请求读写内存卡权限',
                    'message': '请给予读写内存卡权限以保存海报'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                let res = await RNFetchBlob.config({ fileCache: true, appendExt: 'png' }).fetch('GET', url);
                let path = res.path();
                let newPath = await CameraRoll.saveToCameraRoll(`file://${path}`, 'photo');
                if (newPath) {
                    this.webView.injectJavaScript(runSuccess);
                } else {
                    this.webView.injectJavaScript(runFailed);
                }
            } else {
                this.webView.injectJavaScript(noAccess);
            }
        }
    }

    _h5_save = async (event) => {
        let get_data = JSON.parse(event.nativeEvent.data);
        if (get_data.type === 'save_image') {
            await this._image_save(get_data.imageUrl);
        }
    }

    render() {
        let uri = `${Config.SERVICE_URL.invite}?t=${Variables.account.token}`
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='邀请'
                    goback={() => this.props.navigation.goBack()}
                    rightBtnTitle='我的邀请'
                    rightBtnPress={this.toDetail}
                />
                <WebView
                    ref={webView => this.webView = webView}
                    source={{ uri }}
                    style={{ width: Dimensions.get('window').width }}
                    onMessage={this._h5_save}
                />
            </SafeAreaView>
        );
    }

    toDetail = () => {
        this.props.navigation.navigate('InviteList');
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
});