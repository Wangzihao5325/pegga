import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    FlatList,
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';
import Header from '../../../../component/header';
import Api from '../../../../socket/index';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

const Item = (props) => {
    let name = props.item.nickName ? props.item.nickName : '游客';
    return (
        <TouchableHighlight onPress={props.callback} underlayColor='transparent' style={{ height: 65, width: Dimensions.get('window').width, paddingHorizontal: 15 }}>
            <View style={{ height: 65, width: Dimensions.get('window').width - 30, flexDirection: 'row', alignItems: 'center' }}>
                <LinearGradient
                    style={styles.avaterIconTextContainer}
                    colors={['#39DFB1', '#6284E4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Text style={styles.avaterIconText}>{name.substr(0, 1)}</Text>
                </LinearGradient>
                <Text style={{ marginLeft: 15, fontSize: 16, color: 'rgb(40,46,60)', fontFamily: 'PingFang-SC-Medium' }}>{`${name}`}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default class AtList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        uuid: '',
        targetId: '',
        data: []
    }

    componentDidMount() {
        const targetId = this.props.navigation.getParam('targetId', null);
        const uuid = this.props.navigation.getParam('uuid', null);
        if (targetId && uuid) {
            Api.groupList(targetId, (res) => {
                let atListArr = res.records.filter((item) => {
                    if (item.uuid == uuid) {
                        return false;
                    } else {
                        return true;
                    }
                })
                this.setState({
                    uuid,
                    targetId,
                    data: atListArr
                });
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='选择提醒的人'
                    goback={() => this.props.navigation.goBack()}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => <Item item={item} callback={() => this.atPersonSelect(item)} />}
                />
            </SafeAreaView>
        );
    }

    atPersonSelect = (item) => {
        this.props.navigation.state.params.callback(item);
        this.props.navigation.goBack();
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
    avaterIconTextContainer: {
        height: 35,
        width: 35,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avaterIconText: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});