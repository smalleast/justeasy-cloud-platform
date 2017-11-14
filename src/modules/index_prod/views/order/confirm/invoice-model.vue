<template>
    <Modal v-model="invoiceMdl" width="640" class-name="vertical-center-modal no-padding">
        <div class="close-btn" slot="close">
            <i class="iconfont icon-pop-close"></i>
        </div>
        <div slot="header">
            <div class="title">发票信息</div>
        </div>
        <div class="invoice-form">
            <div class="item">
                <span class="label"><span class="red-font">*</span>发票类型: </span>
                <div class="input">
                    <span class="value">纸质发票</span>
                </div>
            </div>
            <div class="item">
                <span class="label"><span class="red-font">*</span>发票抬头: </span>
                <div style="display:inline-block">
                    <div class="type-tabs">
                        <span :class="{'active':invoice.titleType}" @click="invoice.titleType=true">个人</span>
                        <span :class="{'active':!invoice.titleType}" @click="invoice.titleType=false">单位</span>
                    </div>
                    <div class="input">
                        <input ref="companyName" type="text" maxlength="30" v-model="invoice.companyName" v-if="!invoice.titleType"
                               placeholder="输入单位名称">
                        <input ref="receiverName" type="text" maxlength="20" v-model="invoice.receiverName"
                               v-if="invoice.titleType"
                               placeholder="个人（输入姓名）">

                    </div>
                </div>
            </div>
            <div class="item" v-if="!invoice.titleType">
                <span class="label"><span class="red-font">*</span>纳税人识别码: </span>
                <div class="input">
                    <input ref="identityCode" type="text" maxlength="30" v-model="invoice.identityCode" placeholder="纳税人识别码">

                </div>
            </div>
            <div class="item">
                <span class="label"><span class="red-font">*</span>发票金额: </span>
                <div class="input">
                    <span class="value money">{{invoice.invoicePrice | currency('¥', '2')}}（总金额）</span>
                </div>
            </div>
            <div class="item">
                <span class="label"><span class="red-font">*</span>收票人电话: </span>
                <div class="input">
                    <input ref="phone" maxlength="20" type="text" v-model="invoice.receiverPhone" placeholder="收票人电话">

                </div>
            </div>
            <div class="item">
                <span class="label"><span class="red-font">*</span>收票人邮箱: </span>
                <div class="input">
                    <input ref="email" type="text" maxlength="30" v-model="invoice.receiverEmail" placeholder="收票人邮箱">

                </div>
            </div>
            <div class="invoice-state">
                <span class="title">发票须知：</span>
                <div>
                    <p>1.开票金额为用户实际支付的金额</p>
                    <p>2.未随箱寄出的纸质发票会在发货后10-15个工作日单独寄出</p>
                    <p>3.单笔订单只支持开具一种类型的发票</p>
                </div>
            </div>
            <div class="oper-btn">
                <button class="cancel-btn " @click="invoiceMdl = false">取消</button>
                <button class="main-btn" @click="invoiceSave">确定</button>
            </div>
        </div>
    </Modal>
</template>
<script>
    import {AppBase} from 'components/vue/index';

    export default {
        data() {
            return {
                invoiceMdl: false,
                invoice: {
                    titleType: true,//true:personal false:company
                    receiverName: '',
                    companyName: '',
                    identityCode: '',
                    invoicePrice: '',
                    receiverPhone: '',
                    receiverEmail: ''
                }
            };
        },
        methods: {
            verificationInvoice() {
                if (this.invoice.titleType && this.invoice.receiverName === '') {
                    this.$Message.error('发票抬头为空，请先输入个人姓名！');
                    this.$refs.receiverName.focus();
                    return false;
                }
                if (!this.invoice.titleType && this.invoice.companyName === '') {
                    this.$Message.error('发票抬头为空，请先输入单位名称！');
                    this.$refs.companyName.focus();
                    return false;
                }
                if (!this.invoice.titleType && this.invoice.identityCode === '') {
                    this.$Message.error('纳税人识别码为空，请先输入纳税人识别码！');
                    this.$refs.identityCode.focus();
                    return false;
                }
                if (this.invoice.receiverPhone === '') {
                    this.$Message.error('手机号为空，请先输入手机号！');
                    this.$refs.phone.focus();
                    return false;
                }
                if (this.invoice.receiverEmail === '') {
                    this.$Message.error('邮箱为空，请先输入邮箱地址！');
                    this.$refs.email.focus();
                    return false;
                }
                return true;
            },
            invoiceSave() {
                if (this.verificationInvoice()) {
                    this.$Message.success('发票信息填写成功！');
                    this.invoiceMdl = false;
                    this.$emit('updateInvoiceInfo', this.invoice);
                }
            },
            getPrice() {
                const {pricePay} = AppBase.session;
                this.invoice.invoicePrice = pricePay;
            }
        }, created() {
            const {user_info} = AppBase.local;
            if (user_info) {
                let userInfo = JSON.parse(user_info);
                this.invoice.receiverName = userInfo.realName;
                this.invoice.receiverPhone = userInfo.phone;
                this.invoice.receiverEmail = userInfo.email;
            }
            this.getPrice();
        },
        watch: {
            'invoiceMdl': function () {
                this.getPrice();
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .invoice-form {
        padding: 34px 30px;
    }

    .invoice-form .item {
        text-align: left;
        margin-bottom: 20px;
    }

    .invoice-form .item .label {
        color: #171A1A;
        line-height: 17px;
        letter-spacing: 2px;
        display: inline-block;
        margin-right: 10px;
        vertical-align: top;
    }

    .invoice-form .item .value {
        color: #6C6F70;
    }

    .invoice-form .item .value.money {
        color: #171A1A;
    }

    .invoice-form .item .input input {
        border: 1px solid #F2F4F5;
        border-radius: 4px;
        height: 32px;
        padding: 0 16px;
        width: 100%;
    }

    .invoice-form .item .input {
        position: relative;
        display: inline-block;
        width: 300px;
    }

    .invoice-form .item .input .icon-close {
        color: #A2A2A8;
        font-size: 12px;
        position: absolute;
        right: 20px;
        top: 8px;
    }

    .invoice-form .item .type-tabs {
        margin-bottom: 8px;
    }

    .invoice-form .item .type-tabs span {
        display: inline-block;
        width: 34px;
        cursor: pointer;
    }

    .invoice-form .item .type-tabs span:first-child {
        margin-right: 16px;
    }

    .invoice-form .item .type-tabs span.active {
        color: #308697;
        border-bottom: 1px solid #308697;
    }

    .invoice-form .invoice-state {
        font-size: 12px;
        color: #A2A2A8;
        text-align: left;
        margin-bottom: 48px;
        margin-top: 8px;
    }

    .invoice-form .invoice-state span {
        display: inline-block;
        vertical-align: top;
        margin-right: 16px;
    }

    .invoice-form .invoice-state div {
        display: inline-block;
    }

    .invoice-form .oper-btn button:first-child {
        margin-right: 16px;
    }

    .invoice-div p:first-child {
        font-size: 12px;
        color: #6C6F70;
    }

    .invoice-div p:nth-child(2) .checkbox {
        vertical-align: top;
    }

    .invoice-div p:nth-child(2) .invoice-info {
        display: inline-block;

    }

    .invoice-div p:nth-child(2) .invoice-info span {
        display: inline-block;
        margin-left: 36px;
        font-size: 14px;
        color: #6C6F70;
    }

    .invoice-div p:nth-child(2) button {
        margin-left: 46px;
        line-height: 19px;
        vertical-align: top;
    }

    .invoice-div p:nth-child(2) button:hover {
        color: #E14B5D;
    }

    .invoice-div p:nth-child(2) .checkbox {
        font-size: 14px;
    }

    .invoice-div p:nth-child(2) {
        margin: 4px 0 32px;
    }

    .oper-btn {
        > button {
            width: 145px;
        }
    }
</style>
