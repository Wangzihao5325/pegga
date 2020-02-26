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
import I18n from '../../../global/doc/i18n';
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
        isFrozen: false,
        name: '',
        idCard: '',
        frontData: null,
        backData: null,
        handleData: null,
        tips: I18n.IDENTITY_TIPS
    }

    componentDidMount() {
        //reason
        const type = this.props.navigation.getParam('type', 'upload');
        if (type == 'reUpload') {
            const reason = this.props.navigation.getParam('reason', '');
            Api.identityInfo((result) => {
                this.setState({
                    name: result.realName,
                    idCard: result.idNumber,
                    frontData: { size: -1, path: result.identityImageFront, sourceURL: result.identityImageFront },
                    backData: { size: -1, path: result.identityImageBack, sourceURL: result.identityImageBack },
                    handleData: { size: -1, path: result.identityImageHand, sourceURL: result.identityImageHand },
                    tips: `您的身份审核申请被驳回，原因如下：${reason}`
                });
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={I18n.IDENTITY_AUTHER}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ paddingHorizontal: 15, height: 50, width: Dimensions.get('window').width, backgroundColor: '#DAE1F6', flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ height: 21, width: 21 }} source={require('../../../image/usual/Caution_icon.png')} />
                    <View style={{ width: Dimensions.get('window').width - 30 - 21 - 10, marginLeft: 10 }}><Text style={{ color: '#4b88e3', lineHeight: 20 }}>{`${this.state.tips}`}</Text></View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <ItemInput
                        bottomLine
                        isControl
                        title={I18n.IDENTITY_NAME}
                        placeholder={I18n.IDENTITY_INPUT_NAME}
                        value={this.state.name}
                        callback={this.stateUpdate('name')}
                    />
                    <ItemInput
                        isControl
                        title={I18n.ID_CARD}
                        placeholder={I18n.ID_CARD_INPUT}
                        value={this.state.idCard}
                        callback={this.stateUpdate('idCard')}
                    />

                    <View style={styles.idCardImageUpload}>
                        <Text style={styles.titleText}>{`${I18n.ID_IMAGE}`}</Text>
                        <View style={styles.imageUploadWrapper}>
                            <ImageUpload
                                title={I18n.FRONT_IMAGE}
                                value={this.state.frontData}
                                callback={() => this.uploadImage('frontData')}
                                del={() => this.delImage('frontData')}
                            />
                            <ImageUpload
                                title={I18n.BACK_IMAGE}
                                value={this.state.backData}
                                callback={() => this.uploadImage('backData')}
                                del={() => this.delImage('backData')}
                            />
                        </View>
                    </View>

                    <View style={styles.idCardImageUpload}>
                        <Text style={styles.titleText}>{`${I18n.HAND_HELD}`}</Text>
                        <View style={styles.imageUploadWrapper}>
                            <ImageUpload
                                title={I18n.HAND_HELD}
                                value={this.state.handleData}
                                callback={() => this.uploadImage('handleData')}
                                del={() => this.delImage('handleData')}
                            />
                        </View>
                    </View>

                    <Btn.StateLiner
                        isFrozen={this.state.isFrozen}
                        style={styles.btn}
                        textStyle={styles.btnText}
                        frozenTextStyle={styles.btnText}
                        btnPress={this.submit}
                        title={I18n.SUBMIT}
                        frozenTitle='上传中'
                    />
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
        //Toast.show('图片上传中，请勿进行其他操作!');
        this.setState({ isFrozen: true });
        let identityImageFront = '';
        let identityImageBack = '';
        let identityImageHand = '';
        if (this.state.frontData.size > 0) {
            let frontRes = await Api.imageUploadPromise(this.state.frontData);
            identityImageFront = frontRes.data;
        } else {
            identityImageFront = this.state.frontData.path;
        }
        if (this.state.backData.size > 0) {
            let backRes = await Api.imageUploadPromise(this.state.backData);
            identityImageBack = backRes.data;
        } else {
            identityImageBack = this.state.backData.path;
        }
        if (this.state.handleData.size > 0) {
            let handleRes = await Api.imageUploadPromise(this.state.handleData);
            identityImageHand = handleRes.data;
        } else {
            identityImageHand = this.state.handleData.path;
        }
        let payload = {
            idNumber: this.state.idCard,
            identityImageBack,
            identityImageFront,
            identityImageHand,
            realName: this.state.name
        }
        Api.identity(payload, () => {
            Toast.show('提交成功!');
            this.setState({ isFrozen: false })
            this.props.navigation.goBack();
        }, () => {
            this.setState({ isFrozen: false })
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
        borderRadius: 5,
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