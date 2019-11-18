import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../../../component/header';
import Item from '../Item';
import Toast from '../../../component/toast';

class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='个人中心'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <Item
                        margin
                        bottomLine
                        title='昵称'
                        stateText={this.props.nickName}
                        btnPress={() => this.props.navigation.navigate('NickName')}
                        titleTextStyle={styles.itemTitle}
                        StateTextStyle={styles.itemState}
                    />
                    <Item
                        title='联系方式'
                        btnPress={() => this.props.navigation.navigate('Contact')}
                        titleTextStyle={styles.itemTitle}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

function mapState2Props(store) {
    return {
        nickName: store.user.info.nickName,
    }
}

export default connect(mapState2Props)(Info);

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
    }
});