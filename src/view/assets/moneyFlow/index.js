import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Api from '../../../socket/index';
import Colors from '../../../global/Colors';
import Header from '../../../component/header';
import Select from './Select';
import Toast from '../../../component/toast';

class MoneyFlow extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    componentDidMount() {
        // to do 账单接口还木有
        // Api.moneyFlowList((result) => {
        //     console.log(result);
        // });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <StatusBar barStyle='dark-content' />
                <Header.Normal title='账单信息' goback={() => this.props.navigation.goBack()} />
                <Select
                    type={this.props.billType}
                    timeType={this.props.billTime}
                    typePress={() => this.goToSelectModel('BILL_TYPE')}
                    timeTypePress={() => this.goToSelectModel('BILL_TIME_TYPE')}
                />
            </SafeAreaView>
        );
    }

    goToSelectModel = (typeKey) => {
        this.props.navigation.navigate('Assets_BillTypeSelect', { type: typeKey });
    }
}

function mapState2Props(store) {
    return {
        billType: store.assets.billType,
        billTime: store.assets.billTime,
    }
}

export default connect(mapState2Props)(MoneyFlow)

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column',
        alignItems: 'center'
    }
});