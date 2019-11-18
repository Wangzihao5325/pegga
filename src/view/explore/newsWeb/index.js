import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native';

import Header from '../../../component/header';
import { WebView } from 'react-native-webview';

export default class NewsWeb extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        uri: null
    }

    componentDidMount() {
        const uri = this.props.navigation.getParam('uri', null);
        if (uri) {
            this.setState({
                uri
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='资讯'
                    goback={() => this.props.navigation.goBack()}
                />
                {typeof this.state.uri == 'string' &&
                    <WebView
                        source={{ uri: this.state.uri }}
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