import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import I18n from '../../global/doc/i18n';
import NavigationService from './NavigationService';

//发现
import ExploreView from '../../view/explore';
import NewsWeb from '../../view/explore/newsWeb';

//资产
import AssetsView from '../../view/assets';
import AssetsDetail from '../../view/assets/assetsDetail';
import MoneyFlow from '../../view/assets/moneyFlow';

//otc
import TradingHallView from '../../view/otc/tradingHall';
import BuyIn from '../../view/otc/tradingHall/buyIn';
import NewAd from '../../view/otc/tradingHall/newAd';
import OrderServiceCenterView from '../../view/otc/orderServiceCenter';
import AdManagementView from '../../view/otc/adManagement';
import Appeal from '../../view/otc/appeal';
import AddAppeal from '../../view/otc/appeal/addAppeal';

//我的
import MineView from '../../view/mine';
import Info from '../../view/mine/info';
import NickName from '../../view/mine/info/nickName';
import Contact from '../../view/mine/info/contact';
import SecurityCenter from '../../view/mine/securityCenter';
import PayManager from '../../view/mine/payManager';
import PaymentAdd from '../../view/mine/payManager/PaymentAdd';
import HelpCenter from '../../view/mine/helpCenter';
import AboutUs from '../../view/mine/aboutUs';
import Setting from '../../view/mine/setting';
import BindStepOne from '../../view/mine/securityCenter/bind/stepOne';
import BindStepTwo from '../../view/mine/securityCenter/bind/stepTwo';
import Country_Code_Login from '../../view/mine/securityCenter/bind/loginCountryCode/countryCode';
import AssetsPwdFinally from '../../view/mine/securityCenter/bind/assetsPwdFinally/index';
import CitySelect from '../../view/mine/payManager/citySelect';
import Identity from '../../view/mine/identity';
import MerchantCertification from '../../view/mine/merchant';
import CustomService from '../../view/mine/customService';
import Chat from '../../view/mine/customService/chat';
import Invite from '../../view/mine/invite/index';
import InviteList from '../../view/mine/invite/list';
import Agreement from '../../view/mine/aboutUs/agreement';
import IMChat from '../../view/mine/chat';
import IMChatView from '../../view/mine/chat/talkView';

//modal
import OTC_OrderDetails from '../../view/otc/orderServiceCenter/orderDetailsModel';
import OTC_SellerDetailInfo from '../../view/otc/orderServiceCenter/detailInfoModel';
import Assets_BillTypeSelect from '../../view/assets/moneyFlow/billTypeSelectModel';
import SelectModel from '../../view/model/selectModelPro';
import SelectModelPay from '../../view/model/selectModelPayment';
import ImageDetail from '../../view/model/imageDetail';
import PopModel from '../../view/model/popModel';
import adPaymentModel from '../../view/model/adPayment';

//logout
import LoginView from '../../view/logout/login';
import RegisterView from '../../view/logout/register';
import ResetPasswordView from '../../view/logout/resetPassword';
import InitView from '../../view/logout/initial';
import VerCodeInputView from '../../view/logout/register/verCodeInputView';
import PwdInputView from '../../view/logout/register/pwdInputView';
import Country_Code from '../../view/model/countryCode';

import { init, connect } from "rongcloud-react-native-imlib";

//资产
let AssetsStack = createStackNavigator({
    AssetsView,
    AssetsDetail,
    MoneyFlow
}, {
    navigationOptions: {
        gesturesEnabled: false
    }
});

AssetsStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: I18n.TAB_BTM_ASSETS,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../../image/tabBottomNaviIcon/assets_selected.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../../image/tabBottomNaviIcon/assets_unselected.png')}
                />
            )
        },
        tabBarVisible
    }
};

//发现页面
let ExploreStack = createStackNavigator({
    ExploreView,
    NewsWeb
}, {
    navigationOptions: {
        gesturesEnabled: false
    }
});

ExploreStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: I18n.TAB_BTM_DISCOVER,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../../image/tabBottomNaviIcon/explore_selected.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../../image/tabBottomNaviIcon/explore_unselected.png')}
                />
            )
        },
        tabBarVisible
    }
};

//otc

let OTCStack = createStackNavigator({
    TradingHallView,
    BuyIn,
    NewAd,
    OrderServiceCenterView,
    AdManagementView,
    Appeal,
    AddAppeal
}, {
    navigationOptions: {
        gesturesEnabled: false
    }
});

OTCStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: I18n.TAB_BTM_MARKRT,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../../image/tabBottomNaviIcon/otc_selected.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../../image/tabBottomNaviIcon/otc_unselected.png')}
                />
            )
        },
        tabBarVisible
    }
};

//我的
let MineStack = createStackNavigator({
    MineView,
    Info,
    NickName,
    Contact,
    SecurityCenter,
    PayManager,
    PaymentAdd,
    HelpCenter,
    AboutUs,
    Setting,
    BindStepOne,
    BindStepTwo,
    Country_Code_Login,
    AssetsPwdFinally,
    CitySelect,
    Identity,
    MerchantCertification,
    CustomService,
    Chat,
    Invite,
    InviteList,
    Agreement,
    IMChat,
    IMChatView,
}, {
    navigationOptions: {
        gesturesEnabled: false
    }
});

MineStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: I18n.TAB_BTM_ME,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../../image/tabBottomNaviIcon/mine_selected.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../../image/tabBottomNaviIcon/mine_unselected.png')}
                />
            )
        },
        tabBarVisible
    }
};

//bottom router
const BottomRouter = createBottomTabNavigator(
    {
        AssetsStack,
        ExploreStack,
        OTCStack,
        MineStack,
    },
    {
        initialRouteName: 'OTCStack',
        order: ['OTCStack', 'AssetsStack', 'ExploreStack', 'MineStack'],
        tabBarOptions: {
            activeTintColor: '#000',
            style: {
                backgroundColor: '#fff',
            }
        }
    }
);
//logged router with modal
let RouterWithModal = createStackNavigator(
    {
        Main: {
            screen: BottomRouter
        },
        OTC_OrderDetails: {
            screen: OTC_OrderDetails
        },
        OTC_SellerDetailInfo: {
            screen: OTC_SellerDetailInfo
        },
        Assets_BillTypeSelect: {
            screen: Assets_BillTypeSelect
        },
        SelectModel: {
            screen: SelectModel
        },
        ImageDetail: {
            screen: ImageDetail
        },
        PopModel: {
            screen: PopModel
        },
        SelectModelPay: {
            screen: SelectModelPay
        },
        adPaymentModel: {
            screen: adPaymentModel
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
        transparentCard: true,
        cardStyle: {
            // makes transparentCard work for android
            opacity: 1.0
        },
    }
);

//logout router

let RouterLogout = createStackNavigator({
    LoginView,
    RegisterView,
    ResetPasswordView,

    VerCodeInputView,
    PwdInputView,
    Country_Code,
}, {
    navigationOptions: {
        gesturesEnabled: false
    }
})


//const AppContainer = createAppContainer(RouterWithModal);
const AppContainer = createAppContainer(createSwitchNavigator(
    {
        Init: InitView,
        App: RouterWithModal,
        Logout: RouterLogout,
    },
    {
        initialRouteName: 'Init',
    }
));

init("p5tvi9dspqhm4");

export default AppContainer;