import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../../component/header';
import Variables from '../../../global/Variables';
import * as Config from '../../../global/Config';

export default class Invite extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        let uri = `${Config.SERVICE_URL.payment}?t=${Variables.account.token}`
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='邀请'
                    goback={() => this.props.navigation.goBack()}
                    rightBtnTitle='我的邀请'
                    rightBtnPress={this.toDetail}
                />
                <WebView
                    source={{ uri }}
                    style={{ width: Dimensions.get('window').width }}
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