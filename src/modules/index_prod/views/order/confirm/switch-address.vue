<template>
    <Modal v-model="openSpecMdl" width="640" class-name="vertical-center-modal no-padding">
        <div slot="header" class="title">选择地址</div>
        <div class="close-btn" slot="close">
            <i class="iconfont icon-pop-close"></i>
        </div>
        <div class="content">
            <div class="item" v-for="item in addresses" @click="onCheckbox(item)">
                <div class="img">
                    <i class="iconfont icon-coordinate"></i>
                </div>
                <div class="info">
                    <p><span class="label">收货人：</span><span class="value">{{item.userName}}</span></p>
                    <p><span class="label">联系方式：</span><span class="value">{{item.userMobile}}</span></p>
                    <p><span class="label">详细地址：</span><span class="value">{{item.detailAddress | fullAddress}}</span>
                    </p>
                </div>
                <div class="checkbox">
                    <i class="icon" :class="{'active':selectedItem.id == item.id}"></i>
                </div>
            </div>
        </div>
        <div class="footer">
            <button class="cancel-btn" @click="cancel">取消</button>
            <button class="main-btn" @click="submit">确 认</button>
        </div>
    </Modal>
</template>
<style rel="stylesheet/scss" lang="scss">
    .cancel-btn {
        margin-right: 10px;
    }
</style>
<style scoped>
    .content {
        padding: 0 20px;
    }

    .item {
        border-bottom: 2px solid #F2F4F5;
        overflow: hidden;
        text-align: left;
        cursor: pointer;
    }

    .item > div {
        display: inline-block;
        vertical-align: middle;
    }

    .item .img {
        width: 28px;
        height: 28px;
        line-height: 28px;
        margin-right: 20px;
    }

    .item .img i {
        font-size: 28px;
        color: #A2A2A8;
    }

    .item .info {
        width: 440px;
        margin-left: -4px;
        padding: 16px 0;
    }

    .item .info p {
        font-size: 12px;
        color: #555555;
        margin-bottom: 10px;
        text-align: left;
        line-height: 12px;
    }

    .item .info p .label {
        color: #6C6F70;
        display: inline-block;
        margin-right: 8px;
    }

    .item .checkbox {
        width: 64px;
        margin-left: -4px;
    }

    .item .checkbox i {
        vertical-align: middle;
        display: block;
        width: 20px;
        height: 20px;
        margin: 0 auto;
        border: 2px solid #A2A2A8;
        border-radius: 50%;
    }

    .item .checkbox i.active {
        background: #308697;
        border: 2px solid #308697;
    }

    .footer {
        padding: 30px 0;
        text-align: center;
    }

    .footer button {
        width: 145px;
    }
</style>
<style>
    .no-padding .ivu-modal-header {
        padding: 0;
        text-align: left;
    }

    .no-padding .ivu-modal-body {
        padding: 0;
    }
</style>
<script>

    export default {
        data() {
            return {
                openSpecMdl: false,
                selectedItem: {},
                addresses: [],
                topId:''
            };
        },
        methods: {
            onCheckbox(inItem) {
                this.selectedItem = inItem;
            },
            submit() {
                this.openSpecMdl = false;
                this.$emit('submit', this.selectedItem);
            },
            cancel() {
                this.openSpecMdl = false;
            },
            deleteAddress() {
                api.address.deleteAddress(this.selectedItem.id).then((res) => {
                    console.log('删除成功：', res);
                    this.getAddress();
                });
            },
            open(inId) {
                this.openSpecMdl = true;
                this.topId=inId;
                this.getAddress();
            },
            getAddress() {
                api.address.getAddress().then((res) => {
                    this.addresses = res.list;
                    this.selectedItem = this.addresses.filter(item => item.id === this.topId)[0];
                    if(!this.selectedItem)
                    {
                        this.selectedItem=this.addresses[0];
                    }
                });
            }
        },
        filters: {
            fullAddress: (inValue) => {
                return inValue.replace('[$]', '');
            }
        }
    };
</script>
