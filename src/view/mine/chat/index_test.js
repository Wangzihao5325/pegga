import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../../component/header';
import * as Config from '../../../global/Config';
import { connect } from 'react-redux'

class Chat extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        let { uuid = '123456' } = this.props.info;
        let uri = `${Config.SERVICE_URL.chat}?username=${uuid}&password=${uuid}`;
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='聊天'
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

const mapStateToProps = (state) => ({
    info: state.user.info
})

export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
});