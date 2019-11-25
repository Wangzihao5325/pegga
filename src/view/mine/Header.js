import React, { PureComponent } from 'react';
import {
    ImageBackground,
    View,
    TouchableHighlight,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

class Header extends PureComponent {
    render() {
        return (
            <ImageBackground style={styles.container} source={require('../../image/mine/header_bg.png')}>

                <View style={styles.top}>
                    <TouchableHighlight
                        style={[styles.topIconBtn, { marginLeft: 15 }]}
                        onPress={this.props.toNews}
                        underlayColor='transparent'
                    >
                        <Image style={styles.topIconBtn} source={require('../../image/mine/news.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.topIconBtn, { marginRight: 15 }]}
                        onPress={this.props.toService}
                        underlayColor='transparent'
                    >
                        <Image style={styles.topIconBtn} source={require('../../image/mine/service.png')} />
                    </TouchableHighlight>
                </View>

                <TouchableHighlight style={styles.avater} onPress={this.props.toInfo} underlayColor='transparent'>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <LinearGradient
                            style={styles.avaterIconTextContainer}
                            colors={['#39DFB1', '#6284E4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <Text style={styles.avaterIconText}>{this.props.userName.substr(0, 1)}</Text>
                        </LinearGradient>
                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.userAlias}>{this.props.userName}</Text>
                                <Image style={styles.lvImage} source={require('../../image/mine/userLevel/lv1.png')} />
                            </View>
                            <Text style={styles.account}>{`uuid: ${this.props.uuid}`}</Text>
                        </View>
                        <Image style={styles.arrow} source={require('../../image/arrow/arrow_mine_header.png')} />
                    </View>
                </TouchableHighlight>
            </ImageBackground>
        );
    }
}

function mapState2Props(store) {
    return {
        userName: store.user.info.nickName,
        uuid: store.user.info.uuid,
    }
}

export default connect(mapState2Props)(Header);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 375 * 195
    },
    top: {
        height: 44,
        width: Dimensions.get('window').width,
        marginTop: 34,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topIconBtn: {
        height: 20,
        width: 20
    },
    avater: {
        height: 60,
        width: Dimensions.get('window').width - 30,
        alignSelf: 'center',
        marginTop: 25
    },
    avaterIconTextContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avaterIconText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    arrow: {
        height: 20,
        width: 20,
    },
    account: {
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(73,73,73)',
        fontSize: 14,
        marginTop: 10
    },
    userAlias: {
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)',
        fontSize: 17,
    },
    lvImage: {
        height: 20,
        width: 20,
        marginLeft: 5
    }
});