<template>
    <div>
        <div class="orders order-confirm">
           <!-- <orderStages :step="step" stepTitle="确认订单"></orderStages>
            <div class="confirm-info">
                <div class="info-title">订单信息</div>
                <div class="info-msg">
                    <div class="text">
                        <div class="left">甲方：{{userInfo.realName}}</div>
                        <div class="right">
                            <a class="right-protocol underline"
                               href="/protocol/user"
                               target="_blank">查看《住逻辑用户协议》</a>
                        </div>
                    </div>
                    <div class="text">
                        <div class="left">手机号：{{userInfo.phone}}</div>
                    </div>
                    <div class="text">
                        乙方：斑斓供应链管理（上海）有限公司
                    </div>
                </div>
                <div class="info-address">
                    <infoTag text="收货信息"></infoTag>
                    <confirmAddress ref="confirmAddress"></confirmAddress>

                </div>
                <div class="info-product">
                    <infoTag text="商品信息"></infoTag>
                    <table class="info-product-table">
                        <tr class="th">
                            <td>产品</td>
                            <td></td>
                            <td>规格</td>
                            <td>价格</td>
                            <td>数量</td>
                            <td>实付</td>
                        </tr>
                        <tr class="td" :key="index" v-for="(item,index) in products">
                            <td>
                                <div class="info-product-table-cover">
                                    <VA size="98px" radius="0" className="cover-key"
                                               :url="imgBaseUrl+item.coverFile.key"></VA>
                                </div>
                            </td>
                            <td>
                                <p class="p-name">{{item.name}}</p>
                                <p>{{item.code}}</p>
                            </td>
                            <td>
                                <p>颜色:{{item.spec.color}}</p>
                                <p>尺寸:{{item.spec.size}}</p>
                                <p>材质:{{item.spec.material}}</p>
                                <p>备注:{{item.remark || '暂无备注'}}</p>
                            </td>
                            <td>
                                {{item.spec.quotedPrice | currency('¥', '2')}}
                            </td>
                            <td>{{item.num}}</td>
                            <td>{{item.total | currency('¥', '2')}}</td>
                        </tr>
                    </table>
                    <div class="info-product-price">
                        <div class="left">
                            <span class="timer-left">交付周期</span>
                            <Select class="timer-select" v-model="currentCycle"
                                    @on-change="onCycle">
                                <Option :key="index" v-for="(item,index) in cycle" :value="item.discount"> {{item.name}}                            </Option>
                            </Select>
                            <span class="timer-desc red">{{cycleDesc}}</span>
                        </div>
                        <div class="right price">
                            <p>
                                <span>总金额： </span> <span
                                    class="sum-price black">{{priceSum | currency('¥', '2')}}</span>
                            </p>
                            <p>
                                <span>{{((priceSum - pricePay) >= 0) ? '共优惠：' : '共加价：'}} </span>
                                <span
                                        class="sum-price red">{{(((priceSum - pricePay) >=0) ? (priceSum - pricePay) : (pricePay - priceSum)) | currency('¥', '2')}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="info-invoice">
                    <confirmInvoice ref="confirmInvoice"></confirmInvoice>
                </div>
                <div class="info-protocol">
                    <div class="left">
                        <my-checkbox label="同意" id-name="protocol" @change="changeAgreeProtocolSel"
                                     :selected="true"></my-checkbox>
                        <a href="/protocol/user" target="_blank" class="a-protocol">《住逻辑用户协议》</a>
                    </div>
                    <div class="right price">
                        <span>应付金额：</span> <span class="sum-price red bold">{{pricePay | currency('¥', '2')}} </span>
                    </div>
                </div>
                <div class="info-button">
                    <button class="info-button-save red-btn" :disabled="!hasDisabled" @click="addOrders">提交订单</button>
                </div>
            </div>-->
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .order-confirm {
        .confirm {
            &-info {
                width: 1200px;
                background: #fff;
                .info {
                    &-title {
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        background: #99C72C;
                        color: #fff;
                        font-size: 18px;
                        text-indent: 34px;
                    }
                    &-msg {
                        width: 1120px;
                        height: 108px;
                        background: #F7F9FA;
                        border-radius: 4px;
                        margin: 40px;
                        padding: 22px;
                        .text {
                            width: 100%;
                            display: inline-block;
                            font-size: 12px;
                            color: #353838;
                            line-height: 18px;
                            > .left {
                                float: left;
                                text-align: left;
                            }
                            > .center {
                                float: left;
                                margin-left: 200px;
                                &:after {
                                    content: '';
                                    clear: left;
                                }
                            }
                            > .right {
                                float: right;
                                text-align: right;
                                font-size: 14px;
                                color: #308697;
                                &:after {
                                    content: '';
                                    clear: left;
                                }
                            }
                        }
                    }
                    &-address {
                        height: 370px;

                    }
                    &-product {
                        &-table {
                            width: 100%;
                            collapse: 0;
                            border: 0;
                            font-size: 12px;
                            color: #555555;
                            &-cover {
                                width: 98px;
                                height: 98px;
                                background: #F5F5F5;
                                border-radius: 4px;
                                margin: auto;
                            }
                            td {
                                text-align: left;
                                &:nth-child(1) {
                                    width: 140px;
                                    text-align: center;
                                    font-size: 0;
                                }
                                &:nth-child(2) {
                                    width: 220px;
                                }
                                &:nth-child(3) {
                                    width: 400px;
                                }
                                &:nth-child(4) {
                                    width: 100px;
                                    text-align: center;
                                }
                                &:nth-child(5) {
                                    width: 100px;
                                    text-align: center;
                                }
                                &:nth-child(6) {
                                    width: 240px;
                                    text-align: center;
                                }
                            }
                            .th {
                                font-size: 14px;
                                color: #308697;
                                > td {
                                    line-height: 44px;
                                }
                            }
                            .td {
                                td {
                                    height: 120px;
                                    border-top: 1px solid #F2F4F5;

                                }
                            }
                            .td, p {
                                font-size: 12px;
                                color: #555555;
                            }
                            .p-name {
                                width: 180px;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }
                        &-price {
                            height: 136px;
                            border-top: 1px solid #DCE0E0;
                            > .left {
                                float: left;
                                line-height: 68px;
                                .timer {
                                    &-left {
                                        width: 84px;
                                        font-size: 14px;
                                        color: #353838;
                                        margin-left: 22px;
                                    }
                                    &-select {
                                        width: 120px;
                                        height: 28px;
                                        margin-left: 22px;
                                        margin-right: 10px;
                                    }
                                    &-desc {
                                        font-size: 14px;
                                    }
                                }
                                &:after {
                                    content: '';
                                    clear: right;
                                }
                            }
                            > .right {
                                float: right;
                                p {
                                    &:nth-child(1) {
                                        line-height: 68px;
                                    }
                                }
                            }
                        }
                    }
                    &-invoice {
                        height: 120px;
                        margin-left: 20px;
                        margin-right: 20px;
                        padding-top: 30px;
                        border-top: 1px dashed #DCE0E0;

                    }
                    &-protocol {
                        height: 44px;
                        > .left {
                            float: left;
                            color: #308697;
                            margin-left: 22px;
                            .a-protocol {
                                font-size: 14px;
                                color: #308697;
                                letter-spacing: 0;
                                line-height: 18px;

                            }
                        }
                        > .right {
                            float: right;
                        }
                    }
                    &-button {
                        height: 140px;
                        &-save {
                            width: 145px;
                            float: right;
                            margin-right: 50px;
                        }
                        margin-bottom: 120px;
                    }
                }
                .price {
                    span {
                        font-size: 14px;
                        color: #555555;
                    }
                    .sum-price {
                        width: 186px;
                        font-size: 20px;
                        margin-left: 71px;
                        display: inline-block;
                    }
                    .black {
                        color: #353838;
                    }
                    .red {
                        color: #E14B5D;
                    }
                    .bold {
                        font-weight: bold;
                    }
                }
            }
        }
    }

    .cover-key {
        > img {
            object-fit: contain;
        }
    }

</style>
<style>
    .orders > .info .base-info p .right-protocol {
        font-size: 14px;
        color: #308697;
        float: right;
    }

    .ivu-select-single .ivu-select-selection {
        max-height: 100%;
    }

    .orders {
        width: 1200px;
        margin: 0 auto;
    }

    .orders .left-info {
        float: left;
    }

    .orders .right-info, .orders .right-oper {
        float: right;
    }

    .orders > .info {
        background: #fff;
    }

    .orders > .info > .title {
        background: #99C72C;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        padding-left: 34px;
    }

    .orders > .info .base-info {
        background: #F7F9FA;
        border-radius: 4px;
        margin: 40px 40px 30px;
        padding: 20px;
    }

    .orders > .info .base-info p {
        margin-bottom: 6px;
    }

    .orders > .info.base-info p:last-child {
        margin-bottom: 0;
    }

    .orders > .info .base-info .phone {
    }

    .orders > .info .product-info {
        position: relative;
    }

    .orders > .info .label-title {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #DCE0E0;
        border-radius: 4px;
        width: 84px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        left: -12px;
        color: #308697;
        text-align: center;
        padding-left: 10px;
    }

    .orders > .info .label-title:before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #308697;
        top: 12px;
        left: 8px;
    }

    .orders > .info .product-info {
        max-height: 1106px;
    }

    .orders > .info .product-info .list-header {
        padding-top: 50px;
    }

    .orders > .info .product-info .list-header .row .col {
        font-size: 14px;
        color: #308697;
    }

    .orders > .info .product-info .row {
        overflow: hidden;
        margin-bottom: 20px;
    }

    .orders > .info .product-info .row .product.col {
        width: 380px;
        margin-left: 15px;
    }

    .orders > .info .product-info .row .product.col .product-info {
        width: 108px;
    }

    .orders > .info .product-info .row .spec.col {
        width: 248px;
    }

    .orders > .info .product-info .row .custom.col {
        width: 190px;
    }

    .orders > .info .product-info .row .quoted.col {
        width: 158px;
    }

    .orders > .info .product-info .row .number.col {
        width: 158px;
    }

    .orders > .info .product-info .row .total.col {
        width: 100px;
    }

    .orders > .info .product-info .row .col {
        padding: 0 10px;
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
        color: #555;
    }

    .orders > .info .product-info .row .col > div {
        vertical-align: middle;
    }

    .orders > .info .product-info .product .product-info {
        display: inline-block;
        margin-left: 20px;
    }

    .orders > .info .product-info .col .product-img {
        width: 98px;
        height: 98px;
        line-height: 98px;
        display: inline-block;
        text-align: center;
    }

    .orders > .info .product-info .col .product-img img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
    }

    .orders > .info .footer {
        border-top: 2px solid #DCE0E0;
        height: 320px;
        margin-bottom: 120px;
        padding: 30px 20px;
    }

    .orders > .info .footer .left-info .fee-div .pay-info {
        display: inline-block;
        width: 256px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #353838;
        border-radius: 4px;
        font-size: 14px;
        color: #353838;
        text-align: center;
        background: #fff;
        margin-right: 10px;
    }

    .orders > .info .footer .left-info .fee-div p:last-child {
        font-size: 14px;
        color: #308697;
        margin-top: 10px;
    }

    .orders > .info .footer .right-oper {
        margin-right: 50px;
        margin-top: 10px;
    }

    .orders > .info .footer .right-oper button {
        width: 145px;
        float: right;
    }

    .orders > .info .footer .right-oper p {
        margin-bottom: 20px;
        font-size: 14px;
    }

    .orders > .info .footer .right-oper p span {
        display: inline-block;
        font-weight: bold;
        font-size: 20px;
        margin-left: 74px;
    }

    .orders > .info .fee-info {
        padding: 24px 22px;
    }

    .orders > .info .fee-info span {
        font-size: 14px;
    }

    .orders > .info .fee-info > div {
        display: inline-block;
    }

    .orders > .info .fee-info .timer-select {
        width: 120px;
        height: 28px;
        margin-left: 26px;
        margin-right: 26px;
    }

    .orders > .info .fee-info span.red-font {
        display: inline-block;
        margin-left: 18px;
    }

    .orders > .info .fee-info .total-info {
        float: right;
        margin-right: 50px;
    }

    .orders > .info .fee-info .total-info span:last-child {
        font-size: 20px;
        color: #353838;
        display: inline-block;
        margin-left: 70px;
    }
</style>
<script>
    import {AppBase,VA,myCheckbox,orderStages} from 'components/vue/index';
    import confirmAddress from './confirm/address.vue';
    import confirmInvoice from './confirm/invoice.vue';
   import infoTag from './confirm/info-tag.vue';

    export default {
        data() {
            return {
                imgBaseUrl: '',
                userInfo: {},
                currentCycle: 1,
                currentCycleId: 1,
                cycle: [],
                cycleDesc: '',
                percent: 0,
                products: [],
                priceSum: 0,
                pricePay: 0,
                hasDisabled: true,
                step: 1
            };
        },
        components: {
           confirmAddress,
            confirmInvoice,
            myCheckbox,
            infoTag,
            VA,
            orderStages
        },
        methods: {
            changeAgreeProtocolSel(inV) {
                console.log('inV:', inV);
                this.hasDisabled = inV;
            }, clear(e, key) {
                e.target.previousElementSibling.focus();
                this.user[key] = '';
            }, getUserInfo() {
                api.account.getProfile().then((res) => {
                    this.userInfo = res;
                    AppBase.local = {user_info: this.userInfo};
                });
            }, getCycle() {
                const {zhulogic_order_itemids} = AppBase.local;

                api.orders.getCycle().then((res) => {
                    this.cycle = res || [];
                    let cycleList = [];
                    let cId = JSON.parse(zhulogic_order_itemids)[0].cycleId;
                    if (cId) {
                        cycleList = this.cycle.filter(item => item.id === cId);
                    }
                    if (cycleList.length === 0) {
                        cycleList = this.cycle.filter(item => !!item.isDefault);
                    }
                    this.currentCycle = cycleList[0].discount;
                    this.cycleDesc = cycleList[0].describe;
                    this.currentCycleId = cycleList[0].id;

                });
            }, onCycle(inItem) {
                this.percent = inItem;
                this.pricePay = this.priceSum * this.percent;
                let cycleObj = this.cycle.filter(item => item.discount === this.percent)[0];
                this.cycleDesc = cycleObj.describe;
                this.currentCycleId = cycleObj.id;
            }, verification(order_address_id) {
                if (!order_address_id) {
                    this.$Message.error({title: '操作提示', content: '收货地址为空，请先输入收货地址！'});
                    this.$refs.confirmAddress.setAddressFocus();
                    return false;
                }
                if (!this.pricePay) {
                    this.$Message.error({title: '操作提示', content: '订单金额必须大于零！'});
                    return false;
                }
                return true;
            }, addOrders() {
                const {zhulogic_order_itemids} = AppBase.local;
                let order_address_id = this.$refs.confirmAddress.currentAddress.id;
                let order_invoice = this.$refs.confirmInvoice.invoice;
                if (this.verification(order_address_id)) {
                    let orderParam = {
                        "addressId": order_address_id,
                        "comment": "",
                        "orderInvoiceRequestVO": {
                            "companyName": order_invoice.companyName,
                            "identityCode": order_invoice.identityCode,
                            "invoicePrice": order_invoice.invoicePrice || this.pricePay,
                            "receiverEmail": order_invoice.receiverEmail,
                            "receiverName": order_invoice.receiverName,
                            "receiverPhone": order_invoice.receiverPhone
                        },
                        "orderItemsVOList": JSON.parse(zhulogic_order_itemids),
                        "orderName": "",
                        "plannedCompletionId": this.currentCycleId,
                        "userId": ''
                    };
                    api.orders.addOrders(orderParam).then((res) => {
                        this.$router.push({path: '/my/order/detail/' + res});
                    });
                }
            }, getProducts() {
                const {zhulogic_order_itemids} = AppBase.local;
                let listStr = '';
                zhulogic_order_itemids && JSON.parse(zhulogic_order_itemids).map((item) => {
                    if (listStr === '') {
                        listStr = item.productSpecId;
                    } else {
                        listStr += ',' + item.productSpecId;
                    }
                });
                let detailedItems = {productSpecIds: listStr};
                api.detailedLists.getConfirmProducts(detailedItems).then((res) => {
                    this.products = res;
                    this.priceSum = 0;
                    this.products && this.products.map((item) => {
                        zhulogic_order_itemids && JSON.parse(zhulogic_order_itemids).map((childItem) => {
                            if (item.spec.id === childItem.productSpecId) {
                                item.num = childItem.num;
                                item.total = childItem.num * item.spec.quotedPrice;
                            }
                        });
                        this.priceSum += item.total;
                        return item;
                    });
                    this.pricePay = this.priceSum * this.currentCycle;
                });
            }
       }, created() {
          // this.getUserInfo();
         //   this.getCycle();
          //  this.getProducts();
        }, watch: {
            'pricePay': function (item) {
                AppBase.session = {pricePay: item};
                this.$refs.confirmInvoice.getPrice();
            },
            'currentCycleId': function (item) {
                console.log('cid:', this.currentCycleId);
            }
        }
    };
</script>
