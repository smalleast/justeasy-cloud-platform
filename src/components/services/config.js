/**
 * Created by dcpai on 2017/7/6.
 */


(function () {
  let NODE_ENV = process.env.NODE_ENV;
  let IMG_SERVER = 'http://oss.zhulogic.com/';
  let SERVER_URL = NODE_ENV === 'development' ? 'http://webapi.zhulogic.com:8098' : 'http://webapi.zhulogic.com';
  const Config = {
    IMG_SERVER: IMG_SERVER,
    SERVER_URL: SERVER_URL,
    API_WITH_TOKEN: {
      baseUrl: '/factory_api/',
      items: [
        'fac_user_info',
        'logout',
      ]
    },
    API_WITHOUT_TOKEN: {
      baseUrl: '/factory_api/',
      items: [
        'login'
      ]
    }
  };
  module.exports = Config;
}());
