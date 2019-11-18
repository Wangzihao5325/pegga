import React, { PureComponent } from 'react';
import {
    FlatList,
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const defaultStyles = StyleSheet.create({
    highlightText: {
        fontSize: 15,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        color: 'rgb(40,46,60)',
    },
    normallightText: {
        fontSize: 15,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(112,116,121)',
    },
});

class Item extends PureComponent {
    render() {
        let textStyle = this.props.item.key == this.props.nowSelect ? this.props.highlightText : this.props.normallightText;
        return (
            <TouchableHighlight style={[styles.itemBtn, this.props.isFlex ? { width: Dimensions.get('window').width / this.props.dataNum } : null]} underlayColor='transparent' onPress={this.btnPress}>
                <View style={styles.itemWrapper}>
                    <View style={styles.itemContainer} >
                        <Text style={textStyle}>{this.props.item.title}</Text>
                    </View>
                    {this.props.item.key == this.props.nowSelect && <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.itemHighlightBottom} />}
                </View>
            </TouchableHighlight>
        );
    }

    btnPress = () => {
        if (typeof this.props.callback == 'function') {
            this.props.callback(this.props.item, this.props.index);
        }
    }
}

export default class ScrollSelect extends PureComponent {
    static defaultProps = {
        data: [{ title: 'title A', key: 'key_A' }, { title: 'title B', key: 'key_B' }],
        isControl: false,
        isFlex: false,
        itemStyle: { height: 50, width: 80 },
        highlightText: defaultStyles.highlightText,
        normallightText: defaultStyles.normallightText,
    }

    state = {
        nowSelect: this.props.data[0].key
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isControl) {
            return {
                nowSelect: props.selectValue
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={[styles.flatlist, this.props.style]}>
                <FlatList
                    data={this.props.data}
                    renderItem={
                        ({ item, index }) => <Item
                            item={item}
                            key={`key_${item.key}`}
                            index={index}
                            nowSelect={this.state.nowSelect}
                            callback={this.itemCallback}
                            dataNum={this.props.data.length}
                            isFlex={this.props.isFlex}
                            highlightText={this.props.highlightText}
                            normallightText={this.props.normallightText}
                        />
                    }
                    horizontal={true}
                    extraData={this.state.nowSelect}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    itemCallback = (item, index) => {
        if (this.props.isControl && typeof this.props.selectChange == 'function') {
            this.props.selectChange(item, index);
        }
        if (!this.props.isControl) {
            this.setState({
                nowSelect: item.key
            }, () => {
                if (typeof this.props.selectChange == 'function') {
                    this.props.selectChange(item, index);
                }
            });
        }
    }
}

const styles = StyleSheet.create({
    itemBtn: {
        height: 50,
        width: 80
    },
    itemWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemHighlightBottom: {
        height: 3,
        width: 30,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlist: {
        width: Dimensions.get('window').width,
        height: 51,
        borderBottomColor: '#F4F4F4',
        borderBottomWidth: 1
    }
});