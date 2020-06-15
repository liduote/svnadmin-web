<template>
  <Card shadow style="width: 100%;overflow:hidden">
    <h2 style="margin-bottom: 20px;">
      创建一个新仓库
    </h2>
    <Alert v-if="alert.show" type="error" show-icon>
        创建失败
        <span slot="desc">
            {{ alert.message }}
        </span>
    </Alert>
    <Form ref="projectForm" :model="project" :rules="projectRules" label-position="top">
        <FormItem label="仓库名称" prop="name">
            <Input @on-change="nameChange" v-model="project.name" style="width: 300px;" placeholder="请输入仓库名" />
        </FormItem>
        <FormItem label="仓库路径" prop="path">
            <Input v-model="project.path" placeholder="my-awesome-project" style="width: 450px;" >
              <span slot="prepend">{{ getRealPath() }}</span>
            </Input>
        </FormItem>
        <FormItem label="仓库描述(选填)" prop="description">
            <Input type="textarea" style="width: 450px;" v-model="project.description" placeholder="请填写描述" />
        </FormItem>
        <FormItem label="是否公开" prop="visibility">
            <RadioGroup v-model="project.visibility">
                <Radio label="public"><Icon type="md-globe" />公开</Radio>
                <Radio label="private"><Icon type="md-lock" />私有</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="" prop="init">
          <Checkbox v-model="project.init">自动建立 trunk、branches、tags、document 目录结构</Checkbox>
        </FormItem>
        <FormItem>
            <Button @click="creatProject" type="primary">创建项目</Button>
            <Button @click="handleCloseTag" type="text" style="margin-left: 8px; color: #43609C;">返回</Button>
        </FormItem>
    </Form>
  </Card>
</template>

<script>
import { mapMutations } from 'vuex'
import { createProject } from '@/api/project'
export default {
  name: 'project_create',
  components: {
  },
  data () {
    const validateName = (rule, value, callback) => {
      const reg = /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z0-9-_]+$/
      console.log('value: ' + value)
      console.log('test value: ' + reg.test(value))
      if (!reg.test(value)) {
        callback(new Error('允许使用汉字，字母，数字以及下划线和短横线'))
      } else {
        callback()
      }
    }
    const validatePath = (rule, value, callback) => {
      const reg = /^[a-zA-Z][a-zA-Z0-9-_]+$/
      if (!reg.test(value)) {
        callback(new Error('允许使用字母，数字以及下划线和短横线'))
      } else {
        callback()
      }
    }
    return {
      project: {
        name: '',
        path: '',
        description: '',
        visibility: 'private',
        init: true
      },
      projectRules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        path: [
          { validator: validatePath, trigger: 'blur' }
        ]
      },
      alert: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    creatProject () {
      createProject(this.project).then(res => {
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
      })
    },
    nameChange () {
      this.project.path = this.project.name
    },
    getRealPath () {
      let curWwwPath = window.document.location.href
      let pathName = window.document.location.pathname
      let pos = curWwwPath.indexOf(pathName)
      let localhostPaht = curWwwPath.substring(0, pos)
      return localhostPaht + '/svn/'
    },
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'project_create'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
</style>
