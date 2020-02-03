import React, { Component } from 'react';
import { View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {
    ObjectName
} from "rongcloud-react-native-imlib";

class Item extends Component {
    render() {
        let extra = this.props.item.content.extra ? JSON.parse(this.props.item.content.extra) : {};
        if (extra.userId !== this.props.userId) {
            let name = extra.userName ? extra.userName : '游客';
            let subName = name.substr(0, 1);
            let containerStyle = this.props.item.content.objectName == ObjectName.Text ? styles.wordsContainer : styles.imageContainer;
            return (
                <View style={{ width: Dimensions.get('window').width, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <View style={[styles.container, { justifyContent: 'flex-start', }]}>
                        <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.avater}>
                            <Text style={{ color: 'white', fontSize: 24 }}>{`${subName}`}</Text>
                        </LinearGradient>
                        <View style={{ height: 40, width: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
                            {this.props.item.content.objectName == ObjectName.Text && <Image style={{ height: 12, width: 6 }} source={require('../../../../image/mine/triangle_white.png')} />}
                        </View>
                        <View style={[containerStyle, { backgroundColor: 'white' }]}>
                            {this.props.item.content.objectName == ObjectName.Text && <Text style={[styles.words, { color: 'rgb(40,46,60)' }]}>{`${this.props.item.content.content}`}</Text>}
                            {this.props.item.content.objectName == ObjectName.Image && <Image style={{ width: 120, height: 175, borderRadius: 5 }} source={{ uri: this.props.item.content.remote }} />}
                        </View>
                    </View>
                </View>
            );
        } else {
            let name = this.props.info.nickName ? this.props.info.nickName : '游客';
            let subName = name.substr(0, 1);
            let containerStyle = this.props.item.content.objectName == ObjectName.Text ? styles.wordsContainer : styles.imageContainer;
            return (
                <View style={{ width: Dimensions.get('window').width, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View style={[styles.container, { justifyContent: 'flex-end' }]}>
                        <View style={[containerStyle, { backgroundColor: 'rgb(97,130,236)' }]}>
                            {this.props.item.content.objectName == ObjectName.Text && < Text style={[styles.words, { color: 'white' }]}>{`${this.props.item.content.content}`}</Text>}
                            {this.props.item.content.objectName == ObjectName.Image && <Image style={{ width: 120, height: 175, borderRadius: 5 }} source={{ uri: this.props.item.content.remote }} />}
                        </View>
                        <View style={{ height: 40, width: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                            {this.props.item.content.objectName == ObjectName.Text && <Image style={{ height: 12, width: 6 }} source={require('../../../../image/mine/triangle_blue.png')} />}
                        </View>
                        <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.avater}>
                            <Text style={{ color: 'white', fontSize: 24 }}>{`${subName}`}</Text>
                        </LinearGradient>
                    </View >
                </View>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    info: state.user.info
})

export default connect(mapStateToProps)(Item);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 60,
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    avater: {
        borderRadius: 20,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        //marginHorizontal: 10,
        borderRadius: 5
    },
    wordsContainer: {
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 5,
        //marginHorizontal: 10
    },
    words: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
    }
});