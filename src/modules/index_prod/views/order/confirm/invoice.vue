<template>
    <div class="invoice-div">
        <div style="border: 1px solid transparent;"><i class="iconfont icon-invoice"></i>发票信息：</div>
        <div class="invoice-row">
            <div class="invoice-col cursor invoice-title" @click="checkInvoice">
                    <span class="check">
                        <i class="iconfont icon-hook gou" v-if="hasInvoice"></i>
                    </span>
                我要开发票
            </div>
            <div class="invoice-col invoice-desc" v-if="hasInvoice">
                <span>类型：纸质发票</span>
                <span>抬头：{{invoice.titleType ? '个人' : '单位'}}</span>
                <span>发票金额：{{invoice.invoicePrice | currency('¥', '2')}}</span>
                <span class="inv-code"
                      v-if="!invoice.titleType&&invoice.identityCode">纳税人识别号：{{invoice.identityCode}}</span>
            </div>
            <div class="invoice-col" v-if="hasInvoice">
                <button class="invoice-update red-font" @click="editInvoice">修改</button>
            </div>
        </div>
        <invoiceModel ref="invoiceModel" v-on:updateInvoiceInfo="updateInvoiceInfo"></invoiceModel>
    </div>
</template>
<script>
    import {AppBase,myCheckbox} from 'components/vue/index';
    import invoiceModel from './invoice-model.vue';

    export default {
        data() {
            return {
                hasInvoice: false,
                invoice: {
                    titleType: true,//true:personal false:company
                    receiverName: '',
                    companyName: '',
                    identityCode: '',
                    invoicePrice: '0',
                    receiverPhone: '',
                    receiverEmail: ''
                },
                hasSave: false
            };
        },
        components: {
            invoiceModel,
            myCheckbox
        },
        methods: {
            editInvoice() {
                if (this.hasInvoice) {
                    this.$refs.invoiceModel.invoiceMdl = true;
                }
            },
            updateInvoiceInfo(inItem) {
                this.invoice = inItem;
                this.hasInvoice = true;
                this.hasSave = true;
            },
            checkInvoice() {
                this.getPrice();
                if (!this.hasSave) {
                    this.$refs.invoiceModel.invoiceMdl = true;
                } else {
                    this.hasInvoice = !this.hasInvoice;
                }
            },
            getPrice() {
                const {pricePay} = AppBase.session;
                this.invoice.invoicePrice = pricePay;
            }
        },
        created() {
            this.getPrice();
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .invoice-div {
        height: 90px;
        box-sizing: content-box;
        .invoice-row {
            clear: both;
            .invoice-col {
                float: left;
                margin-right: 20px;

            }
        }
        .invoice-desc {
            color: #6C6F70;
            font-size: 14px;
            > span {
                margin-left: 38px;
            }
        }
        .invoice-update {
            height: 30px;
            line-height: 30px;
            position: relative;
            margin-left: 40px;
            top: -5px;
            background: transparent;
            &:after {
                content: '';
                position: absolute;
                left: -10px;
                top: -10px;
                right: -10px;
                bottom: -10px;
            }
        }
    }

    .icon-invoice {
        font-size: 12px;
        display: inline-block;
        margin-right: 8px;
        color: #6C6F70;
        margin-bottom: 5px;
    }

    .inv-code {
        display: block;
        margin-top: 5px;
    }

    .check {
        width: 16px;
        height: 16px;
        border: 1px solid #6c6f70;
        position: relative;
        display: inline-block;
        margin: -3px 5px -3px 0px;
        .gou {
            font-size: 12px;
            -webkit-transform: scale(0.7);
            transform: scale(0.7);
            position: absolute;
            top: 2px;
            left: -1px;
            height: auto;
            line-height: 12px;
            color: #E14B5D;
        }
    }

    .cursor {
        cursor: pointer;
    }

    .invoice-title {
        color: #353838;
        font-size: 14px;
    }
</style>
