import React, { Component } from 'react';
import {
    SafeAreaView,
} from 'react-native';
import Select from '../../component/select';
import Api from '../../socket';

import ShortInfo from './ShortInfo';
import Info from './Info';
import Price from './Price';

export default class Assets extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: 'price'
    }

    componentDidMount() {
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <Select.ScrollLinear
                    data={[{ title: '行情', key: 'price' }, { title: '资讯', key: 'info' }, { title: '快讯', key: 'shortInfo' }]}
                    isFlex={true}
                    style={{ backgroundColor: 'white' }}
                    selectValue={this.state.type}
                    selectChange={this.selectChange}
                    isControl
                />
                {this.state.type == 'price' && <Price navi={this.props.navigation} />}
                {this.state.type == 'info' && <Info navi={this.props.navigation} />}
                {this.state.type == 'shortInfo' && <ShortInfo navi={this.props.navigation} />}
            </SafeAreaView>
        );
    }


    selectChange = (item) => {
        this.setState({
            type: item.key
        })
    }
}