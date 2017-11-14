<template>
    <Modal v-model="agioMDL" width="640" class="agio-model" class-name="vertical-center-modal no-padding">
        <div slot="header" class="title">差价支付</div>
        <div class="close-btn" slot="close">
            <i class="iconfont icon-pop-close"></i>
        </div>
        <div class="content">
            <p class="hd">通过与客户沟通协商，修改订单</p>
            <div><span class="list-icon"></span><span>修改内容</span></div>
            <p class="remark">这是修改的详细信息数据</p>
            <div><span class="list-icon"></span><span>补充金额</span><span
                    class="price">{{payPrice | currency('¥', '2')}}</span>
            </div>
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
                payPrice: 0,
                agioMDL: false
            };
        },
        components:{
        },
        methods: {
            open() {
                this.agioMDL = true;
            },
            close() {
                this.agioMDL = false;
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
            width: 600px;
            margin: auto;
            text-align: left;
            color: #6C6F70;
            font-size: 12px;
            padding-bottom: 60px;
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
        }
    }
</style>