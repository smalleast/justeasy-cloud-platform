<template>
  <el-dialog
    title="提示"
    :visible.sync="hasLogin"
    :close-on-click-modal="false">
    <div class="login-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form status-icon ref="ruleForm1" class="demo-ruleForm">
            <el-form-item>
              <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <button class="button button-primary">登录</button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form status-icon ref="ruleForm2"
                   class="demo-ruleForm">
            <el-form-item>
              <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入验证码" class="input-with-select">
                <button class="button button-primary verification" slot="append">发送验证码</button>
              </el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" placeholder="密码，6-8位字母数字组合" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" placeholder="确认密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <button class="button button-primary">注册</button>
              <div class="wp-10 tr f12 cursor a">使用邮箱注册</div>
            </el-form-item>
          </el-form>

        </el-tab-pane>
      </el-tabs>
<div>

</div>

    </div>

  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        hasLogin: true,
        activeName: 'login'
      };
    },
    methods: {
      open() {
        this.hasLogin = true;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-dialog__wrapper {
    .el-dialog {
      width: 280px;
      .el-form {
        .el-input-group__append {
          padding: 0;
          border: transparent;
          background: transparent;
        }
      }

    }
  }
</style>
