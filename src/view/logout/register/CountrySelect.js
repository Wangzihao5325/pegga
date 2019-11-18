import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class CountrySelect extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                {this.props.isShow && <Text style={styles.text} onPress={this.textPress}>{`${this.props.name} ${this.props.code}  `}<Text style={styles.arrowText}>></Text></Text>}
            </View>
        );
    }

    textPress = () => {
        if (typeof this.props.callback === 'function') {
            this.props.callback();
        }
    }
}

function mapState2Props(store) {
    return {
        name: store.country.name,
        code: store.country.code
    }
}

export default connect(mapState2Props)(CountrySelect);

const styles = StyleSheet.create({
    container: {
        height: 20,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    text: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)',
        marginLeft: 20,
    },
    arrowText: {
        color: '#858585'
    }
});