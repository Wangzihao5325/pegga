import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    Platform,
    Image,
    StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Api from '../../../socket';
import Header from '../../../component/header';
import Btn from '../../../component/btn';
import ItemInput from '../ItemInput';
import ImageUpload from './ImageUpload';

import Toast from '../../../component/toast';

const IMAGE_HEIGHT = (Dimensions.get('window').width - 45) / 2 / 160 * 90;

export default class About extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        name: '',
        idCard: '',
        imageFront: 'www.test.png',
        imageBack: 'www.test.png',
        imageHand: 'www.test.png',
        frontData: null,
        backData: null,
        handleData: null
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='身份认证'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ paddingHorizontal: 15, height: 45, width: Dimensions.get('window').width, backgroundColor: '#DAE1F6', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#4b88e3', lineHeight: 20 }}>确保您使用的是本人真实身份进行验证,我们会保护您的信息安全</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <ItemInput
                        bottomLine
                        isControl
                        title='姓名'
                        placeholder='请输入真实姓名'
                        value={this.state.name}
                        callback={this.stateUpdate('name')}
                    />
                    <ItemInput
                        isControl
                        title='身份证号'
                        placeholder='请输入身份证号'
                        value={this.state.idCard}
                        callback={this.stateUpdate('idCard')}
                    />

                    <View style={styles.idCardImageUpload}>
                        <Text style={styles.titleText}>证件照片</Text>
                        <View style={styles.imageUploadWrapper}>
                            <ImageUpload
                                title='证件照正面照'
                                value={this.state.frontData}
                                callback={() => this.uploadImage('frontData')}
                                del={() => this.delImage('frontData')}
                            />
                            <ImageUpload
                                title='证件照反面照'
                                value={this.state.backData}
                                callback={() => this.uploadImage('backData')}
                                del={() => this.delImage('backData')}
                            />
                        </View>
                    </View>

                    <View style={styles.idCardImageUpload}>
                        <Text style={styles.titleText}>手持证件照片</Text>
                        <View style={styles.imageUploadWrapper}>
                            <ImageUpload
                                title='手持证件照片'
                                value={this.state.handleData}
                                callback={() => this.uploadImage('handleData')}
                                del={() => this.delImage('handleData')}
                            />
                        </View>
                    </View>

                    <Btn.Linear style={styles.btn} textStyle={styles.btnText} btnPress={this.submit} title='提交' />
                </View>
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

    uploadImage = (key) => {
        ImagePicker.openPicker({
            multiple: false,
            //maxFiles: this.props.maxPic,
            includeBase64: true
        }).then(images => {
            this.setState({
                [key]: images
            });
        }).catch(e => {
            if (Platform.OS == 'android') {
                Toast.show('选择图片失败');
            }
        });
    }

    delImage = (key) => {
        this.setState({
            [key]: null
        });
    }

    submit = async () => {
        if (!this.state.frontData || !this.state.backData || !this.state.handleData) {
            Toast.show('请选择证件照片');
            return;
        }
        Toast.show('图片上传中，请勿进行其他操作!');
        let frontRes = await Api.imageUploadPromise(this.state.frontData);
        let backRes = await Api.imageUploadPromise(this.state.backData);
        let handleRes = await Api.imageUploadPromise(this.state.handleData);
        let payload = {
            idNumber: this.state.idCard,
            identityImageBack: backRes.data,
            identityImageFront: frontRes.data,
            identityImageHand: handleRes.data,
            realName: this.state.name
        }
        Api.identity(payload, () => {
            Toast.show('提交成功!');
        }, (result, code, message) => {
            let msg = message ? message : '信息提交失败!';
            Toast.show(msg);
        });
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
    btn: {
        width: Dimensions.get('window').width - 30,
        height: 40,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 15
    },
    idCardImageUpload: {
        marginTop: 10,
        height: IMAGE_HEIGHT + 80,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    imageUploadWrapper: {
        height: IMAGE_HEIGHT,
        width: Dimensions.get('window').width - 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)',
        textAlignVertical: 'center'
    },
});