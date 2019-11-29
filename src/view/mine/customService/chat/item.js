import React, { Component } from 'react';
import { View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'

class Item extends Component {
    render() {
        if (this.props.item.fromAdmin) {
            let containerStyle = this.props.item.type == 0 ? styles.wordsContainer : styles.imageContainer;
            return (
                <View style={[styles.container, { justifyContent: 'flex-start' }]}>
                    <Image style={styles.avater} source={require('../../../../image/customService/assistant_head.png')} />
                    <View style={[containerStyle, { backgroundColor: 'white', borderWidth: 1, borderColor: 'rgb(179,179,179)' }]}>
                        {this.props.item.type == 0 && <Text style={[styles.words, { color: 'rgb(40,46,60)' }]}>{`${this.props.item.message}`}</Text>}
                        {this.props.item.type == 1 && <Image style={{ width: 120, height: 175, borderRadius: 5 }} source={{ uri: this.props.item.message }} />}
                    </View>
                </View>
            );
        } else {
            let name = this.props.info.nickName ? this.props.info.nickName : '游客';
            let subName = name.substr(0, 1);
            let containerStyle = this.props.item.type == 0 ? styles.wordsContainer : styles.imageContainer;
            return (
                <View style={[styles.container, { justifyContent: 'flex-end' }]}>
                    <View style={[containerStyle, { backgroundColor: 'rgb(97,130,236)' }]}>
                        {this.props.item.type == 0 && < Text style={[styles.words, { color: 'white' }]}>{`${this.props.item.message}`}</Text>}
                        {this.props.item.type == 1 && <Image style={{ width: 120, height: 175 }} source={{ uri: this.props.item.message }} />}
                    </View>
                    <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.avater}>
                        <Text style={{ color: 'white', fontSize: 24 }}>{`${subName}`}</Text>
                    </LinearGradient>
                </View >
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
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    avater: {
        borderRadius: 25,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginHorizontal: 10,
        borderRadius:5
    },
    wordsContainer: {
        paddingHorizontal: 13,
        paddingVertical: 15,
        borderRadius: 5,
        marginHorizontal: 10
    },
    words: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
    }
});