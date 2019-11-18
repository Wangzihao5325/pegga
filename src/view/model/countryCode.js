import React, { PureComponent } from 'react';
import { SafeAreaView, SectionList, View, Text, TextInput, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import CH_sections from '../../global/doc/Country_code_CN';
import Colors from '../../global/Colors';
import store from '../../store';
import { country_change } from '../../store/actions/countryCodeAction';

class SectionHeader extends PureComponent {
    render() {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>{this.props.title}</Text>
            </View>
        );
    }
}
class Item extends PureComponent {
    itemOnPress = () => {
        let textArr = this.props.item.split(' ');
        let countryCode = textArr[1];
        let countryName = textArr[0];
        store.dispatch(country_change(countryName, countryCode));
        this.props.itemPress();
    }
    render() {
        let textArr = this.props.item.split(' ');
        return (
            <TouchableHighlight onPress={this.itemOnPress} underlayColor='transparent'>
                <View style={styles.itemContainer} >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.itemText}>{textArr[0]}</Text>
                        <Text style={styles.itemText2}>{textArr[1]}</Text>
                    </View>
                    <View style={styles.borderView} />
                </View>
            </TouchableHighlight>
        );
    }
}
class SearchHeader extends PureComponent {
    render() {
        return (
            <View style={styles.searchHeaderContainer}>
                <View style={styles.searchContent}>
                    {/*<IconBtn height={18} width={18} source={require('../../../image/mine/search.png')} />*/}
                    <TextInput style={{ flex: 1, marginLeft: 8, color: 'rgb(64,99,213)', fontSize: 15 }} onChangeText={this.props.search} placeholderTextColor='rgb(64,99,213)' placeholder='搜索' />
                </View>
            </View>
        );
    }
}
export default class CountryCode extends PureComponent {
    state = {
        listData: CH_sections
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    search = (text) => {
        let listData = [];
        CH_sections.forEach((itemObj) => {
            let searchData = itemObj.data.filter((country) => {
                let index = country.indexOf(text);
                if (index >= 0) {
                    return true;
                } else {
                    return false
                }
            });
            if (searchData.length > 0) {
                let itemObjCopy = JSON.parse(JSON.stringify(itemObj));
                itemObjCopy.data = searchData;
                listData.push(itemObjCopy);
            }
        });
        this.setState({
            listData: listData
        });
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_BG_COLOR }}>

                <SearchHeader search={this.search} />
                <SectionList
                    style={{ height: Dimensions.get('window').height - 182, width: '100%' }}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader title={title} />
                    )}
                    renderItem={({ item, index, section }) => <Item key={index} item={item} itemPress={this.goBack} />}
                    sections={this.state.listData}
                />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 60,
        width: '100%'
    },
    borderView: {
        height: 1,
        width: Dimensions.get('window').width - 27 - 27,
        marginLeft: 27,
        backgroundColor: '#EBEBEB'
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
    searchHeaderContainer: {
        height: 44,
        width: '100%',
        marginTop: 20,
        marginBottom: 20
    },
    searchContent: {
        marginHorizontal: 15,
        flex: 1,
        borderRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 17,
        borderColor: '#D1D5DA',
        borderWidth: 1
    }
});