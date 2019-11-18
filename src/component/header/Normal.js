import React, { PureComponent } from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';

import Utils from '../../global/util';

export default class NormalHeader extends PureComponent {
    static defaultProps = {
        showBackBtn: true,
        rightBtnComponent: null
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {this.props.showBackBtn &&
                        <TouchableHighlight
                            style={styles.image}
                            onPress={this.goback}
                            underlayColor='transparent'
                        >
                            <Image
                                style={styles.image}
                                source={require('../../image/arrow/back_arrow_black.png')}
                            />
                        </TouchableHighlight>
                    }
                </View>
                <View style={styles.centerWrapper}>
                    {typeof this.props.title == 'string' && <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>}
                </View>
                <View style={styles.wrapper}>
                    {
                        this.props.rightBtnComponent && Utils.componentCheck.render(this.props.rightBtnComponent)
                    }
                </View>
            </View>
        );
    }

    goback = () => {
        if (typeof this.props.goback == 'function') {
            this.props.goback();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    wrapper: {
        height: 44,
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    centerWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 20,
        width: 20
    },
    title: {
        fontSize: 20
    }
});