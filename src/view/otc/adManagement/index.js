import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet
} from 'react-native';
import Colors from '../../../global/Colors';
import Header from './Header';
import List from './List';

export default class OrderServiceCenter extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                    <Header goBackCallback={this.goBack} />
                    <List navi={this.props.navigation} />
                </View>
            </SafeAreaView>
        );
    }

    goBack = () => {
        this.props.navigation.pop();
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column',
        alignItems: 'center'
    }
});