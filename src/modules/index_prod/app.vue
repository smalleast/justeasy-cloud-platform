<template>
  <section class="app">
    <NavTop></NavTop>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </section>

</template>
<script>
  import {AppBase, $Api, NavTop} from '../../components/vue/index';

  export default {
    data() {
      return {}
    },
    methods: {},
    components: {
      NavTop
    },
    created() {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .app {
    min-width: 1200px;

  }
</style>
