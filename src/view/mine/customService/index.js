import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

import Header from '../../../component/header';

export default class CustomService extends Component {
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
                    title='详细信息'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>

                </View>
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
    }
});