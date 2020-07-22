<template>
  <Card shadow>
    <h3 style="margin-bottom: 20px;display: inline-block">权限 |&nbsp;</h3><span style="display: inline-block"><a>如何设置权限？</a></span>
    <p style="font-size: 10px;">【提示】权限设置的用户必须是平台的注册用户，添加完权限后，点击“应用配置”，即时生效</p>
    <div class="auth-editor">
      <Editor ref="editor" v-model="authContent" @init="editorInit" lang="html" theme="chrome" width="100%" height="300"></Editor>
    </div>
    <div style="margin-top: 10px;">
    <Button @click="saveAuth" :disabled="!readySave" type="primary" style="margin-right: 20px;">应用设置{{showTime >= 0 ? '(' + showTime + ')' : ''}}</Button>
    <span v-if="alert.show" :class="alert.type">{{ alert.message }}</span>
    </div>
  </Card>
</template>
<script>
import Editor from 'vue2-ace-editor'
import { saveProjectAuth } from '@/api/project'
export default {
  name: 'project_auth',
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Editor
  },
  data () {
    return {
      currentProject: {},
      authContent: '',
      readySave: false,
      alert: {
        show: false,
        message: '',
        type: ''
      },
      showTime: -1
    }
  },
  methods: {
    saveAuth () {
      this.currentProject.setting_auth_content = this.authContent
      saveProjectAuth(this.currentProject).then(res => {
        console.log(res)
        console.log(this.alert)
        this.alert.show = true
        this.alert.message = '文件配置已生效'
        this.alert.type = 'save-success'
        this.timeClear()
      }).catch(err => {
        console.log(err)
        const response = err.response
        if (!response) {
          console.log(err)
        }
        this.alert.show = true
        this.alert.message = response.data.message
        this.alert.type = 'save-error'
      })
    },
    timeClear () {
      this.showTime = 3
      const interval = setInterval(() => {
        if (this.showTime <= 0) {
          this.showTime = -1
          this.alert.show = false
          clearInterval(interval)
        } else {
          this.showTime--
        }
      }, 1000)
    },
    editorInit () {
      require('brace/mode/html')
      require('brace/theme/chrome')
    }
  },
  mounted () {
  },
  watch: {
    project (newVal) {
      this.currentProject = newVal
      this.authContent = newVal.setting_auth_content
    },
    authContent (newVal) {
      if (newVal !== this.currentProject.setting_auth_content) {
        this.readySave = true
      } else {
        this.readySave = false
      }
    }
  }
}
</script>
<style scoped>
.auth-editor {
  border: 1px solid #ddd;
}
.save-success {
  color: green;
}
.save-error {
  color: red;
}
</style>
