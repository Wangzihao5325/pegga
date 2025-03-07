import React, { Component } from 'react';
import {
    SafeAreaView,
    StatusBar,
    Platform,
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { assets_info_update } from '../../store/actions/assetsAction';
import Toast from '../../component/toast';
import Colors from '../../global/Colors';
import Header from '../../component/header';
import Banner from './Banner';
import FunTabs from './FunTabs';
import Separator from './Separator';
import List from './List';
import I18n from '../../global/doc/i18n';

export default class Assets extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    naviDidFocus = () => {
        if (Platform.OS == 'android') {
            StatusBar.setHidden(false);
        }
        assets_info_update();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
                <Header.Normal title={I18n.ASSETS_ASSETS} showBackBtn={false} />
                <Banner
                    trans={this.devloping}
                    receive={this.devloping}
                />
                <FunTabs
                    trans={this.devloping}
                    receive={this.devloping}
                />
                <Separator />
                <List navi={this.props.navigation} />
            </SafeAreaView>
        );
    }

    devloping = () => {
        Toast.show(I18n.IN_DEVELOPING);
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 20
    }
});