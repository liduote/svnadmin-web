<template>
  <Card shadow>
    <h3 style="margin-bottom: 20px;display: inline-block">设置</h3>
    <div class="setting-info">
      <Form label-position="top">
        <FormItem label="仓库名称">
            <Input @on-change="changeInfo" style="width: 30%;" v-model="newName" />
            <span style="margin-left: 10px;">1-20个字母、数字或下划线组合</span>
        </FormItem>
        </FormItem>
        <FormItem label="仓库描述">
            <Input @on-change="changeInfo" type="textarea" v-model="newDescription" style="width: 50%;" />
        </FormItem>
        <FormItem>
          <Button @click="saveProject" style="margin-right: 20px;" :disabled="!isChange" type="primary">保存</Button>
          <span v-if="alert.show" :class="alert.type">{{ alert.message }}</span>
        </FormItem>
      </Form>
    </div>
    <div class="setting-operate">
      <span style="font-weight: bold; font-size: 14
      px;">删除项目，此操作无法恢复，请慎用！</span> <Button @click="deleteProject.modal=true" style="float: right;" type="error">删除项目</Button>
      <Modal
        v-model="deleteProject.modal">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>确定要删除吗？</span>
        </p>
        <p style="font-size:16px; font-weight: bold;margin-bottom: 10px;">此操作的后果很严重，请仔细阅读以下提示!</p>
        <p class="confirm">您的操作将导致数据丢失并且删除的项目将<span class="confirm-alert">无法恢复</span> 同时也将删除与 <span class="confirm-name">{{ newName }}</span> 关联的权限信息。</p>
        <p style="font-size:14px; margin-top: 5px;">请输入项目名称以确认删除</p>
        <Input @on-change="toBeDelete" v-model="deleteProject.name" />
        <div slot="footer">
            <Button type="error" size="large" long :disabled="!deleteProject.ready" @click="delProject">我已充分了解并删除</Button>
        </div>
      </Modal>
    </div>
  </Card>
</template>
<script>
import { mapMutations } from 'vuex'
import Editor from 'vue2-ace-editor'
import { updateProject, delProject } from '@/api/project'
export default {
  name: 'project_settings',
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
      newName: '',
      newDescription: '',
      isChange: false,
      alert: {
        show: false,
        message: '',
        type: 'success'
      },
      deleteProject: {
        modal: false,
        name: '',
        ready: false
      }
    }
  },
  methods: {
    init () {
      this.newName = this.project.name
      this.newDescription = this.project.description
    },
    changeInfo () {
      if (this.newName !== this.currentProject.name ||
          this.newDescription !== this.currentProject.description) {
        this.isChange = true
      }
    },
    saveProject () {
      this.currentProject.name = this.newName
      this.currentProject.description = this.newDescription
      updateProject(this.currentProject).then(res => {
        this.newName = res.name
        this.newDescription = res.description
        this.currentProject = res
        // alert show
        this.alert.show = true
        this.alert.message = '保存成功'
        this.alert.type = 'save-success'
      }).catch(err => {
        console.log(err)
        console.log(err.reponse)
        this.alert.show = true
        this.alert.message = '保存失败'
        this.alert.type = 'save-error'
      })
    },
    delProject () {
      this.deleteProject.modal = false
      delProject(this.currentProject.id).then(res => {
        this.handleCloseTag()
      }).catch(err => {
        console.log(err)
        this.$Message.error('系统错误')
      })
    },
    toBeDelete () {
      if (this.deleteProject.name === this.newName) {
        this.deleteProject.ready = true
      } else {
        this.deleteProject.ready = false
      }
    },
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'project_detail',
        params: {
          project_id: this.currentProject.id
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    project (newVal) {
      this.currentProject = newVal
      this.newName = newVal.name
      this.newDescription = newVal.description
    }
  }
}
</script>
<style lang="less" scoped>
.setting-info {
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 15px;
}
.setting-operate {
  margin-top: 10px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 15px;
  height: 60px;
}
.save-success {
  color: green
}
.save-error {
  color: red;
}
.confirm {
  font-size: 13px;

  &-name {
    background-color: #fbe5e1;
    padding: 4px 6px;
    color: #c0341d;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
  }
  &-alert {
    padding: 4px 6px;
    font-size: 14px;
    font-weight: bold;
  }
}

</style>
