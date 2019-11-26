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

    _dataUpdate = () => {
        Api.sysChatMsg((res) => {
            let result = res.concat().reverse();
            this.setState({
                data: result
            }, () => {
                this.list.scrollToEnd();
            });
        }, (res, code, msg, res1) => {
            let result = res1.concat().reverse();
            this.setState({
                data: result
            });
        });
    }

    componentDidMount() {
        this._dataUpdate();
    }

    render() {
        console.log(this.state.data);
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='客服助手'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <FlatList
                        ref={list => this.list = list}
                        style={{ flex: 1 }}
                        data={this.state.data}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
                    <BottomInput callback={this.dataRefresh} />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    dataRefresh = () => {
        this._dataUpdate();
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