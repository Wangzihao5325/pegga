import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet,
    WebView,
} from 'react-native';

import Header from '../../../component/header';

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
                {/* {this.state.uri &&
                    <WebView
                        source={{ uri: 'https://infinite.red' }}
                        style={{ marginTop: 20 }}
                    />
                } */}
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