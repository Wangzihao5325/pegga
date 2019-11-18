import React, { PureComponent } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const defaultStyles = ({
    highlight: {
        backgroundColor: 'transparent',
    },
    highlightText: {
        color: 'white'
    },
    normallight: {
        backgroundColor: 'white',
        borderColor: '#E7EAF0',
        borderWidth: 1
    },
    normalText: {
        color: '#6c6c6c'
    }
});

export default class SwichSelect extends PureComponent {
    static defaultProps = {
        data: [{ title: 'one', key: 'one_type' }, { title: 'two', key: 'two_type' }],
        style: { height: 30, width: 120, borderRadius: 10 },
        isControl: false,
        itemHighlightStyle: defaultStyles.highlight,
        itemNormallightStyle: defaultStyles.normallight,
        highlightText: defaultStyles.highlightText,
        normalText: defaultStyles.normalText,
        colors: ['#6284E4', '#4BADCB'],//['#6284E4','#4BADCB', '#39DFB1'],
    }

    state = {
        selectKey: this.props.data[0].key
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isControl) {
            return {
                selectKey: props.selectValue
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                {
                    this.props.data.map((item, index) => {
                        let borderStyle = null;
                        if (index == 0) {
                            borderStyle = { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 };
                        } else if (index == this.props.data.length - 1) {
                            borderStyle = { borderTopRightRadius: 5, borderBottomRightRadius: 5 };
                        }
                        if (item.key == this.state.selectKey) {
                            let btnStyle = this.props.itemHighlightStyle;
                            let textStyle = this.props.highlightText;
                            let colors = index == 0 ? ['#6284E4', '#4BADCB'] : ['#4BADCB', '#39DFB1'];
                            return (
                                <LinearGradient key={item.key} colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.itemContainer, btnStyle, this.props.itemStyle, borderStyle]}>
                                    <TouchableHighlight
                                        style={{ flex: 1 }}
                                        onPress={() => this.itemPress(item, index)}
                                        underlayColor='transparent'
                                    >
                                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={textStyle}>{item.title}</Text></View>
                                    </TouchableHighlight>
                                </LinearGradient>
                            );
                        } else {
                            let btnStyle = this.props.itemNormallightStyle;
                            let textStyle = this.props.normalText;
                            return (
                                <TouchableHighlight
                                    key={item.key}
                                    style={[styles.itemContainer, btnStyle, this.props.itemStyle, borderStyle]}
                                    onPress={() => this.itemPress(item, index)}
                                    underlayColor='transparent'
                                >
                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={textStyle}>{item.title}</Text></View>
                                </TouchableHighlight>
                            );
                        }
                    })
                }
            </View>
        );
    }

    itemPress = (item, index) => {
        if (item.key !== this.state.selectKey) {
            if (this.props.isControl && typeof this.props.callback == 'function') {
                this.props.callback(item, index);
            } else {
                this.setState({
                    selectKey: item.key
                }, () => {
                    if (typeof this.props.callback == 'function') {
                        this.props.callback(item, index);
                    }
                })
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        borderRadius: 10,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

});