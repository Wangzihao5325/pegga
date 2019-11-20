import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    Image,
    Text,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native';
import Header from '../../../../component/header';
import Api from '../../../../socket';
import Item from './item';
import BottomInput from './bottomInput';

export default class Chat extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: []
    }

    componentDidMount() {
        Api.sysChatMsg((res) => {
            this.setState({
                data: res
            });
        }, (res, code, msg, res1) => {
            this.setState({
                data: res1
            });
        });

        // Api.sendMsgToSys({ message: '这是一条测试消息', type: 0 }, (res) => {
        //     console.log(res);
        // })
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='客服助手'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.data}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
                    <BottomInput />
                </KeyboardAvoidingView>
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
});