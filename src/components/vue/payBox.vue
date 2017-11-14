<template>
    <Modal v-model="hasPayMdl" width="320" class-name="vertical-center-modal no-padding">
        <div class="close-btn" slot="close">
            <i class="iconfont icon-pop-close"></i>
        </div>
        <div class="pay-sel">
            <div class="left-method" @click="onBankPay">
                <i class="iconfont icon-Transferaccounts"></i>
                <p>银行转账</p>
            </div>
            <div class="right-method" @click="onKuaiPay">
                <i class="iconfont icon-Quick"></i>
                <p>快捷支付</p>
            </div>
        </div>
    </Modal>
</template>
<script>
    export default {
        data() {
            return {
                hasPayMdl: this.payMdl || false,
                id: '',
                type: '1'
            };
        },
        props: {
            payMdl: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            open() {
                this.hasPayMdl = true;
            },
            onBankPay() {
                this.$router.push('/my/pay/offlineTransfer/' + this.id + '/' + this.type + '');
            },
            onKuaiPay() {
                this.$router.push('/my/pay/choicePay/' + this.id + '/' + this.type + '');
            }
        }
    }
</script>
<style scoped>
    .pay-sel {
        padding: 20px;
    }

    .pay-sel > div {
        display: inline-block;
        width: 136px;
        height: 200px;
        padding-top: 60px;
    }

    .pay-sel > div p {
        font-size: 14px;
    }

    .pay-sel .left-method {
        border-right: 2px solid #F2F4F5;
    }

    .pay-sel .left-method i {
        color: #308697;
        font-size: 48px;
        cursor: pointer;
    }

    .pay-sel .right-method i {
        color: #99C72C;
        font-size: 48px;
        cursor: pointer;
    }
</style>