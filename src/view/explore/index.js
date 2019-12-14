import React, { Component } from 'react';
import {
    SafeAreaView,
} from 'react-native';
import Select from '../../component/select';
import I18n from '../../global/doc/i18n';

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
                    data={[{ title: I18n.EXPLORE_MARKET, key: 'price' }, { title: I18n.EXPLORE_ARTICLE, key: 'info' }, { title: I18n.EXPLORE_NEWS, key: 'shortInfo' }]}
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