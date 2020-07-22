<template>
  <Card shadow style="width: 100%;overflow:hidden">
    <h2 style="margin: 16px 0;">
      新用户
    </h2>
    <hr style="border: 1px solid #e5e5e5;margin: 0 0 30px 0;" />
    <Alert id="alert" tabindex="0" v-if="alert.show" type="error" show-icon>
        创建失败
        <span slot="desc">
            {{ alert.message }}
        </span>
    </Alert>
    <h1>用户信息</h1>
    <hr style="border: 1px solid #e5e5e5;margin: 0 0 30px 0;" />
    <Form style="margin-left: 30px;" ref="accountForm" :model="account" :label-width="80" :rules="accountRules">
      <FormItem label="姓名" prop="fullname">
        <Input v-model="account.fullname" style="width: 450px;" />
      </FormItem>
      <FormItem label="用户名" prop="username">
        <Input v-model="account.username" style="width: 450px;"/>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="account.email" style="width: 450px;" />
      </FormItem>
    </Form>
    <h1>用户密码</h1>
    <hr style="border: 1px solid #e5e5e5;margin: 0 0 30px 0;" />
    <Form style="margin-left: 30px;" ref="passwordForm" :model="password" :label-width="80" :rules="passwordRules">
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="password.password" style="width: 450px;" />
      </FormItem>
      <FormItem label="密码确认" prop="passwordCheck">
        <Input type="password" v-model="password.passwordCheck" style="width: 450px;" />
      </FormItem>
    </Form>
    <h1>用户权限</h1>
    <hr style="border: 1px solid #e5e5e5;margin: 0 0 30px 0;" />
    <Form style="margin-left: 30px;" ref="accessForm" :model="access" :label-width="80">
      <FormItem label="项目限制" prop="project_limits">
        <Input v-model="access.project_limits" style="width: 450px;" />
      </FormItem>
      <FormItem label="用户权限" prop="admin">
        <RadioGroup v-model="access.admin">
          <Radio label="0">标准用户</Radio>
          <Radio label="1">管理员</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <hr style="border: 1px solid #e5e5e5;margin: 0 0 15px 0;" />
    <Form>
      <FormItem>
          <Button @click="createUser" type="primary">创建用户</Button>
          <Button @click="handleCloseTag" type="text" style="margin-left: 8px; color: #43609C;">取消</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import { mapMutations } from 'vuex'
import { createUser } from '@/api/user'
export default {
  name: 'user_create',
  components: {
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.password.passwordCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.passwordForm.validateField('passwordCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码以确认'))
      } else if (value !== this.password.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      account: {
        username: '',
        fullname: '',
        email: ''
      },
      password: {
        password: '',
        passwordCheck: ''
      },
      access: {
        project_limits: 10,
        admin: '0'
      },
      accountRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      },
      passwordRules: {
        password: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        passwordCheck: [
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
    createUser () {
      this.$refs['accountForm'].validate((valid) => {
        if (!valid) return

        this.$refs['passwordForm'].validate((valid) => {
          if (!valid) return
          const user = {
            username: this.account.username,
            fullname: this.account.fullname,
            email: this.account.email,
            password: this.password.password,
            project_limits: this.access.project_limits,
            admin: this.access.admin
          }
          createUser(user).then(res => {
            console.log(res)
            if (res.id) this.handleCloseTag()
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
      })
    },
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'user_create'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.ivu-alert {
  outline: none;
}
</style>
