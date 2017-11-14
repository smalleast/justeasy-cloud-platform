<template>
    <section class="stages">
        <article class="stages-title">{{stepTitle}}</article>
        <article class="stages-steps">
            <div class="steps-icon">
                <div class="step num" :class="{'active':(step>1),'active current':(step===1)}">1</div>
                <div class="step bar" :class="{'active':(step===2||step>2)}"></div>
                <div class="step num" :class="{'active':(step>2),'active current':(step===2)}">2</div>
                <div class="step bar" :class="{'active':(step===3||step>3)}"></div>
                <div class="step num" :class="{'active':(step>3),'active current':(step===3)}">3</div>
            </div>
            <div class="steps-text">
                <div class="step" :class="{'active':(step===1)}">
                    1、确认信息，提交订单
                </div>
                <div class="step" :class="{'active':(step===2)}">
                    <p>2、支付生产备货金，生产商品</p>
                    <p>{{stepPrice2 | currency('¥', '2')}}</p>
                </div>
                <div class="step" :class="{'active':(step===3)}">
                    <p>3、支付货款，运输安装</p>
                    <p>{{stepPrice3 | currency('¥', '2')}}</p>
                </div>
            </div>
        </article>

    </section>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            step: {
                type: Number,
                default: 1
            },
            stepPrice2: {
                type: Number,
                default: 0
            },
            stepPrice3: {
                type: Number,
                default: 0
            },
            stepTitle: {
                type: String,
                default: '确认订单'
            }
        },
        watch: {}
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .stages {
        height: 140px;
        position: relative;
        margin-top: 42px;
        &-title {
            float: left;
            width: 350px;
            height: 136px;
            font-size: 32px;
            color: #308697;
        }
        &-steps {
            float: left;
            width: 740px;
            height: 136px;
            .steps {
                &-icon {
                    .step {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: -5px;
                        &.num {
                            background: #DCE0E0;
                            width: 40px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            border-radius: 50%;
                            font-size: 18px;
                            color: #6C6F70;
                            position: relative;
                            z-index: 2;
                        }
                        &.bar {
                            width: 196px;
                            height: 12px;
                            background: #DCE0E0;
                            position: relative;
                            z-index: 1;
                        }
                        &.active {
                            background: #308697;
                            color: #FFFFFF;
                        }
                        &.current {
                            width: 64px;
                            height: 64px;
                            line-height: 64px;
                            font-size: 32px;
                        }
                    }
                }
                &-text {
                    margin-top: 24px;
                    .step {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: -4px;
                        font-size: 14px;
                        color: #00002E;
                        line-height: 17px;

                        text-align: left;
                        &:nth-child(1) {
                            width: 236px;

                        }
                        &:nth-child(2) {
                            width: 236px;
                        }
                        &:nth-child(3) {
                            width: 170px;
                        }
                        &.active {
                            color: #308697;
                        }
                    }
                }
            }

        }
    }
</style>