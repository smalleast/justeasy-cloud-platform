<template>
  <section class="address">
    <div class="sel-address-info" v-if="hasAddress">
      <div class="left-info" v-if="currentAddress">
        <p>
                 <span class="label">
                 <i class="iconfont icon-coordinate"></i>
                   默认地址：
                  </span>
          <button class="link-btn" @click="setAddressNum">修改</button>
        </p>
        <p>
          <span class="label">收货人：</span>
          <span class="value">{{currentAddress.userName}}</span>
        </p>
        <p>
          <span class="label">联系方式：</span>
          <span class="value">{{currentAddress.userMobile}}</span>
        </p>
        <p>
          <span class="label">详细地址：</span>
          <span class="value">{{currentAddress.cityAddress}}{{currentAddress.doorAddress}}</span>
        </p>
      </div>
      <div class="right-info">
        <p>
          <button class="text-btn" @click="openAddressSel">切换地址</button>
        </p>
        <p>
          <button class="main-btn" @click="addAddress">新建地址</button>
        </p>
      </div>
    </div>

    <div class="edit-address-info" v-if="!hasAddress">
      <div class="left-info">
        <div class="address-sel">
          <span class="label">所在地区：</span>
          <div class="input">
            <Select name="province" @on-change="changeProvince" v-model="provinceId">
              <Option :value="p.id" :key="p.id" v-for="p in addressData">{{p.name}}</Option>
            </Select>
            <Select name="city" v-model="cityId" @on-change="changeCity">
              <Option :value="c.id" :key="c.id" v-for="c in cityData">{{c.name}}</Option>
            </Select>
            <Select name="zone" v-model="address.locationId">
              <Option :value="z.id" :key="z.id" v-for="z in zoneData">{{z.name}}</Option>
            </Select>
          </div>
        </div>
        <div>
          <span class="label">详细地址：</span>
          <div class="input">
                                    <textarea name="" ref="addressObj" v-model="address.doorAddress"
                                              placeholder="填写详细地址，街道，门牌号等"></textarea>
          </div>
        </div>
        <div>
                                <span>
                                    <span class="label">收货人：</span>
                                    <div class="input">
                                        <input ref="nameObj" type="text" v-model="address.userName" placeholder="收货人">
                                    </div>
                                </span>
          <span>
                                    <span class="label">手机号：</span>
                                    <div class="input">
                                        <input ref="mobileObj" type="text" v-model="address.userMobile"
                                               placeholder="手机号">
                                    </div>
                                </span>
        </div>
      </div>
      <div class="right-info">
        <p>
          <myCheckbox id-name="address" label="设为默认地址" @change="changeCheckBox"></myCheckbox>
        </p>
        <button class="main-btn" @click="saveAddress">确认</button>
        <button class="cancel-btn" @click="setAddressNum">取消</button>
      </div>
    </div>
    <SwitchAddress ref="switchAddress" v-on:submit="setAddress"></SwitchAddress>
  </section>
</template>
<script>
  import {myCheckbox} from 'components/vue/index';
  import SwitchAddress from './switch-address.vue';

  export default {
    data() {
      return {
        hasAddress: false,
        address: {
          locationId: 4143,
          detailAddress: '',
          cityAddress: '',
          doorAddress: '',
          userName: '',
          userMobile: '',
          isDefault: 0,
          zipCode: '200070',
          id: ''
        },
        addressSaveId: '',
        defaultAddress: false,
        provinceId: '',
        cityId: '',
        addressData: [],
        cityData: [],
        zoneData: [],
        currentAddress: {}
      };
    },
    components: {SwitchAddress, myCheckbox},
    methods: {
      initLocation() {
        if (!this.address.locationId) {
          return;
        }
        this.addressData.forEach((province) => {
          province.cities.forEach((city) => {
            city.cities.forEach((zone) => {
              if (zone.id === this.address.locationId) {
                this.provinceId = province.id;
                this.cityData = province.cities;
                this.cityId = city.id;
                this.zoneData = city.cities;
              }
            });
          });
        });
      },
      changeProvince(pid) {
        this.addressData.forEach((province) => {
          if (province.id === pid) {
            this.cityData = province.cities;
            this.zoneData = [];
          }
        });
      },
      changeCity(cid) {
        this.cityData.forEach((city) => {
          if (city.id === cid) {
            this.zoneData = city.cities;
          }
        });
      },
      openAddressSel() {
        this.$refs.switchAddress.open(this.currentAddress.id);
      },
      setAddress(inItem) {
        this.currentAddress = this.splitAddress(inItem);
      },
      setAddressFocus() {
        this.$refs.addressObj.focus();
      }
      , clear(e, key) {
        e.target.previousElementSibling.focus();
        this.user[key] = '';
      },
      verification() {
        if (this.address.doorAddress === '') {
          this.$Message.error('详细地址未空，请先输入详细地址！');
          this.$refs.addressObj.focus();
          return false;
        }
        if (this.address.userName === '') {
          this.$Message.error('收货人姓名为空，请先输入收货人姓名！');
          this.$refs.nameObj.focus();
          return false;
        }
        if (this.address.userMobile === '') {
          this.$Message.error('手机号为空，请先输入手机号！');
          this.$refs.mobileObj.focus();
          return false;
        }
        return true;
      },
      saveAddress() {
        this.address.isDefault = this.defaultAddress ? 1 : 0;
        if (this.verification()) {
          let addressList = {
            detailAddress: this.address.doorAddress,
            isDefault: this.address.isDefault,
            locationId: this.address.locationId,
            userMobile: this.address.userMobile,
            userName: this.address.userName,
          };
          if (this.address.id) {
            addressList.addressId = this.address.id;
            api.address.setAddress(addressList).then((res) => {
              this.addressSaveId = res.id;
              this.hasAddress = true;
              this.getAddress();
            });
          } else {
            api.address.addAddress(addressList).then((res) => {
              this.addressSaveId = res.id;
              this.hasAddress = true;
              this.getAddress();
            });
          }

        }
      },
      getAddress() {
        api.address.getAddress().then((res) => {
          let list = res.list;
          if (list.length > 0) {
            let addressNum = {};
            if (this.addressSaveId) {
              addressNum = list.filter(item => item.id === this.addressSaveId)[0];
            } else {
              addressNum = list.filter(item => item.isDefault === 1)[0];
            }
            //默认值 不存在，则显示第一个数据
            if (!addressNum) {
              addressNum = list[0];
            }
            this.currentAddress = this.splitAddress(addressNum);
            this.hasAddress = true;
          } else {
            this.hasAddress = false;
          }
        });
      },
      splitAddress(inItem) {
        inItem.cityAddress = inItem.detailAddress.split('[$]')[0];
        inItem.doorAddress = inItem.detailAddress.split('[$]')[1];
        return inItem;
      },
      setAddressNum() {
        this.hasAddress = !this.hasAddress;
        this.address = this.currentAddress;
      },
      addAddress() {
        this.hasAddress = false;
        this.address = {
          locationId: 4143,
          detailAddress: '',
          cityAddress: '',
          doorAddress: '',
          userName: '',
          userMobile: '',
          isDefault: 0,
          zipCode: '200070',
          id: ''
        };
      },
      changeCheckBox(inParam) {
        this.defaultAddress = inParam;
      }
    },
    created() {
      api.address.getData()
        .then((res) => {
          this.addressData = res;
          this.initLocation();
        });
      this.getAddress();

    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .address {
    position: relative;
  }

  .address .sel-address-info {
    padding: 70px 70px 70px 40px;
    overflow: hidden;
  }

  .address .sel-address-info .left-info p {
    margin-bottom: 6px;
  }

  .address .sel-address-info .left-info p:first-child {
    margin-bottom: 16px;
  }

  .address .sel-address-info .left-info p:first-child .label {
    font-size: 14px;
    color: #555;
    margin-right: 20px;
    width: 100px;
  }

  .address .sel-address-info .left-info p .label {
    color: #6C6F70;
    width: 80px;
    display: inline-block;
    text-align: right;
    margin-right: 8px;
  }

  .address .sel-address-info .left-info p .value {
    color: #555;
  }

  .address .sel-address-info .right-info {
    padding-top: 30px;
  }

  .address .sel-address-info .right-info button.main-btn {
    height: 40px;
    width: 145px;
    margin-top: 20px;
  }

  .edit-address-info {
    padding: 60px 60px 20px 40px;
    overflow: hidden;
  }

  .edit-address-info .right-info button {
    width: 145px;
    height: 40px;
  }

  .edit-address-info .right-info button:last-child {
    margin-left: 16px;
  }

  .edit-address-info .right-info p {
    margin-bottom: 20px;
  }

  .edit-address-info .left-info .label {
    vertical-align: top;
    margin-top: 8px;
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 10px;
  }

  .edit-address-info .left-info > div {
    margin-top: 16px;
  }

  .edit-address-info .left-info .input {
    display: inline-block;
  }

  .edit-address-info .left-info .input > div {
    display: inline-block;
    width: 118px;
    height: 34px;
  }

  .edit-address-info .left-info .input textarea {
    width: 600px;
    height: 112px;
    border: 1px solid #A2A2A8;
    border-radius: 4px;
    padding: 10px;
  }

  .edit-address-info .left-info .input input {
    border: 1px solid #A2A2A8;
    border-radius: 4px;
    width: 118px;
    height: 34px;
    padding: 10px;
  }

  .edit-address-info .right-info p {
    margin-top: 154px;
  }

  .left-info {
    float: left;
  }

  .right-info {
    float: right;
  }

  .label-title {
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

  .label-title:before {
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

</style>
