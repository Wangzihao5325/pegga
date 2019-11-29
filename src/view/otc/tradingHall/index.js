import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    FlatList,
    ScrollView,
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { assets_info_update } from '../../../store/actions/assetsAction';
import Colors from '../../../global/Colors';
import Header from './Header';
import Container from './Container';
import AdList from './AdList';
import AdBtn from './AdBtn';

export default class TradingHall extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    naviDidFocus = () => {
        assets_info_update();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
                <StatusBar backgroundColor='white' barStyle='dark-content' hidden={false} />
                <Header goBackCallback={this.goBack} navi={this.props.navigation} />
                <View style={{ flex: 1, backgroundColor: '#F2F2F2', flexDirection: 'column', alignItems: 'center' }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    >
                        <Container navi={this.props.navigation} />
                        <AdList navi={this.props.navigation} />
                    </ScrollView>
                    <AdBtn btnPress={() => this.props.navigation.navigate('NewAd')} />
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
        flexDirection: 'column'
    }
});