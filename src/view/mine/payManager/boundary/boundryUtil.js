import TotalData from '../../../../global/doc/city-picker.data';
import store from '../../../../store';
import { boundry_change } from '../../../../store/actions/countryCodeAction';
import Enum from '../../../../global/Enum';
import I18n from '../../../../global/doc/i18n'

export default function (province, city) {
    if (!province) {
        store.dispatch(boundry_change(I18n.CHINA, [Enum.COUNTRY_NUM.CHINA]));
        return 'country';
    }
    let provinceArr = TotalData[`${Enum.COUNTRY_NUM.CHINA}`];
    let provinceItem = null;
    for (let key in provinceArr) {
        let reg = provinceArr[key];
        let resArr = reg.filter((item) => {
            return item[0] == province;
        });
        if (resArr.length > 0) {
            provinceItem = resArr[0];
            break
        }
    }
    let provinceCode = provinceItem[0];
    let provinceName = provinceItem[1];

    if (!city) {
        store.dispatch(boundry_change(`${I18n.CHINA}-${provinceName}`, [Enum.COUNTRY_NUM.CHINA, provinceCode]));
        return 'province';
    }

    let cityArr = TotalData[province];
    let cityRegArr = cityArr.filter((item) => {
        return item[0] == city;
    });
    let cityItem = cityRegArr[0];
    store.dispatch(boundry_change(`${I18n.CHINA}-${provinceName}-${cityItem[1]}`, [Enum.COUNTRY_NUM.CHINA, provinceCode, cityItem[0]]));
    return 'city';
}