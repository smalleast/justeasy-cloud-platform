<template>
    <Modal v-model="ruleMDL" width="460" class="agio-model" class-name="vertical-center-modal no-padding">
        <div slot="header" class="title">差价退还规则</div>
        <div class="close-btn" slot="close">
            <i class="iconfont icon-pop-close"></i>
        </div>
        <div class="content">
            <p> 1.因退换货会产生退款</p>
            <p> 2.其他情况，与住逻辑协商产生退款</p>
            <p> 3.退款会在订单结束后统一退还至您的支付账户</p>
        </div>
        <div class="footer">
            <button class="main-btn" @click="close">我知道了</button>
        </div>
    </Modal>
</template>
<script>
    export default {
        data() {
            return {
                ruleMDL: false
            };
        },
        components: {},
        methods: {
            open() {
                this.ruleMDL = true;
            },
            close() {
                this.ruleMDL = false;
            }
        },
        created() {

        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .agio-model {
        .title {
            font-size: 20px;
            color: #353838;
        }
        .content {
            width: 350px;
            margin: auto;
            text-align: left;
            color: #6C6F70;
            font-size: 12px;
            padding-bottom: 60px;
            margin-top: 15px;
            line-height:24px;
            .hd {
                margin-top: 22px;
                margin-bottom: 40px;
                font-size: 14px;
                color: #6C6F70;
            }
            .list-icon {
                width: 10px;
                height: 10px;
                border-radius: 10px;
                display: inline-block;
                background: #6C6F70;
                margin-right: 5px;
            }
            .remark {
                margin-top: 20px;
                margin-bottom: 50px;
            }
            .price {
                color: rgb(225, 77, 94);
                margin-left: 8px;
            }
        }
        .footer {
            padding-bottom: 20px;
            margin-top: 20px;
            .main-btn {
                padding: 0 20px;
            }
        }
    }
</style>