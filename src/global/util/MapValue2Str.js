class Value2Str {
    tradeType(value) {
        switch (value) {
            case 0:
                return '买入';
            case 1:
                return '卖出';
            default:
                return '';
        }
    }

    adStateType(value) {
        switch (value) {
            case 0:
                return '已下架';
            case 1:
                return '上架中';
            case 2:
                return '完成';
            default:
                return '';
        }
    }

    _kycLevel(level) {
        switch (level) {
            case 0:
                return '未认证';
            case 1:
                return '已认证';
            case 2:
                return '视频认证';
            default:
                return '';
        }
    }

    kycStatusText(status, level) {
        switch (status) {
            case 0:
                return '审核中';
            case 1:
                return this._kycLevel(level);
            case 2:
                return '审核失败';
            default:
                return this._kycLevel(level);
        }
    }

    orderStateTextWithStyle = (stateCode, fontSize) => {
        let stateText = '';
        let stateTextStyle = { fontFamily: 'PingFang-SC-Medium', fontWeight: 'bold', fontSize: fontSize, color: 'rgb(242,106,58)' };
        switch (stateCode) {
            case 0:
                stateText = '待支付';
                break;
            case 1:
                stateText = '已确认付款';
                break;
            case 2:
                stateText = '取消';
                stateTextStyle.color = 'rgb(179,179,179)'
                break;
            case 4:
                stateText = '已确认收款';
                break;
            case 5:
                stateText = '完成';
                break;
            case 6:
                stateText = '申诉中';
                stateTextStyle.color = 'rgb(64,99,213)'
                break;
            case 7:
                stateText = '支付超时';
                break;
            case 8:
                stateText = '确认收款超时';
                break;
            default:
                break;
        }
        return { stateText, stateTextStyle };
    }

    appealStatusText(value) {
        let stateText = '买家未付款';
        switch (value) {
            case 0:
                stateText = '买家未付款';
                break;
            case 1:
                stateText = '对方欺诈';
                break;
            case 2:
                stateText = '卖家未确认收款';
                break;
            case 3:
                stateText = '其他';
                break;
            default:
                break;
        }
        return stateText;
    }

    payType(value) {
        let stateText = '支付宝';
        switch (value) {
            case 0:
                stateText = '支付宝';
                break;
            case 1:
                stateText = '微信';
                break;
            case 2:
                stateText = '银行卡';
                break;
            case 3:
                stateText = '云闪付';
                break;
            default:
                break;
        }
        return stateText;
    }
}

export default new Value2Str();