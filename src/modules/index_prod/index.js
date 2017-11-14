import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'components/styles/index.scss'
import App from './app.vue'
import router from './router'
import store from 'components/store'
import '../../assets/fonts/iconfont.css'

Vue.use(ElementUI, {locale})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
