import React, { PureComponent } from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

class Item extends PureComponent {
    static defaultProps = {
        title: 'title',
        value: 0
    }

    render() {
        let coinNum = this.props.show ? this.props.value : '****';
        let coinMoney = this.props.show ? this.props.money : '****';
        return (
            <TouchableHighlight style={styles.btnContainer} onPress={this.itemPress} underlayColor='transparent'>
                <View style={styles.wrapper}>
                    <Image style={styles.icon} source={require('../../image/coinIcon/PQC.png')} />
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Text style={{ color: 'rgb(73,73,73)', fontSize: 17 }}>{coinNum}</Text>
                            <Text style={{ color: 'rgb(179,179,179)', fontSize: 12, marginTop: 10 }}>{`≈${coinMoney} CYN`}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    itemPress = () => {
        if (typeof this.props.callback == 'function') {
            this.props.callback();
        }
    }
}

function mapState2Props(store) {
    return {
        show: store.assets.show
    }
}

export default connect(mapState2Props)(Item);

const styles = StyleSheet.create({
    btnContainer: {
        height: 71,
        width: Dimensions.get('window').width,
        display: 'flex'
    },
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    icon: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    titleText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 17,
        color: 'rgb(40,46,60)',
        fontWeight: 'bold'
    }
});