import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../../component/header';
import Variables from '../../../global/Variables';
import * as Config from '../../../global/Config';

export default class InviteList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        let uri = `${Config.SERVICE_URL.invite}list?t=${Variables.account.token}`
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='下级列表'
                    goback={() => this.props.navigation.goBack()}
                />
                <WebView
                    source={{ uri }}
                    style={{ width: Dimensions.get('window').width }}
                />
            </SafeAreaView>
        );
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