<template>
  <div class="order-detail">
    <loading v-if="busy" style="margin-top:60px;"></loading>
    <div v-else>
      <div v-if="no_result" class="no-result bg-grey">
        <img :src="NullImg" alt="">
        <p>抱歉，你查看的订单不存在，或已删除！</p>
      </div>
      <div v-else style="margin-bottom:20px;">
        <div class="orders">
          <orderStages :step="step" stepTitle="订单详情" :stepPrice2="order.paidAmount"
                       :stepPrice3="order.finalPay"></orderStages>
          <div class="info">
            <div class="title">订单号{{order.code}}</div>
            <div class="right-protocol">
            </div>
            <div class="base-info">
              <div class="left-info">
                <p class="detail-title">订单信息：</p>
                <p>
                  <span>甲方：{{order.customer }}</span>
                  <span class="right-span">手机号：{{order.ownerPhone}}</span>
                </p>
                <p>乙方：斑斓供应链管理（上海）有限公司</p>
                <p>商品合计：{{order.totalPrice | currency('¥', '2')}}</p>
                <div v-if="order.stateId>100&&order.stateId<600">
                  <div style="float:left;">已支付：</div>
                  <div class="red" style="display: inline-block;">
                    <div v-if="order.stateId>100">
                      {{order.finalPay | currency('¥', '2')}}（定金）
                    </div>
                    <div v-if="order.stateId>200">{{order.finalPay | currency('¥', '2')}}（尾款）</div>
                  </div>
                </div>
              </div>
              <div class="left-info">
                <div class="address">
                  <p class="detail-title">收货信息：</p>
                  <p>收货人：{{order.realName}}</p>
                  <p>联系方式：{{order.phoneNum}}</p>
                  <p>详细地址：{{order.address}}</p>
                  <p class="down" v-if="attachmentFileList.length>0"
                     @click="faileDownHandle(attachmentFileList)">
                    <i class="iconfont icon-enclosure"></i>
                    <span>清单源文件下载</span>
                  </p>
                </div>
                <div class="fee">
                  <div
                    v-if="order.orderInvoiceResponseVO&&(order.orderInvoiceResponseVO.companyName||order.orderInvoiceResponseVO.receiverName)">
                    <p class="fee-title">发票信息：</p>
                    <div>纸质发票
                      <span v-if="order.orderInvoiceResponseVO&&order.orderInvoiceResponseVO.companyName">
                                            ,{{order.orderInvoiceResponseVO.companyName}}
                                        </span>
                      <span v-else-if="order.orderInvoiceResponseVO&&order.orderInvoiceResponseVO.receiverName">
                                            ,{{order.orderInvoiceResponseVO.receiverName}}
                                        </span>
                    </div>
                    <div>
                                            <span
                                              v-if="order.orderInvoiceResponseVO&&order.orderInvoiceResponseVO.receiverPhone">
                                                {{order.orderInvoiceResponseVO.receiverPhone}}
                                            </span>
                      <span v-if="order.orderInvoiceResponseVO">
                                                ,金额{{order.orderInvoiceResponseVO.invoicePrice | currency('¥', '2')}}
                                            </span>
                      <span v-if="order.orderInvoiceResponseVO&&order.orderInvoiceResponseVO.identityCode">
                                                ,纳税人识别号{{order.orderInvoiceResponseVO.identityCode}}
                                            </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section id="tabs" :class="{'tabs':tabsHide,'tabs1':!tabsHide}">
              <Tabs value="name1" @on-click="onTabPane">
                <TabPane label="订单日志" name="name1">
                  <div class="order-timeline">
                    <div class="title">
                      <p class="log-title" v-for="(item,index) in diaryList" :key="index"
                         v-if="index===diaryList.length-1">
                        {{item.show_time | toYear}} {{item.content}}</p>
                      <button class="text-btn" @click="openContactMdl">
                        <i class="iconfont icon-Customerservice" style="font-size:22px;"></i>
                        联系客服
                      </button>
                    </div>
                    <div class="log">
                      <section class="t-items" v-for="(item,index) in diaryList" :key="index">
                        <div class="timeline-item" v-if="item.status===0">
                          <div class="time">
                            <span class="year">{{item.show_time | toYear}}</span>
                            <span class="week">{{item.show_time | toWeek}}</span>
                          </div>
                          <div class="shape">
                            <div class="circle" :class="{lv:index===diaryList.length-1}">
                            </div>
                            <div class="bar">

                            </div>
                          </div>
                          <div class="info">
                            {{item.content}}
                          </div>
                        </div>
                        <div class="timeline-item blue" v-if="item.status==1||item.status==3">
                          <div class="time">
                            <span class="year">{{item.show_time | toYear}}</span>
                            <span class="week">{{item.show_time | toWeek}}</span>
                          </div>
                          <div class="shape">
                            <div class="circle" :class="{lv:index===0}">
                            </div>
                            <div class="bar">

                            </div>
                          </div>
                          <div class="info">
                            {{item.content}}
                            <span class="green-circle" @click="onRule">?</span>
                          </div>
                        </div>
                        <div class="timeline-item red"
                             v-if="item.status==2||item.status==4">
                          <div class="time">
                            <span class="year">{{item.show_time | toYear}}</span>
                            <span class="week">{{item.show_time | toWeek}}</span>
                          </div>
                          <div class="shape">
                            <div class="circle" :class="{lv:index===0}">
                            </div>
                            <div class="bar">

                            </div>
                          </div>
                          <div class="info">
                            {{item.content}}
                            <button class="red-btn" @click="openPayMdl(2)"
                                    v-if="order.paymentStatus==1&&item.status==2&&item.orign_type=='b'">
                              支付差价
                            </button>
                            <button class="main-btn"
                                    @click="updateCertificate(order.paymentStatus==2?1:2)"
                                    v-if="item.status===4&&!item.confirmed">修改凭证
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </TabPane>
                <TabPane label="订单商品信息" name="name2">
                  <div id="product" class="product-info">
                    <div class="list-header bg-white">
                      <div class="row">
                        <div class="product col">
                          产品
                        </div>
                        <div class="spec col">
                          规格
                        </div>
                        <div class="quoted col">
                          价格
                        </div>
                        <div class="number col">
                          数量
                        </div>
                        <div class="total col">
                          实付
                        </div>
                      </div>
                    </div>
                    <div class="cont">
                      <div class="row" :key="index"
                           v-for="(item,index) in order.productDetailResponseVOList">
                        <div class="product col">
                          <div class="product-img">
                            <img v-if="item.coverFile" :src="imgBaseUrl+item.coverFile.key">
                          </div>
                          <div class="product-info">
                            <p>{{item.name}}</p>
                            <p>{{item.code}}</p>
                          </div>
                        </div>
                        <div class="spec col">
                          <p>颜色:{{item.color}}</p>
                          <p>尺寸:{{item.size}}</p>
                          <p>材质:{{item.material}}</p>
                          <p>备注:{{item.remark || '暂无备注'}}</p>
                        </div>
                        <div class="quoted col">
                          {{item.price | currency('¥', '2')}}
                        </div>
                        <div class="number col">
                          {{item.num}}
                        </div>
                        <div class="total col">
                          {{item.num * item.price | currency('¥', '2')}}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </section>
            <div style="background-color:#F7F9FA;" v-if="order.stateId<300">
              <div class="fee-info">
                <span>交付周期: </span>
                <span style="display:inline-block;margin-left:6px;">{{order.dimOrderCycle.name}}</span>
                <span class="red-font">{{order.dimOrderCycle.describe}}</span>
                <div class="total-info">
                  <span>总额： </span>
                  <span class="order-price">{{order.totalPrice | currency('¥', '2')}} </span>
                </div>
              </div>
              <div class="footer">
                <div class="left-info">
                  <div class="fee-div">
                    <p>
                                        <span class="pay-info" v-if="order.stateId<=100">
                                            本期支付内容：定金 (总额的 50%)
                                        </span>
                      <span class="pay-info" v-else>
                                             本期支付内容：货款 (总额的 50%)
                                        </span>
                      <a href="/protocol/user" target="_blank" class="green-circle">?</a>
                    </p>
                  </div>
                </div>
                <div class="right-oper">
                  <p>应付金额： <span
                    class="red order-price">{{order.paidAmount || 0 | currency('¥', '2')}} </span>
                  </p>
                  <button class="red-btn" @click="openPayMdl(1)" :disabled="order.paymentStatus !=0 ">
                    去付款
                  </button>
                </div>
              </div>
            </div>
            <div class="footer" v-if="order.paymentStatus === 0&&order.stateId === 300">
              <div class="right-oper">
                <button class="main-btn" @click="sureHandle(order.id)">确认收货</button>
              </div>
            </div>
          </div>
        </div>
        <contactBox ref="contactBox"></contactBox>
        <payBox ref="payBox"></payBox>
        <payAgio ref="payAgio"></payAgio>
        <Rule ref="Rule"></Rule>
        <dialog-com :dialInfo="diaInfo" @confirmSuc="getOrders"></dialog-com>
        <div style="height:80px;" v-if="order.stateId>300"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>

  .order-tabs {
    margin: 10px 0 25px;
    padding: 0 40px;
  }

  .order-tabs span {
    font-size: 14px;
    line-height: 32px;
    display: inline-block;
    color: #6C6F70;
  }

  .order-tabs span:last-child {
    margin-left: 14px;
  }

  .order-tabs span.active {
    color: #308697;
    border-bottom: 2px solid #308697;
  }

  .orders > .info .footer {
    height: 170px;
  }

  .orders > .info .footer .right-oper {
    margin-top: 14px;
  }

  .address .down {
    margin-top: 5px;
    font-size: 12px;
    cursor: pointer;
  }

  .address .down i {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: #308697;
  }

  .address .down span {
    color: #308697;
    margin-left: 5px;
  }
</style>
<script>
  import {AppBase, orderStages, contactBox, payBox, loading} from 'components/vue/index';
  import payAgio from './detail/pay-agio.vue';
  import Rule from './detail/rule.vue';
  import OrderNull from '../../../../assets/images/order_null.png';

  export default {
    data() {
      return {
        order: {},
        imgBaseUrl: '',
        products: [],
        diaryList: [{
          content: '订单已确认',
          show_time: new Date(),
          status: 0
        }],
        tabsHide: true,
        diaInfo: {
          title: '现在要取消订单？',
          modal1: false,
          width: 360,
          type: 3,
          closable: true,
          id: ''
        },
        attachmentFileList: [],
        no_result: false,
        busy: false,
        step: 1,
        NullImg: OrderNull
      };
    },
    components: {
      contactBox,
      payBox,
      payAgio,
      Rule,
      loading,
      orderStages
    },
    methods: {
      clear(e, key) {
        e.target.previousElementSibling.focus();
        this.user[key] = '';
      },
      openContactMdl() {
        //打开联系客服弹框
        this.$refs.contactBox.open();
      },
      openPayMdl(inType) {
        this.$refs.payBox.id = inType === 1 ? this.order.id : this.order.paymentId;
        this.$refs.payBox.type = inType || 1;
        this.$refs.payBox.open();
      },
      updateCertificate(type) {
        let params = {
          type: type,
          id: type === 1 ? this.order.id : this.order.paymentId
        };
        this.$router.push({name: 'certificateUpload', params: params});
      },
      getOrders() {
        this.busy = true;
        api.orders.getOrders(this.$route.params.id).then((res) => {
          this.busy = false;
          this.order = res;
          this.attachmentFileList = res.attachmentFileList;
          if (this.order.diaryList.length > 0) {
            this.diaryList = [];
            //倒序
            this.diaryList = this.order.diaryList.reverse();
          }
          this.setStep();
        }, (err) => {
          if (err.data.status_code === 400) {
            this.no_result = true;
          }
        });
      },
      openPayAgio(inValue) {
        this.$refs.payAgio.payPrice = inValue || 0;
        this.$refs.payAgio.open();
      },
      onRule() {
        this.$refs.Rule.open();
      },
      onTabPane(name) {
        if (name === 'name1') {
          this.tabsHide = true;
        } else {
          this.tabsHide = false;
        }
      },
      sureHandle(inId) {
        let _this = this;
        _this.diaInfo.modal1 = true;
        _this.diaInfo.title = '请确认你已经收到商品？'
        if (!inId) {
          return
        }
        _this.diaInfo.id = inId;
        _this.diaInfo.type = 5 //确认收货
      },
      setStep() {
        switch (this.order.stateId) {
          case 100:
            this.step = 2;
            break;
          case 200:
            this.step = 3;
            break;
          case 300:
            this.step = 4;
            break;
          case 400:
            this.step = 5;
            break;
          case 600:
            this.step = 0;
            break;
        }
      }
    },
    created() {
      //this.getOrders();
    },
    filters: {
      toYear: (inValue) => {
        let date = new Date(inValue);
        let y = date.getFullYear();
        let m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        let d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        return y + '-' + m + '-' + d;
      },
      toWeek: (inValue) => {
        let week = '';
        switch (new Date(inValue).getDay()) {
          case 0:
            week = '星期天';
            break;
          case 1:
            week = '星期一';
            break;
          case 2:
            week = '星期二';
            break;
          case 3:
            week = '星期三';
            break;
          case 4:
            week = '星期四';
            break;
          case 5:
            week = '星期五';
            break;
          case 6:
            week = '星期六';
            break;
        }
        return week;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .info {
    > .right-protocol {
      text-align: right;
      padding-right: 40px;
      margin: 15px 0 8px;
      > a {
        color: #A2A2A8;
      }
    }
    .base-info {
      overflow: hidden;
      > .left-info {
        width: 539px;
        .title {
          margin: 10px 0 14px;
          color: #6C6F70;
        }
        &:first-child {
        }
        &:last-child {
          padding-left: 86px;
          border-left: 2px solid #DCE0E0;

        }
        p {
          margin-bottom: 5px;
          .right-span {
            display: inline-block;
            margin-left: 200px;
          }
        }
        .fee {
          .title {
            margin-top: 16px;

          }

        }
      }
    }
  }

  #tabs {
    .ivu-tabs-bar {
      border-bottom: transparent;
      padding: 0px 40px 0px 40px;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active {
      color: #308697;
    }
    .ivu-tabs-ink-bar {
      background-color: #308697;
    }
    .ivu-tabs-tab:hover {
      color: #308697
    }
    .ivu-tabs-nav .ivu-tabs-tab:active {
      color: #308697
    }

  }

  .tabs1 {
    .ivu-tabs-tabpane {
      &:first-child {
        height: 1px;
      }
      &:last-child {
        height: auto;
      }
    }
  }

  .tabs {
    .ivu-tabs-tabpane {
      &:first-child {
        height: auto;
      }
      &:last-child {
        height: 1px;
      }
    }
  }

  .order-timeline {
    .t-items {
      .timeline-item {
        height: auto;

        & > div {
          display: inline-block;
          font-size: 14px;
          vertical-align: top;
          margin-top: -5px;
        }

        .time {
          width: 180px;
          span {
            font-size: 14px;
            display: inline-block;
            &:last-child {
              margin-left: 16px;
            }
          }
        }

        .shape {
          width: 130px;
          text-align: center;
          margin-top: 0;
          .circle {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #A2A2A8;
            margin: 0 auto;
            &.lv {
              position: relative;
              background: #99C72C;
              &:after {
                content: '';
                background: rgba(#99C72C, .52);
                position: absolute;
                top: -7px;
                right: -7px;
                bottom: -7px;
                left: -7px;
                border-radius: 100%;
              }
            }
          }
          .bar {
            width: 2px;
            height: 68px;
            background: #A2A2A8;
            margin: 0 auto;
          }
        }
        .info {
          button {
            width: 88px;
            height: 26px;
            line-height: 26px;
            border-radius: 4px;
            font-size: 12px;
            margin-left: 20px;
            margin-right: 20px;
          }
        }

        &.blue {
          .shape {
            .circle {
              background: #308697;
            }
          }
          .info {
            color: #308697;
          }
        }

        &.red {
          .shape {
            .circle {
              width: 16px;
              height: 16px;
              background: #E14B5D;
            }
          }
          .info {
            color: #E14B5D;
          }
        }

      }
      &:last-child {
        .shape .bar {
          display: none;
        }
      }
    }
    padding: 0 40px 40px 40px;

    .title {
      height: 65px;
      position: relative;
      margin-bottom: 40px;
      border-bottom: 2px solid #F2F4F5;
      p {
        font-size: 24px;
        text-align: center;
      }
      button {
        position: absolute;
        top: 5px;
        right: 40px;
        color: #6C6F70;
        i {
          display: inline-block;
          margin-right: 6px;
        }
      }
    }

  }

  .product-info {
    position: relative;

    .list-header {
      padding-top: 50px;
      .row {
        .col {
          font-size: 14px;
          color: #308697;
        }
      }
    }

    .row {
      overflow: hidden;
      margin-bottom: 20px;
      .product {
        width: 380px;
        margin-left: 15px;
        .product-info {
          width: 108px;
          display: inline-block;
          margin-left: 20px;
        }
      }

      .spec {
        width: 248px;
      }

      .custom {
        width: 190px;
      }

      .quoted {
        width: 158px;
      }

      .number {
        width: 158px;
      }

      .total {
        width: 100px;
      }

      .col {
        padding: 0 10px;
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
        color: #555;
        .product-img {
          width: 98px;
          height: 98px;
          line-height: 98px;
          display: inline-block;
          text-align: center;
          img {
            max-width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
        }
      }

      .col > div {
        vertical-align: middle;
      }
    }

  }

  #product {
    max-height: 800px;
    overflow-y: auto;
  }

  .fee-title {
    margin-top: 15px;
    color: #6C6F70;
    margin-bottom: 12px !important;
  }

  .detail-title {
    color: #6C6F70;
    margin-bottom: 12px !important;
  }

  .log-title {
    color: #308697;
    font-size: 24px;
  }

  .green-circle {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    background: #99c72c;
    color: #fff !important;
    font-size: 14px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }

  .red {

    color: #E14B5D;
  }

  .order-price {
    font-size: 20px;
    width: 136px;
  }
</style>

