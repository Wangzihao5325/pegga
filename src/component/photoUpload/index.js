import React, { PureComponent } from 'react';
import { View, FlatList, TouchableHighlight, Image, Dimensions, Platform, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from '../../component/toast';
import Api from '../../socket/index';

//{sixe:0} size ==0 加号  size>0 本地图片 size==-1网络图片

class ImageItem extends PureComponent {
    selectBtnOnPress = () => {
        if (this.props.selectTap) {
            this.props.selectTap();
        }
    }
    delePic = () => {
        if (this.props.dele) {
            this.props.dele(this.props.item.path);
        }
    }
    render() {
        if (this.props.item.size == 0) {
            return (
                <View style={{ height: 110, width: 110, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableHighlight
                        style={styles.addBtn}
                        underlayColor='transparent'
                        onPress={this.selectBtnOnPress}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.addImage} source={require('../../image/usual/add_pic.png')} />
                        </View>
                    </TouchableHighlight>
                </View>
            );
        } else {
            let uri = this.props.item.path;
            if (Platform.OS === 'ios') {
                uri = this.props.item.sourceURL;
            }
            return (
                    <View style={styles.thumbnail}>
                        <Image resizeMode='stretch' style={{ height: 100, width: 100,borderRadius:5 }} source={{ uri: uri }} />
                        <TouchableHighlight onPress={this.delePic} style={{ height: 20, width: 20, position: 'absolute', top: 10, right: 10, display: 'flex', backgroundColor: '#CCCBCC', borderRadius: 10 }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../image/usual/delete_pic.png')} />
                        </TouchableHighlight>
                    </View>
            );
        }
    }
}

export default class PhotoUpload extends PureComponent {
    static defaultProps = {
        maxPic: 3
    }

    state = {
        imageSelectData: [{ size: 0 }],
        isInit: true
    }

    static getDerivedStateFromProps(props, state) {
        if (state.isInit && props.initValue && props.initValue[0] && props.initValue[0].path && props.initValue[0].sourceURL) {
            return {
                imageSelectData: props.initValue,
                isInit: false
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
                <FlatList
                    style={{ height: 110, width: Dimensions.get('window').width - 30 }}
                    horizontal={true}
                    data={this.state.imageSelectData}
                    renderItem={({ item }) => <ImageItem dele={this.delePic} selectTap={this._selectPic} item={item} />}
                />
            </View>
        );
    }

    _selectPic = () => {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: this.props.maxPic,
            includeBase64: true
        }).then(images => {
            let nowData = this.state.imageSelectData;
            if (nowData[nowData.length - 1].size === 0) {
                nowData.pop();
            }
            let newData = nowData.concat(images);
            if (newData.length < this.props.maxPic) {
                newData.push({ size: 0 });
            }
            if (newData.length > this.props.maxPic) {
                newData.length = this.props.maxPic;
            }
            this.setState({
                imageSelectData: newData
            });
        }).catch(e => {
            if (Platform.OS == 'android') {
                Toast.show('选择图片失败');
            }
        });
    }

    delePic = (path) => {
        let { imageSelectData } = this.state;
        let deleIndex = -1;
        imageSelectData.every((item, index) => {
            if (item.path === path) {
                deleIndex = index;
                return false;
            } else {
                return true;
            }
        })
        if (deleIndex >= 0) {
            imageSelectData.splice(deleIndex, 1);
            let newData = imageSelectData.concat();
            if (newData.length == 0 || newData[newData.length - 1].size !== 0) {
                newData.push({ size: 0 });
            }
            this.setState({
                imageSelectData: newData
            });
        }
    }

    // upload = async () => {
    //     if (this.state.imageSelectData[0].size) {
    //         // Api.imageUpload(newData[0], (res) => {
    //         //     if (typeof this.props.callback == 'function') {
    //         //         this.props.callback(res);
    //         //     }
    //         // });
    //         let res = await Api.imageUploadPromise(this.state.imageSelectData[0]);
    //         if (typeof this.props.callback == 'function') {
    //             this.props.callback(res);
    //         }
    //     } else {
    //         Toast.show('请选择图片');
    //     }
    // }
}

const styles = StyleSheet.create({
    addBtn: {
        height: 100,
        width: 100,
        borderStyle: 'dotted',
        borderColor: 'rgb(188,192,203)',
        borderWidth: 1,
        borderRadius:5
    },
    addImage: {
        height: 25,
        width: 25
    },
    container: {
        height: 120,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15
    },
    thumbnail: {
        height: 110,
        width: 110,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});