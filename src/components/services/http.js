import nxAxios from 'vue-axios';
import Q from 'q';
import axios from 'axios';
import nx from 'next-js-core2';
import AppBase from 'vue-store';
import Config from './config';
import {Message} from 'element-ui';

const WeiPaiHttp = nx.declare({
  extends: nxAxios,
  statics: {
    instance: null,
    getInstance: function () {
      if (!WeiPaiHttp.instance) {
        WeiPaiHttp.instance = new WeiPaiHttp();
      }
      return WeiPaiHttp.instance;
    }
  },
  methods: {
    init: function () {
      const env = nx.hashlize().env;
      this.$base.init.call(this);
      this.initHeaders();
      this.setDefaults({
        timeout: 600000,
        baseURL: Config.SERVER_URL || './'
      });
    },
    initHeaders: function () {

    },
    error: function (errorResponse) {
      const defer = Q.defer();
      const $hash = nx.hashlize();
      switch (errorResponse.status_code) {
        case 401:
          Message.error('登录已失效');
          break;
        case 400:
          Message.error(errorResponse.message);
          break;
        default:
          Message.error('服务器错误');
          break;
      }
      return defer.reject(errorResponse);
    },
    success: function (inResponse) {
      if (inResponse.data.status_code === 200) {
        return this.toData(inResponse);
      } else {
        return this.error(inResponse.data);
      }
    },
    toData: function (inResponse) {
      return inResponse.data;
    },
    authorization: function (inRequest) {
      const {token} = AppBase.local;
      if (token) {
        inRequest.headers.common['Authorization'] = token;
      }
      return inRequest;
    }
  }
});

export default WeiPaiHttp.getInstance();



