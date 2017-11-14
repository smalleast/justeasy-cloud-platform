<template>
  <div class="card">
    <div class="photo">
      <VCS
        url="http://oss.zhulogic.com/product_image/cpcdfe8bab348949bba939ead7c47c1519.png?x-oss-process=style/w660"></VCS>

    </div>
    <div class="bd">
      <p class="name mt10">现代风格单人沙发</p>
      <p class="remark mt5">金属框架+海绵+布艺软包</p>
      <div class="row row-center wp-10 star mt15">
        <div class="col-50"><i class="iconfont icon-collectstar1 mr10"></i>380</div>
        <div class="col-50 tr">8天前</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {VCS} from './index';

  export default {
    data() {
      return {}
    },
    components: {
      VCS
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .card {
    width: 228px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px #a2a2a8;
    transition: all .2s ease-in-out;
    cursor: pointer;
    margin: 15px;
    .photo {
      height: 195px;
    }
    .bd {
      padding: 10px 10px;
      line-height: 24px;

      .name {
        font-size: 16px;
      }
      .remark {
        font-size: 14px;
        color: #b3b3b3;;
      }
      .star {
        font-size: 14px;
      }
    }
    &:hover {
      box-shadow: 0px 2px 6px 0px #a2a7a8;
    }
  }
</style>
