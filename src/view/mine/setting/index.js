import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import Header from '../../../component/header';
import Item from '../Item';
import Toast from '../../../component/toast';
import Btn from '../../../component/btn';
import Variables from '../../../global/Variables';
import store from '../../../store';
import { user_logout } from '../../../store/actions/userAction';
import I18n from '../../../global/doc/i18n';
import { INFO } from '../../../global/Config';

export default class Setting extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        let loaclVer = Platform.OS == 'ios' ? INFO.iosVer : INFO.androidVer;
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={I18n.SETTINGS}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9', flexDirection: 'column', alignItems: 'center' }}>
                    <Item
                        margin
                        title={I18n.UPDATE_CHECK}
                        stateText={`V ${loaclVer}`}
                        btnPress={this.check}
                    />
                    <Btn.Linear
                        title={I18n.LOGOUT}
                        style={styles.btn}
                        textStyle={styles.btnText}
                        btnPress={this.logout}
                    />

                </View>
            </SafeAreaView>
        );
    }

    check = () => {
        Toast.show(I18n.NOW_THE_LAST_VERSION);
    }

    logout = () => {
        AsyncStorage.setItem('App_token', '');
        Variables.account.token = '';
        store.dispatch(user_logout())
        this.props.navigation.navigate('Logout')
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
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    btnText: {
        color: 'white',
        fontSize: 15
    }
});