<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <Alert v-if="alert.show" type="error">
          {{alert.desc}}
        </Alert>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      alert: {
        show: false,
        desc: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      }).catch(err => {
        this.alert.show = true
        if (!err.response) this.alert.desc = '网络异常'
        if (err.response.status === 500) this.alert.desc = '未知错误，请联系管理员'
        this.alert.desc = err.response.data.message
      })
    }
  }
}
</script>

<style>

</style>
