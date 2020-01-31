const envirmentType = ['online', 'test', 'yuejun']
const envirment = envirmentType[3];
const HOME_SERVICE_URL = {
    domain: 'http://wkqqqa.natappfree.cc',
    imageDomain: 'http://ec2-52-221-239-118.ap-southeast-1.compute.amazonaws.com:4000/api/file/upload/image',
    payment: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8080/ali.html',
    invite: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/#/',
    aliUid: 'https://render.alipay.com/p/f/fd-ixpo7iia/index.html',
    agreement: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/userAgreement.html',
    chat: 'https://www.pqpay.io/?#/login',
};
const ONLINE_SERVICE_URL = {
    domain: 'http://ec2-52-221-239-118.ap-southeast-1.compute.amazonaws.com:4000',
    imageDomain: 'http://ec2-52-221-239-118.ap-southeast-1.compute.amazonaws.com:4000/api/file/upload/image',
    payment: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8080/ali.html',
    invite: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/#/',
    aliUid: 'https://render.alipay.com/p/f/fd-ixpo7iia/index.html',
    agreement: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/userAgreement.html',
    chat: 'https://www.pqpay.io/?#/login',
};
const TEST_SERVICE_URL = {
    domain: 'http://192.168.3.144:4000',
    imageDomain: 'http://192.168.3.144:4000/api/file/upload/image',
    payment: 'http://6h3rix.natappfree.cc/ali.html',
    invite: 'http://192.168.3.127:8081/index.html/#/',
    aliUid: 'https://render.alipay.com/p/f/fd-ixpo7iia/index.html',
    agreement: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/userAgreement.html',
    chat: 'https://www.pqpay.io/?#/login',
};
const YUE_SERVICE_URL = {
    domain: 'http://192.168.3.140:4000',
    imageDomain: 'http://192.168.3.140:4000/api/file/upload/image',
    payment: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8080/ali.html',
    invite: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/#/',
    aliUid: 'https://render.alipay.com/p/f/fd-ixpo7iia/index.html',
    agreement: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/userAgreement.html',
    chat: 'https://www.pqpay.io/?#/login',
};
const urlSwich = (envirment) => {
    let result = null;
    switch (envirment) {
        case envirmentType[0]:
            result = ONLINE_SERVICE_URL;
            break;
        case envirmentType[1]:
            result = TEST_SERVICE_URL;
            break;
        case envirmentType[2]:
            result = YUE_SERVICE_URL;
            break;
        case envirmentType[3]:
            result = HOME_SERVICE_URL;
            break;
    }
    return result;
}
const SERVICE_URL = urlSwich(envirment);
const INFO = { iosVer: '1.0.0', androidVer: '1.0.0' };

export {
    SERVICE_URL,
    INFO
}