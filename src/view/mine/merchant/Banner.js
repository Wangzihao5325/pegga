import React, { PureComponent } from 'react';
import { View, Image, ImageBackground, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Btn from '../../../component/btn';
import Enum from '../../../global/Enum';
import Api from '../../../socket';

const ItemHeader = (props) => {
    let btnStyle = null;
    let btnTextStyle = null;
    let imageSource = require('../../../image/mine/merchant/merchantcertifi.png');
    let titleText = '商家认证';
    let payTitle = '激活数量';
    let btnText = '立即激活'
    switch (props.pageType) {
        case Enum.ROLE.BUSINESS_ROLE[2].key:
            imageSource = require('../../../image/mine/merchant/merchantcertifi.png');
            titleText = '商家认证';
            payTitle = '激活数量';
            if (props.pageState == 1 || props.pageState == 2) {
                btnText = '立即激活';
            } else if (props.pageState == 0) {
                btnText = '审核中';
            }
            break;
        case Enum.ROLE.BUSINESS_ROLE[3].key:
            imageSource = require('../../../image/mine/merchant/trust.png');
            titleText = '信任商家';
            payTitle = '质押数量';
            btnTextStyle = { color: 'rgb(206,152,64)' };
            if (props.pageState == 1 || props.pageState == 2) {
                btnText = props.role.roleName == Enum.ROLE.BUSINESS_ROLE[3].key ? '申请解冻' : '立即申请';
            } else if (props.pageState == 0) {
                btnText = '审核中';
            }
            break;
        case Enum.ROLE.BUSINESS_ROLE[4].key:
            imageSource = require('../../../image/mine/merchant/bulk.png');
            titleText = '大宗商家';
            payTitle = '质押数量';
            btnTextStyle = { color: 'rgb(255,255,255)' };
            btnStyle = { borderColor: 'white', borderWidth: 1, backgroundColor: 'transparent' }
            if (props.pageState == 1 || props.pageState == 2) {
                btnText = props.role.roleName == Enum.ROLE.BUSINESS_ROLE[3].key ? '申请解冻' : '立即申请';
            } else if (props.pageState == 0) {
                btnText = '审核中';
            }
            break;
        default:
            break;
    }
    return (
        <ImageBackground style={styles.headerContainer} source={imageSource}>
            <Text style={styles.title}>{`${titleText}`}</Text>
            <Text style={[styles.info, { marginTop: 30 }]}>{`可用余额: ${props.applyInfoData.balance} ${props.applyInfoData.token}`}</Text>
            <Text style={[styles.info, { marginTop: 10 }]}>{`${payTitle}: ${props.applyInfoData.activeBalance} ${props.applyInfoData.token}`}</Text>
            <Btn.Normal style={[styles.btn, btnStyle]} textStyle={[styles.btnText, btnTextStyle]} btnPress={() => props.callback(props.pageType, props.pageState, props.applyInfoData)} title={btnText} />
        </ImageBackground>
    );
}

const Details = (props) => {
    let imageSource = props.enable ? require('../../../image/mine/merchant/right.png') : require('../../../image/mine/merchant/tips.png');
    return (
        <View style={styles.detail}>
            <Image style={styles.detailImage} source={imageSource} />
            <Text style={styles.detailText}>{props.context}</Text>
        </View>
    );
}

const ItemContext = (props) => {
    return (
        <View style={styles.contextContainer}>
            <Text style={styles.descriptionTitle}>权限与说明</Text>
            <View style={styles.descriptionContext}>
                {
                    props.contextData.map((item) => {
                        return (
                            <Details
                                key={item.context}
                                enable={item.select}
                                context={item.context}
                            />
                        )
                    })
                }
            </View>
        </View>
    );
}

const DEALERS_CONTEXT = [
    { select: false, context: '需缴纳激活金成为商家' },
    { select: true, context: '可参与交易补贴活动' },
    { select: true, context: '具备TO B发布出币广告的权限' },
    { select: true, context: 'TO B交易量达到标准后,自动退还激活金' }
];

const UPGRADE_CONTEXT = [
    { select: false, context: '需缴纳激活金成为商家' },
    { select: true, context: '可参与交易补贴活动' },
    { select: true, context: '具备TO B发布出币广告的权限' },
    { select: true, context: '具备自动解冻权限' }
];

class Item extends PureComponent {
    render() {
        let contextData = DEALERS_CONTEXT;
        switch (this.props.pageType) {
            case Enum.ROLE.BUSINESS_ROLE[2].key:
                contextData = DEALERS_CONTEXT;
                break;
            case Enum.ROLE.BUSINESS_ROLE[3].key:
                contextData = UPGRADE_CONTEXT;
                break;
            case Enum.ROLE.BUSINESS_ROLE[4].key:
                contextData = UPGRADE_CONTEXT;
                break;
            default:
                break;
        }
        return (
            <View style={styles.itemContainer}>
                <ItemHeader
                    pageType={this.props.pageType}
                    pageState={this.props.pageState}
                    applyInfoData={this.props.applyInfoData}
                    callback={this.props.btnPress}
                    role={this.props.role}
                />
                <ItemContext
                    contextData={contextData}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.user.role
})

export default connect(mapStateToProps)(Item);

const styles = StyleSheet.create({
    headerContainer: {
        height: (Dimensions.get('window').width - 30) / 690 * 328,
        width: Dimensions.get('window').width - 30,
        borderRadius: 10,
        flex: 1,
        paddingHorizontal: 25
    },
    title: {
        fontSize: 'PingFang-SC-Medium',
        fontSize: 16,
        color: 'white',
        marginTop: 17
    },
    info: {
        fontSize: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'white',
    },
    btn: {
        height: 30,
        width: 70,
        backgroundColor: 'white',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 13
    },
    btnText: {
        color: 'rgb(101,108,145)',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 13
    },
    contextContainer: {
        height: 250,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15
    },
    descriptionTitle: {
        fontSize: 16,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium',
        marginTop: 20,
    },
    descriptionContext: {
        height: 175,
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#F7F7F8',
        marginTop: 15,
        paddingVertical: 25,
        paddingLeft: 18,
        justifyContent: 'space-between'
    },
    detail: {
        height: 30,
        width: Dimensions.get('window').width - 78,
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailImage: {
        height: 15,
        width: 15
    },
    detailText: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Regular',
        color: 'rgb(40,46,60)',
        marginLeft: 12
    },
    itemContainer: {
        width: Dimensions.get('window').width - 24,
        height: (Dimensions.get('window').width - 30) / 690 * 328 + 250 + 15,
        alignItems: 'center'
    }
});