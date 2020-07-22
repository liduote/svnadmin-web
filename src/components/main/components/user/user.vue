<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="chpwd">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Modal
      v-model="chpwd"
      footer-hide
      title="修改密码">
      <Alert id="alert" tabindex="0" v-if="alert.show" type="error" show-icon>
        修改失败
        <span slot="desc">
            {{ alert.message }}
        </span>
      </Alert>
      <Form ref="passwordForm" :model="password" :rules="passwordRules" :label-width="80">
        <FormItem label="原密码" prop="oldPassword">
          <Input type="password" v-model="password.oldPassword" />
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
          <Input type="password" v-model="password.newPassword" />
        </FormItem>
        <FormItem label="新密码确认" prop="newPasswordCheck">
          <Input type="password" v-model="password.newPasswordCheck" />
        </FormItem>
        <hr style="border: 1px solid #e5e5e5;margin: 0 0 15px 0;" />
          <Button @click="chpasswordConfirm" type="primary">确认修改</Button>
          <Button @click="chpwd=false" type="text" style="margin-left: 8px; color: #43609C;">取消</Button>
      </Form>
    </Modal>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import { chpasswd } from '@/api/user'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.password.newPasswordCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.passwordForm.validateField('newPasswordCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码以确认'))
      } else if (value !== this.password.newPassword) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      chpwd: false,
      password: {
        oldPassword: '',
        newPassword: '',
        newPasswordCheck: ''
      },
      passwordRules: {
        oldPassword: [
          { required: true, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        newPasswordCheck: [
          { validator: validatePassCheck, required: true, trigger: 'blur' }
        ]
      },
      alert: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    chpassword () {
      this.chpwd = true
      // this.$router.push({
      //   name: 'message_page'
      // })
    },
    chpasswordConfirm () {
      console.log(1111)
      this.$refs['passwordForm'].validate((valid) => {
        if (!valid) return ''
        console.log(2222)
        const params = {
          userId: this.$store.state.user.userId,
          oldPassword: this.password.oldPassword,
          newPassword: this.password.newPassword
        }

        chpasswd(params).then(res => {
          this.password = {
            oldPassword: '',
            newPassword: '',
            newPasswordCheck: ''
          }
          this.chpwd = false
          this.alert.show = false
        }).catch(err => {
          const response = err.response
          if (!response) {
            console.log(err)
          }
          this.alert.show = true
          if (!response.data.message) {
            this.alert.message = '服务器错误'
          } else {
            this.alert.message = response.data.message
          }
          this.$nextTick(() => {
            document.getElementById('alert').focus()
          })
        })
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'chpwd': this.chpassword()
          break
      }
    }
  }
}
</script>
<style scoped>
.ivu-alert {
  outline: none;
}
</style>
