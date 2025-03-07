import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

import Header from '../../../component/header';
import Item from '../Item';
import Toast from '../../../component/toast';
import I18n from '../../../global/doc/i18n';

export default class HelpCenter extends Component {
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
                    title={I18n.HELP_CENTER}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <Item
                        margin
                        bottomLine
                        title={I18n.NEW_TUTORIAL}
                        btnPress={this.check}
                    />
                    <Item
                        bottomLine
                        title={I18n.GOOGLE_PWD}
                        btnPress={this.check}
                    />
                    <Item
                        title={I18n.FAQ}
                        btnPress={this.check}
                    />
                </View>
            </SafeAreaView>
        );
    }

    check = () => {
        // Toast.show('btnPress');
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