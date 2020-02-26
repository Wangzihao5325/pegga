import React, { Component } from 'react';
import { SafeAreaView, TouchableHighlight, Image, View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
import Header from '../../../../component/header';
import PhotoUpload from '../../../../component/photoUpload';
import Api from '../../../../socket';
import Toast from '../../../../component/toast';
import Btn from '../../../../component/btn';
import _ from 'lodash';
import { connect } from 'react-redux';

function ItemInput(props) {
    return (
        <View style={[styles.itemContainer, props.bottomLine ? styles.borderBottm : null]}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.context} >
                <TextInput secureTextEntry={props.secureTextEntry} style={[{ flex: 1, marginHorizontal: 10, textAlign: 'right' }, props.inputStyle]} placeholder={props.placeholder} value={props.value} onChangeText={(value) => props.callback(value)} editable={props.editable} />
                {typeof props.unit == 'string' && <Text style={styles.unit} >{`| ${props.unit}`}</Text>}
            </View>
        </View>
    );
}

function ItemSelect(props) {
    return (
        <View style={[styles.itemContainer, props.bottomLine ? styles.borderBottm : null]}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableHighlight style={{ flex: 1 }} underlayColor='transparent' onPress={props.callback}>
                <View style={styles.context} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            props.data.map((item, index) => {
                                let title = '买家未付款';
                                switch (item.key) {
                                    case 0:
                                        title = '买家未付款';
                                        break;
                                    case 1:
                                        title = '对方欺诈';
                                        break;
                                    case 2:
                                        title = '卖家未确认收款';
                                        break;
                                    case 3:
                                        title = '其它';
                                        break;
                                    default:
                                        break;
                                }
                                return (
                                    <Text style={[styles.contextText, { color: 'rgb(64,99,213)' }]} key={item.key} >{`${title}`}</Text>
                                )
                            })
                        }
                        <Image style={{ height: 15, width: 15, marginLeft: 5 }} source={require('../../../../image/arrow/arrow_right.png')} />
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const Reg = { inputText: '' };

class AddAppeal extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: [{ select: true, title: "买家未付款", key: 0 }],
        totalData: [{ select: true, title: "买家未付款", key: 0 }, { select: false, title: "对方欺诈", key: 1 }, { select: false, title: "卖家未确认收款", key: 2 }, { select: false, title: "其他", key: 3 }],
        pageType: 'source',
        orderId: '',
        sourceNo: '',
        targetNo: '',
        isFrozen: false
    }

    componentDidMount() {
        const pageType = this.props.navigation.getParam('type', 'source');
        const orderId = this.props.navigation.getParam('orderId', '');
        const sourceNo = this.props.navigation.getParam('sourceNo', '');
        const targetNo = this.props.navigation.getParam('targetNo', '');
        this.setState({
            pageType,
            orderId,
            sourceNo,
            targetNo
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                    <View style={{ backgroundColor: 'white' }}>
                        <Header.Normal title='上传证据' goback={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ backgroundColor: 'white', marginTop: 1 }} >
                        <ItemInput title='申诉订单号' editable={false} value={this.state.orderId} />
                    </View>
                    <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                        <ItemSelect
                            title='申诉类型'
                            data={this.state.data}
                            callback={this.typeSelect}
                        />
                    </View>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
                        <Text style={[styles.title, { marginTop: 15 }]}>填写申诉内容</Text>
                        <TextInput style={styles.textInput} multiline={true} numberOfLines={5} onChangeText={this.inputChange} />
                    </View>
                    <View style={{ height: 160, width: Dimensions.get('window').width, paddingBottom: 10, backgroundColor: 'white' }}>
                        <Text style={[styles.title, { marginLeft: 15, marginBottom: 5 }]}>上传凭证(最多三张)</Text>
                        <PhotoUpload
                            ref={imageUpload => this.imageUpload = imageUpload}
                            maxPic={3}
                        />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <Btn.StateLiner
                            isFrozen={this.state.isFrozen}
                            style={styles.btn}
                            textStyle={styles.btnText}
                            frozenTextStyle={styles.btnText}
                            btnPress={this.addAppeal}
                            frozenTitle='上传中'
                            title='确认上传'
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    typeSelect = () => {
        this.props.navigation.navigate('SelectModel',
            {
                data: JSON.stringify(this.state.totalData),
                //type: 'multiple',
                title: '申诉类型',
                callback: (selectDataArr, nowState) => {
                    this.setState({
                        data: selectDataArr,
                        totalData: nowState,
                    });
                }
            });
    }

    inputChange = (value) => {
        Reg.inputText = value;
    }

    addAppeal = () => {
        if (this.state.pageType == 'source') {
            this.appealBySource();
        } else {
            if (this.props.info.uuid == this.state.sourceNo) {
                this.appealBySource();
            } else if (this.props.info.uuid == this.state.targetNo) {
                this.appealByTarget();
            }
        }

    }

    appealBySource = async () => {
        let refStateData = this.imageUpload.state.imageSelectData;
        if (!Reg.inputText || (typeof Reg.inputText == 'string' && Reg.inputText.length == 0)) {
            Toast.show('请阐述申诉理由');
            return;
        }
        if (refStateData.length < 3) {
            Toast.show('请至少上传2张证据图');
            return;
        }
        //Toast.show('申诉内容上传中，请耐心等待');
        this.setState({
            isFrozen: true
        });
        let imageUrlArrReg = await Promise.all(refStateData.map(async (item) => {
            if (item.size > 0) {
                let imageUrl = await Api.imageUploadPromise(item);
                return imageUrl.data
            } else {
                return null;
            }
        }));
        let imageUrlArr = _.compact(imageUrlArrReg);
        let payload = {
            appealType: this.state.data[0].key,
            orderNo: this.state.orderId,
            reason: Reg.inputText,
            sourceAppealPics: imageUrlArr
        };
        Api.appealBySource(payload, () => {
            Toast.show('提交证据成功！');
            this.setState({
                isFrozen: false
            });
            this.props.navigation.goBack();
        }, () => {
            this.setState({
                isFrozen: false
            });
        });

    }

    appealByTarget = async () => {
        let refStateData = this.imageUpload.state.imageSelectData;
        if (!Reg.inputText || (typeof Reg.inputText == 'string' && Reg.inputText.length == 0)) {
            Toast.show('请阐述申诉理由');
            return;
        }
        if (refStateData.length < 3) {
            Toast.show('请至少上传2张证据图');
            return;
        }
        Toast.show('申诉内容上传中，请耐心等待');
        let imageUrlArrReg = await Promise.all(refStateData.map(async (item) => {
            if (item.size > 0) {
                let imageUrl = await Api.imageUploadPromise(item);
                return imageUrl.data
            } else {
                return null;
            }
        }))
        let imageUrlArr = _.compact(imageUrlArrReg);
        let payload = {
            appealType: this.state.data[0].key,
            orderNo: this.state.orderId,
            reason: Reg.inputText,
            sourceAppealPics: imageUrlArr
        };
        Api.appealByTarget(payload, () => {
            Toast.show('提交证据成功！');
            this.props.navigation.goBack();
        });
    }
}

const mapStateToProps = (state) => ({
    info: state.user.info
})

export default connect(mapStateToProps)(AddAppeal);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    itemContainer: {
        height: 55,
        width: Dimensions.get('window').width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 1
    },
    borderBottm: {
        borderBottomColor: '#F7F7F7',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 15,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium'
    },
    context: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    contextText: {
        fontSize: 15,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium'
    },
    textInput: {
        height: 135,
        width: Dimensions.get('window').width - 30,
        borderColor: 'rgb(188,192,203)',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        fontSize: 15,
        textAlignVertical: 'top',
        marginTop: 10,
        marginBottom: 32
    },
    btn: {
        height: 50,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'rgb(64,99,213)',
        borderRadius: 5,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
});