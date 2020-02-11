import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    FlatList,
    StyleSheet
} from 'react-native';
import Header from '../../../component/header';
import Api from '../../../socket/index';
import Item from './item';
import _ from 'lodash';

export default class News extends Component {
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
        Api.noticeList((result) => {
            this.setState({
                data: result
            });
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='系统消息'
                    goback={() => this.props.navigation.goBack()}
                />
                <FlatList
                    style={{ flex: 1, backgroundColor: '#F3F5F9' }}
                    data={this.state.data}
                    renderItem={({ item }) => <Item item={item} callback={this.toDetail} />}
                />
            </SafeAreaView>
        );
    }

    toDetail = (item) => {
        this.props.navigation.navigate('NewsDetail', { id: item.uuid })
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
});