import React, { PureComponent } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TouchableHighlight,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import store from '../../store';
import { assets_show_state_change } from '../../store/actions/assetsAction';
import I18n from '../../global/doc/i18n';

class Banner extends PureComponent {
    state = {
        isShowAssets: true
    }

    render() {
        let safeAmount = (this.props.legalWallet && this.props.legalWallet.PQC) ? this.props.legalWallet.PQC.allAmount : 0
        let imageSource = this.props.show ? require('../../image/security/see.png') : require('../../image/security/close_see.png');
        let assetsNum = this.props.show ? this.props.balance : '******';
        let PQCNum = this.props.show ? safeAmount : '******';
        return (
            <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                style={styles.container}
                source={require('../../image/assets/assets_bg.png')}
                resizeMode='cover'
            >
                <View style={styles.title}>
                    <Text style={styles.titleText}>{I18n.ASSETS_ALL_ASSETS}</Text>
                    <TouchableHighlight style={styles.eyeBtn} onPress={this.showStateChange} underlayColor='transparent' >
                        <Image style={{ height: 20, width: 20 }} source={imageSource} />
                    </TouchableHighlight>
                </View>
                <View style={styles.assets}>
                    <Text style={styles.assetsText}>{`${assetsNum}`} <Text style={styles.unitText} >CNY</Text></Text>
                </View>
                <View style={styles.PQCassets}>
                    <Text style={styles.PQCassetsText}>{`≈${PQCNum}`} <Text style={styles.unitText} >PQC</Text></Text>
                </View>
            </ImageBackground>
        );
    }

    showStateChange = () => {
        store.dispatch(assets_show_state_change());
    }
}

function mapState2Props(store) {
    return {
        balance: store.assets.balance,
        show: store.assets.show,
        legalWallet: store.assets.legalWallet
    }
}

export default connect(mapState2Props)(Banner);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 30,
        height: 0.5 * (Dimensions.get('window').width - 30),
    },
    title: {
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25

    },
    titleText: {
        marginLeft: 25,
        fontSize: 14,
        color: 'white',
        fontFamily: 'PingFang-SC-Medium'
    },
    eyeBtn: {
        height: 15,
        width: 15,
        marginLeft: 5
    },
    assets: {
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },
    assetsText: {
        marginLeft: 22,
        fontSize: 30,
        color: 'white',
        fontFamily: 'PingFang-SC-Medium',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    PQCassets: {
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15
    },
    PQCassetsText: {
        marginLeft: 22,
        fontSize: 15,
        color: 'white',
        fontFamily: 'PingFang-SC-Medium',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    unitText: {
        marginLeft: 8,
        fontSize: 15,
        color: 'white',
        fontFamily: 'PingFang-SC-Medium',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }
});