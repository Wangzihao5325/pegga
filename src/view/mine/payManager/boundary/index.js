import React, { PureComponent } from 'react';
import { View, TouchableHighlight, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../../../global/doc/i18n';

class Boundary extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`${I18n.RECEIVING_RANGE}`}<Text style={styles.tips}>{`${I18n.MORE_DANGER}`}</Text></Text>
                <View style={styles.btnContainer}>
                    <TouchableHighlight underlayColor='transparent' onPress={this.props.citySelect} style={this.props.value == 'city' ? styles.highlightBtn : styles.btn}><Text style={this.props.value == 'city' ? styles.highlightBtnTitle : styles.btnTitle}>{`${I18n.CITY_SCOPE}`}</Text></TouchableHighlight>
                    <View style={{ height: 33, width: 1, backgroundColor: 'rgb(64,99,213)' }} />
                    <TouchableHighlight underlayColor='transparent' onPress={this.props.provinceSelect} style={this.props.value == 'province' ? styles.highlightBtn : styles.btn}><Text style={this.props.value == 'province' ? styles.highlightBtnTitle : styles.btnTitle}>{`${I18n.PROVINCE_SCOPE}`}</Text></TouchableHighlight>
                    <View style={{ height: 33, width: 1, backgroundColor: 'rgb(64,99,213)' }} />
                    <TouchableHighlight underlayColor='transparent' onPress={this.props.countrySelect} style={this.props.value == 'country' ? styles.highlightBtn : styles.btn}><Text style={this.props.value == 'country' ? styles.highlightBtnTitle : styles.btnTitle}>{`${I18n.UNLIMITED_SCOPE}`}</Text></TouchableHighlight>
                </View>
                <View style={styles.address}>
                    <Text>{this.props.bName}</Text>
                </View>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        bName: store.country.boundryName,
        bCode: store.country.boundryCode,
    }
}

export default connect(mapState2Props)(Boundary);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 170,
        backgroundColor: 'white',
        marginTop: 10
    },
    title: {
        marginTop: 20,
        marginBottom: 18,
        marginLeft: 15,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)'
    },
    tips: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'rgb(222,44,48)'
    },
    btnContainer: {
        height: 33,
        width: Dimensions.get('window').width - 30,
        flexDirection: 'row',
        alignSelf: 'center',
        borderColor: 'rgb(64,99,213)',
        borderWidth: 1,
        borderRadius: 5
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTitle: {
        fontSize: 13,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(64,99,213)'
    },
    highlightBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(64,99,213)'
    },
    highlightBtnTitle: {
        fontSize: 13,
        fontFamily: 'PingFang-SC-Medium',
        color: 'white'
    },
    address: {
        height: 40,
        width: Dimensions.get('window').width - 30,
        alignSelf: 'center',
        borderRadius: 5,
        borderColor: '#E1E2E7',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 10
    }
});