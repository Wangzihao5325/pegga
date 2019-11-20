import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image, Dimensions, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from '../../../../component/toast';
import Api from '../../../../socket';

const Item = (props) => {
    return (
        <TouchableHighlight style={{ width: 40, height: 60 }} onPress={props.callback} >
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                <Image style={{ height: 25, width: 25 }} source={props.source} />
                <Text>{`${props.title}`}</Text>
            </View>
        </TouchableHighlight>
    );
}

const FuncTabs = (props) => {
    return (
        <View style={{ backgroundColor: 'white', height: 80, width: Dimensions.get('window').width, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25 }}>
            <Item title='图片' source={require('../../../../image/customService/picture_icon.png')} callback={props.imageUpload} />
        </View>
    );
}

//     

export default class BottomInput extends PureComponent {
    state = {
        isShow: false,
        value: ''
    }
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <TextInput style={styles.input} value={this.state.value} onChangeText={this.textChange} returnKeyType='done' onSubmitEditing={this.submit} />
                    <TouchableHighlight style={styles.btn} onPress={this.tabsShow} underlayColor='transparent'>
                        <Image style={{ height: 33, width: 33 }} source={require('../../../../image/customService/function.png')} />
                    </TouchableHighlight>
                </View>
                {this.state.isShow &&
                    <FuncTabs imageUpload={this.imageUpload} />
                }
            </View>
        );
    }

    submit = () => {
        if (!this.state.value) {
            Toast.show('请输入内容');
        }
        Api.sendMsgToSys({ message: this.state.value, type: 0 }, (res) => {
            this.setState({
                value: ''
            });
            this.props.callback();
        })
    }

    textChange = (value) => {
        this.setState({
            value
        });
    }

    tabsShow = () => {
        this.setState({
            isShow: true
        });
    }

    imageUpload = () => {
        this.setState({
            isShow: false
        });
        ImagePicker.openPicker({
            multiple: false,
            includeBase64: true
        }).then(images => {
            Api.imageUpload(images, (res) => {
                let imageUrl = res.data;
                Api.sendMsgToSys({ message: imageUrl, type: 1 }, (res) => {
                    this.props.callback();
                })
            });
        }).catch(e => {
            if (Platform.OS == 'android') {
                Toast.show('选择图片失败');
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    input: {
        height: 33,
        width: Dimensions.get('window').width - 45 - 33,
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 5,
        backgroundColor: '#F3F5F9'
    },
    btn: {
        height: 33,
        width: 33,
        marginTop: 10,
        marginLeft: 15
    }
});