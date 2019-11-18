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
import Btn from '../../../component/btn';

export default class Setting extends Component {
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
                    title='设置'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9', flexDirection: 'column', alignItems: 'center' }}>
                    <Item
                        margin
                        title='检查更新'
                        stateText='v1.1'
                        btnPress={this.check}
                    />
                    <Btn.Linear
                        title='退出'
                        style={styles.btn}
                        textStyle={styles.btnText}
                        btnPress={this.check}
                    />

                </View>
            </SafeAreaView>
        );
    }

    check = () => {
        Toast.show('当前已经是最新版本！');
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