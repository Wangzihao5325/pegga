const envirmentType = ['online', 'test', 'yuejun']
const envirment = envirmentType[1];
const ONLINE_SERVICE_URL = {
    domain: 'http://ec2-13-229-204-248.ap-southeast-1.compute.amazonaws.com:4000',
    imageDomain: 'http://ec2-13-229-204-248.ap-southeast-1.compute.amazonaws.com:4000/api/file/upload/image',
    payment: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8080/ali.html',
    invite: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/#/',
    aliUid: 'https://render.alipay.com/p/f/fd-ixpo7iia/index.html'
};
const TEST_SERVICE_URL = {
    domain: 'http://192.168.3.144:4000',
    imageDomain: 'http://192.168.3.144:4000/api/file/upload/image',
    payment: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8080/ali.html',
    invite: 'http://192.168.3.127:8081/index.html/#/',
    aliUid: 'https://render.alipay.com/p/f/fd-ixpo7iia/index.html'
};
const YUE_SERVICE_URL = {
    domain: 'http://192.168.3.140:4000',
    imageDomain: 'http://192.168.3.140:4000/api/file/upload/image',
    payment: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8080/ali.html',
    invite: 'http://ec2-54-254-138-126.ap-southeast-1.compute.amazonaws.com:8081/#/',
    aliUid: 'https://render.alipay.com/p/f/fd-ixpo7iia/index.html'
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
    }
    return result;
}
const SERVICE_URL = urlSwich(envirment);
const INFO = { iosVer: '1.0.0', androidVer: '1.0.0' };

export {
    SERVICE_URL,
    INFO
}