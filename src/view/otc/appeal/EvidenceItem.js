import React, { PureComponent } from 'react';
import { View, Dimensions, Text, Image, StyleSheet } from 'react-native';

function ImageItem(props) {
    return (
        <View style={{ height: 85, width: 95, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: 85, width: 85, borderColor: '#EAEAEA', borderWidth: 1 }} source={{ uri: props.item }} defaultSource={require('../../../image/no_image/index_selected.png')} />
        </View>
    );
}

export default class EvidenceItem extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 45, width: Dimensions.get('window').width - 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>{`${this.props.role} ${this.props.name ? this.props.name : '游客'}`}</Text>
                    <Text style={styles.time}>{this.props.time}</Text>
                </View>
                <View style={styles.separate} />
                <View style={{ height: 50, width: Dimensions.get('window').width - 30 }}>
                    <Text style={styles.context}>{this.props.context}</Text>
                </View>
                <View style={{ height: 85, marginTop: 5, marginBottom: 15, width: Dimensions.get('window').width - 30, flexDirection: 'row', alignItems: 'center' }}>
                    {
                        this.props.images.map((item) => {
                            return (
                                <ImageItem key={item} item={item} />
                            );
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        marginTop: 10
    },
    title: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)',
        fontWeight: 'bold'
    },
    time: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12,
        color: 'rgb(133,133,133)'
    },
    separate: {
        height: 1,
        width: Dimensions.get('window').width - 30,
        backgroundColor: '#EAEAEA'
    },
    context: {
        fontSize: 13,
        color: 'rgb(40,46,60)',
        marginTop: 15,
        fontFamily: 'PingFang-SC-Medium'
    }
});