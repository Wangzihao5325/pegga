import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, TouchableHighlight, View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';

function Item(props) {//index  data:[select,title,key]
    const unselectPath = require('../../image/otc/unSelect.png');
    const selectPath = require('../../image/otc/select.png');
    const btnPress = () => {
        props.itemPress(props.item, props.index);
    }
    let isSelect = props.selectIndexArr.indexOf(props.index) >= 0 ? true : false;
    return (
        <TouchableHighlight style={styles.itemContainer} onPress={btnPress} underlayColor='#EEE'>
            <View style={[{ flex: 1, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }, props.isLast ? null : { borderBottomColor: '#DAD9DA', borderBottomWidth: 1 }]}>
                <Image style={{ height: 15, width: 15 }} source={isSelect ? selectPath : unselectPath} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{`${props.item.title}`}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

export default class SelectModel extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: '',
        data: [],
        selectIndexArr: []
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', 'single');//single multiple
        const dataStr = this.props.navigation.getParam('data', '[]');
        let data = JSON.parse(dataStr);
        const selectIndexArr = [];
        data.every((item, index) => {
            if (item.select) {
                selectIndexArr.push(index);
                if (type == 'single') {
                    return false;
                }
            }
            return true;
        });
        this.setState({
            type,
            data,
            selectIndexArr
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.goBackWithCallback(0)}>
                <SafeAreaView style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 1, borderColor: '#DAD9DA', borderWidth: 1 }}>
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <Item
                                        key={item.key}
                                        item={item}
                                        index={index}
                                        selectIndexArr={this.state.selectIndexArr}
                                        itemPress={this.itemPress}
                                        isLast={index == this.state.data.length - 1}
                                    />
                                );
                            })
                        }
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }

    goBackWithCallback = (delay) => { //[{},{},{},{}] [1,3]
        let selectData = [];
        let oldData = this.state.data.concat();
        let nowState = oldData.map((item, index) => {
            let itemCopy = _.assign({}, item);
            if (this.state.selectIndexArr.indexOf(index) >= 0) {
                itemCopy.select = true;
                selectData.push(itemCopy);
            } else {
                itemCopy.select = false;
            }
            return itemCopy;
        });
        this.props.navigation.state.params.callback(selectData, nowState);
        setTimeout(() => {
            this.props.navigation.goBack();
        }, delay);
    }

    itemPress = (item, index) => {
        if (this.state.type == 'single') {
            this.setState({
                selectIndexArr: [index]
            }, () => {
                this.goBackWithCallback(500);
            });
        } else if (this.state.type == 'multiple') {
            let multIndex = this.state.selectIndexArr.indexOf(index);
            let reg = this.state.selectIndexArr.concat();
            if (multIndex >= 0) {
                reg.splice(multIndex, 1);
            } else {
                reg.push(index);
            }
            this.setState({
                selectIndexArr: reg
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        height: 55,
        width: Dimensions.get('window').width - 120,
        backgroundColor: 'white'
    }
});