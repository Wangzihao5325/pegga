import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../../../component/header';
import Variables from '../../../../global/Variables';
import * as Config from '../../../../global/Config';

export default class Invite extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        id: null
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('id', null);
        this.setState({
            id
        });
    }

    render() {
        let uri = `${Config.SERVICE_URL.invite}message?t=${Variables.account.token}&id=${this.state.id}`
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='消息详情'
                    goback={() => this.props.navigation.goBack()}
                />
                {Boolean(this.state.id) &&
                    <WebView
                        ref={webView => this.webView = webView}
                        source={{ uri }}
                        style={{ width: Dimensions.get('window').width }}
                    />
                }
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