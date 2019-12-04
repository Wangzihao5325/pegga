import React, { Component } from 'react';
import { Animated, Image, TouchableHighlight, View, Text, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import Btn from '../../component/btn';

function Item(props) {//index  data:[select,title,key]
    console.log(props);
    const btnPress = () => {
        props.itemPress(props.item, props.index);
    }
    let isSelect = props.selectIndexArr.indexOf(props.index) >= 0 ? true : false;

    switch (props.item.key) {
        case 'aliPay':
            break;
        case 'weChat':
            break;
        case 'bankCard':
            break;

    }
    return (
        <TouchableHighlight style={styles.itemContainer} onPress={btnPress} underlayColor='#EEE'>
            <View style={[{ flex: 1, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }]}>
                <Image style={{ height: 30, width: 30 }} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={isSelect ? styles.itemTextHighlight : styles.itemTextNormal} >{`${props.item.title}`}</Text>
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

    constructor(props) {
        super(props);
        this.timer = null;
    }

    state = {
        fadeAnim: new Animated.Value(0),
        type: '',
        title: null,
        data: [],
        selectIndexArr: []
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.timer = null
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                }
            ).start();

        }, 300);

        const type = this.props.navigation.getParam('type', 'single');//single multiple
        const dataStr = this.props.navigation.getParam('data', '[]');
        const title = this.props.navigation.getParam('title', '请选择');
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
            title,
            data,
            selectIndexArr
        });
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null
        }
    }

    render() {
        return (
            <Animated.View style={{ flex: 1, opacity: this.state.fadeAnim }}>
                <View style={styles.container}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.state.title}</Text>
                        </View>
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
                        <Btn.Linear
                            style={styles.backBtn}
                            textStyle={styles.backBtnText}
                            btnPress={() => this.goBackWithCallback(500)}
                            title='确定'
                        />
                    </View>
                </View>
            </Animated.View>
        )
    }

    back = (value) => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 400
            }
        ).start();
        this.timer = setTimeout(() => {
            this.timer = null;
            this.props.navigation.goBack();
        }, value)
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
        this.back(delay);
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    itemContainer: {
        height: 45,
        width: Dimensions.get('window').width,
        backgroundColor: 'white'
    },
    itemTextNormal: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 16,
        color: 'rgb(40,46,60)'
    },
    itemTextHighlight: {
        fontFamily: 'PingFang-SC-Regular',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgb(64,99,213)'
    },
    titleContainer: {
        height: 60,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        marginTop: 20,
        alignSelf: 'center',
        fontFamily: 'PingFang-SC-Regular',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgb(40,46,60)'
    },
    backBtn: {
        height: 65,
        width: Dimensions.get('window').width,
    },
    backBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
});