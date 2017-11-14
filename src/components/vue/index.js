import Api from '../services/api';
import App from '../services/app';
import Config from '../services/config';
import Filter from '../services/filter';
import Utils from '../services/utils';
import vueStore from 'vue-store';
import vueAvatar from 'vue-avatar';
import vueCssScale from 'vue-css-scale';

export const $Api = Api;
export const $App = App;
export const $Config = Config;
export const $Filter = Filter;
export const $Utils = Utils;
export const AppBase = vueStore;
export const VA = vueAvatar;
export const VCS = vueCssScale;


export const NavTop = require('./nav-top.vue');
export const Card = require('./card.vue');
export const myCheckbox = require('./myCheckbox.vue');
export const orderStages = require('./order-stages.vue');
export const contactBox = require('./contactBox.vue');
export const payBox = require('./payBox.vue');
export const loading = require('./loading.vue');
