<template>
    <Modal v-model="contactMdl" width="320" class-name="vertical-center-modal no-padding">
        <div class="close-btn" slot="close">
            <i class="iconfont icon-pop-close"></i>
        </div>
        <div class="contact-cont">
            <i class="iconfont icon-Customerservice"></i>
            <p class="text">联系住逻辑客服</p>
            <p class="phone">请拨打电话：400-998-0137</p>
            <p class="time">服务时间：9:00-18:00</p>
        </div>
    </Modal>
</template>
<script>
    export default{
        data(){
            return {
                contactMdl:false
            }
        },
        methods:{
            open(){
                this.contactMdl = true;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .contact-cont{
        padding:68px 68px;
        i{
            font-size:44px;
            color:#308697;
        }
        .text{
            font-size: 12px;
            color: #308697;
            letter-spacing: 0;
            text-align:center;
        }
        .phone{
            font-size: 14px;
            color: #353838;
            letter-spacing: 0;
            text-align:center;
            margin-top:16px;
        }
        .time{
            font-size: 12px;
            color: #6C6F70;
            letter-spacing: 0;
            text-align:center;
            margin-top:10px;
        }
    }
</style>
<style scoped>

    .contact-cont
    .contact-cont p.text{
        font-size: 12px;
        color:#308697;
        text-align:center;
    }
    .contact-cont p.phone{
        font-size: 14px;
        color: #353838;
        text-align:center;
        margin-top:16px;
    }
</style>