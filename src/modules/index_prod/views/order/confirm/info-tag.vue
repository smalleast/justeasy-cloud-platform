<template>
    <div class="info-tag">
        {{text}}
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            text: {
                type: String,
                default: '收货信息'
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .info-tag {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #DCE0E0;
        border-radius: 4px;
        font-size: 12px;
        color: #308697;
        position: relative;
        width: 84px;
        height: 31px;
        line-height: 32px;
        text-indent: 20px;
        margin-left: -13px;
        &:before {
            content: '';
            background: #308697;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            top: 13px;
            left: 8px;
        }
    }
</style>