import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../../component/header';
import Variables from '../../../global/Variables';

export default class Invite extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        let uri = `http://192.168.3.127:8080/#/?t=${Variables.account.token}`
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='邀请'
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