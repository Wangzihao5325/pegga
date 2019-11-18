import React, { Component } from 'react';
import {
    SafeAreaView,
    Text,
    Button,
} from 'react-native';

export default class ResetPassword extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        return (
            <SafeAreaView>
                <Text>ResetPassword</Text>
                <Button title='back' onPress={this.goBack} />
            </SafeAreaView>
        );
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}