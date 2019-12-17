import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../../component/header';
import * as Config from '../../../global/Config';

export default class Invite extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        let uri = Config.SERVICE_URL.agreement;
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='用户协议'
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