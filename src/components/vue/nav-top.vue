<template>
  <nav class="bg-f">
    <div class="row nav-top row-center wp-auto">
      <div class="left-logo">
        <router-link to="/home">
          <VA :size="{width:'227px',height:'43px'}" :url="logo" radius="0"></VA>
        </router-link>
      </div>
      <div class="left-desc">
        <output class="title db">软装定制服务平台</output>
        <output class="remark">本服务由住逻辑提供技术支持</output>
      </div>
      <div class="col"></div>
      <div class="right">
        <button class="button button-icon-transparent sm" @click="openLogin">
          登录
        </button>
        <button class="button button-icon-transparent sm">
          注册
        </button>
        <router-link to="/order/confirm">
          <button class="button button-icon-transparent md">
            <i class="iconfont icon-box mr10"></i>我的订单
          </button>
        </router-link>
        <button class="button button-icon-transparent sm">
          <i class="iconfont icon-smallbell"></i>
        </button>
        <button class="button button-icon md">
          <i class="iconfont icon-coppercash mr10"></i>申请报价
        </button>
      </div>
    </div>
    <Login ref="login"></Login>
  </nav>
</template>
<script>
  import {VA} from './index';
  import logo from '../../assets/images/justeasylogo.png';
  import Login from './login.vue';

  export default {
    data() {
      return {
        logo: logo
      }
    },
    methods: {
      openLogin() {
        this.$refs.login.open();
      }
    }
    ,
    components: {
      VA, Login
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .nav {
    &-top {
      height: 75px;
      .left {
        &-logo {
          width: 247px;
        }
        &-desc {
          position: relative;
          width: 250px;
          padding-left: 20px;

          .title {
            font-size: 24px;
            font-weight: bold;
            color: rgb(1, 1, 1);
          }
          .remark {
            font-size: 14px;
            color: rgb(179, 179, 179);
          }

          &:before {
            content: '';
            position: absolute;
            width: 1px;
            height: 80%;
            overflow: hidden;
            background: rgb(174, 174, 174);
            left: 0;
            top: 10%;
          }
        }
      }
    }
  }


</style>
