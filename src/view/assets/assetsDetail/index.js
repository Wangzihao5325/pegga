import React, { Component } from 'react';
import { SafeAreaView, View, ImageBackground, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import Header from './Header';
import Banner from './Banner';
import CapitalOperation from './CapitalOperation';
import RecordList from './recordList';
import Toast from '../../../component/toast';
import I18n from '../../../global/doc/i18n';

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
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setBarStyle('light-content');
        }
        StatusBar.setBarStyle('light-content');
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
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(false);
            StatusBar.setBackgroundColor('white');
        }
        StatusBar.setBarStyle('dark-content');
    }

    render() {
        return (
            <ImageBackground style={styles.imageBg} imageStyle={styles.image} source={require('../../../image/assets/assets_detail_bg.png')}>
                <View style={styles.safeContainer} >
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
                </View>
            </ImageBackground>
        );
    }

    developing = () => {
        Toast.show(I18n.IN_DEVELOPING);
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