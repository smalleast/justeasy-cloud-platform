<template>
    <div class="stage">
        <img :src="pageLoad" class="load" alt="">
    </div>
</template>
<script>
    import loading from '../../assets/images/loading.gif';

    export default {
        data() {
            return {
                pageLoad: loading
            };
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .stage{
        text-align: center;
        background-color: #F2F4F5;
        .load {
            width: 120px;
            height: 120px;
            margin: auto;
        }
    }

</style>
