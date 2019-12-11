import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    SectionList,
    FlatList,
    Text,
    TouchableHighlight,
    Dimensions,
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
import store from '../../../../store';
import { boundry_change } from '../../../../store/actions/countryCodeAction';
import TotalData from '../../../../global/doc/city-picker.data';
import Enum from '../../../../global/Enum';

import Header from '../../../../component/header';
import Toast from '../../../../component/toast';
import I18n from '../../../../global/doc/i18n';

function SectionHeader(props) {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>{props.title}</Text>
        </View>
    );
}

function Item(props) {
    return (
        <TouchableHighlight onPress={props.itemPress} underlayColor='transparent'>
            <View style={styles.itemContainer} >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.itemText}>{props.item[1]}</Text>
                    <Text style={styles.itemText2}>{props.item[0]}</Text>
                </View>
                <View style={styles.borderView} />
            </View>
        </TouchableHighlight>
    );
}

class CitySelect extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        end: '',
        type: '',
        data: [],
        title: '',
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', 'province');
        const end = this.props.navigation.getParam('end', 'province');
        if (type == 'province') {
            let originData = TotalData[`${Enum.COUNTRY_NUM.CHINA}`];
            let data = [];
            for (let key in originData) {
                let reg = { title: key, data: originData[key] };
                data.push(reg);
            }
            this.setState({
                end,
                type,
                data,
                title: I18n.SELECT_PROVINEC
            });
        } else if (type == 'city') {
            let dataKey = this.props.bCode[1];
            let data = TotalData[dataKey];
            this.setState({
                end,
                type,
                data,
                title: I18n.SELECT_CITY
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={this.state.title}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1 }}>
                    {this.state.type == 'province' &&
                        <SectionList
                            style={{ flex: 1 }}
                            renderSectionHeader={({ section: { title } }) => (
                                <SectionHeader title={title} />
                            )}
                            renderItem={({ item, index, section }) => <Item key={item[0]} item={item} itemPress={() => this.itemPress(item)} />}
                            sections={this.state.data}
                        />
                    }
                    {this.state.type == 'city' &&
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.state.data}
                            renderItem={({ item, index }) => <Item key={item[0]} item={item} itemPress={() => this.itemPress(item)} />}
                        />
                    }
                </View>
            </SafeAreaView>
        );
    }

    itemPress = (item) => {
        if (this.state.end == 'province') {
            let bName = `${I18n.CHINA}-${item[1]}`;
            let bCode = [Enum.COUNTRY_NUM.CHINA, item[0]];
            store.dispatch(boundry_change(bName, bCode));
            this.props.navigation.goBack();
        } else if (this.state.end == 'city') {
            if (this.state.type == 'province') {
                let bName = `${I18n.CHINA}-${item[1]}`;
                let bCode = [Enum.COUNTRY_NUM.CHINA, item[0]];
                store.dispatch(boundry_change(bName, bCode));
                this.props.navigation.push('CitySelect', { type: 'city', end: 'city' })
            } else if (this.state.type == 'city') {
                let bName = `${this.props.bName}-${item[1]}`;
                let bCodeCopy = this.props.bCode.concat();
                bCodeCopy.push(item[0]);
                store.dispatch(boundry_change(bName, bCodeCopy));
                this.props.navigation.pop(2);
            }
        }
    }
}

function mapState2Props(store) {
    return {
        bName: store.country.boundryName,
        bCode: store.country.boundryCode,
    }
}

export default connect(mapState2Props)(CitySelect);

const styles = StyleSheet.create({
    sectionContainer: {
        height: 34,
        width: '100%',
        backgroundColor: '#FAFBFC',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionText: {
        fontWeight: "bold",
        marginLeft: 30,
        fontSize: 18,
        color: 'rgb(64,99,213)'
    },
    itemContainer: {
        height: 60,
        width: '100%'
    },
    itemText: {
        marginLeft: 33,
        color: 'rgb(34,34,34)',
        fontSize: 14
    },
    itemText2: {
        marginRight: 34,
        color: 'rgb(64,99,231)',
        fontSize: 14
    },
    borderView: {
        height: 1,
        width: Dimensions.get('window').width - 27 - 27,
        marginLeft: 27,
        backgroundColor: '#EBEBEB'
    },
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
    },
    itemTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(133,133,133)'
    },
    itemState: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(40,46,60)'
    }
});