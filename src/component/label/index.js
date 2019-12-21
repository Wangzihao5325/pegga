import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const BusinessType = (props) => {
    let bgColor = null;
    let fontColor = null;
    let marginLeft = props.marginLeft ? props.marginLeft : 0;
    switch (props.type) {
        case 'green':
            bgColor = 'rgb(213,247,240)';
            fontColor = 'rgb(43,223,177)';
            break;
        case 'blue':
            bgColor = 'rgb(223,230,250)';
            fontColor = 'rgb(95,129,231)';
            break;
        case 'white':
            bgColor = 'white';
            fontColor = 'white';
            break;
        default:
            bgColor = 'white';
            fontColor = 'rgb(43,223,177)';
            break;
    }
    return (
        <View style={[styles.container, { backgroundColor: bgColor, marginLeft: marginLeft }]}>
            <Text style={{ color: fontColor, fontSize: 12, fontFamily: 'PingFang-SC-Medium' }}>{`${props.title}`}</Text>
        </View>
    )
}

export default BusinessType;

const styles = StyleSheet.create({
    container: {
        height: 18,
        width: 30,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});