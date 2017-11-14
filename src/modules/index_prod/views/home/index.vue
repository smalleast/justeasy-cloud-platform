<template>
  <section class="home">
    <div class="banner">
      <el-carousel :interval="5000" arrow="hover">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <div class="search bg-f">
        <div class="search-input">
          <input type="text" placeholder="输入关键词搜索产品">
          <button class="button button-icon-transparent sm">
            <i class="iconfont icon-search"></i>
          </button>
        </div>
      </div>
      <div class="select bg-f">
        <div class="row row-center wp-auto">
          <div class="item">
            <el-select v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="col"></div>
          <div class="right">
            价格 <input type="text" placeholder="￥" class="ml10 mr10">-<input type="text" placeholder="￥" class="ml10">
          </div>
        </div>
      </div>
      <div class="product wp-auto">
        <div class="row row-center row-wrap">
          <Card v-for="item in 20"></Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {VCS, Card} from 'components/vue/index';

  export default {
    name: 'home',
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value4: '选项2'
      }
    },
    methods: {},
    computed: {},
    components: {VCS, Card},
    created() {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .home {
    .banner {
      .el-carousel__item {
        text-align: center;
        h3 {
          color: #475669;
          font-size: 18px;
          opacity: 0.75;
          line-height: 300px;
          margin: 0;
        }
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
      }
    }
    .content {
      .search {
        width: 100%;
        height: 110px;
        border-bottom: 1px solid rgb(237, 231, 232);
        &-input {
          width: 340px;
          margin: auto;
          padding-top: 44px;
          position: relative;
          > input {
            height: 44px;
            font-size: 28px;
            width: 270px;
          }
        }
      }
      .select {
        .row {
          height: 60px;
          > .item {
            width: 120px;
            padding-left: 12px;
          }
          > .right {
            > input {
              background: rgb(235, 239, 240);
              width: 108px;
              height: 36px;
              padding: 0 5px;
            }
          }
        }
      }
      .product {
        margin-top: 20px;

      }
    }
  }


</style>
