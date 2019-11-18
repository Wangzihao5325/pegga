import React, { Component } from 'react';
import { SafeAreaView, View, ImageBackground, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import Header from './Header';
import Banner from './Banner';
import CapitalOperation from './CapitalOperation';
import RecordList from './recordList';
import Toast from '../../../component/toast';

export default class AssetsDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        name: '',
        available: 0,
        frozen: 0,
        assessment: 0
    }

    naviWillFocus = () => {
        StatusBar.setBarStyle('light-content');
        if (Platform.OS == 'android') {
            StatusBar.setBackgroundColor('#4063D5');
        }
    }

    componentDidMount() {
        const cName = this.props.navigation.getParam('cName', '');
        const cDetailStr = this.props.navigation.getParam('cDetailStr', '{}');
        let cDetail = JSON.parse(cDetailStr);
        this.setState({
            name: cName,
            available: cDetail.allAmount - cDetail.frozen,
            frozen: cDetail.frozen,
            assessment: cDetail.allAmount
        });
    }

    naviWillBlur = () => {
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS == 'android') {
            StatusBar.setBackgroundColor('white');
        }
    }

    render() {
        return (
            <ImageBackground style={styles.imageBg} imageStyle={styles.image} source={require('../../../image/assets/assets_detail_bg.png')}>
                <SafeAreaView style={styles.safeContainer} >
                    <NavigationEvents
                        onWillFocus={this.naviWillFocus}
                        onWillBlur={this.naviWillBlur}
                    />
                    <Header
                        title={this.state.name}
                        goBack={() => this.props.navigation.goBack()}
                        goMoneyFlow={() => this.props.navigation.navigate('MoneyFlow')}
                    />
                    <Banner assets={this.state.assessment} frozen={this.state.frozen} />
                    <CapitalOperation
                        recharge={this.developing}
                        cashOut={this.developing}
                        transfer={this.developing}
                    />
                    <RecordList />
                </SafeAreaView>
                <View style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 1, height: 34, backgroundColor: 'white' }} />
            </ImageBackground>
        );
    }

    developing = () => {
        Toast.show('暂未开放');
    }
}

const styles = StyleSheet.create({
    imageBg: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F1F3F8'
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 375 * 153
    },
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10
    }
});