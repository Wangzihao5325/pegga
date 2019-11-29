import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
export default class ImageDetailModel extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        uri: null,
        height: 200,
        width: 200
    }

    componentDidMount() {
        const uri = this.props.navigation.getParam('uri', null);
        const height = this.props.navigation.getParam('height', 200);
        const width = this.props.navigation.getParam('width', 200);
        this.setState({
            uri,
            height,
            width
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}>
                <SafeAreaView style={styles.container}>
                    {this.state.uri &&
                        <Image style={{ height: this.state.height, width: this.state.width }} source={{ uri: this.state.uri }} />
                    }
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
});