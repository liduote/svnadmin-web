<template>
  <Card shadow style="min-height:100%;width: 100%;">
    <h2>
      我的svn仓库
    </h2>
    <div class="head-line">
      <div class="search-con search-con-top">
        <Input @on-search="handleSearch" search enter-button placeholder="输入关键字搜索" />
      </div>
      <div class="create-btn">
        <Button @click="handleCreate" type="primary"><Icon style="font-size: 16px;" type="md-add"/>&nbsp;&nbsp;创建</Button>
      </div>
    </div>
    <div class="body">
      <div class="svn-project" v-for="(project, i) in projectList" :key="`project-${i}`">
        <div @click="handleDetail(project)" class="item-content">
          <div class="item-icon" :style="{'background-color': generateBgColor()}">{{ project.name.substring(0,1) }}</div>
          <div class="item-name">
            <h3>{{ project.name }}&nbsp;&nbsp;<Icon :type="project.visibility === 'private' ? 'md-lock' : 'md-globe'" />&nbsp;</h3>
            <p style="color: #2e2e2e; font-size: 14px;">{{ project.description.length > 27 ? project.description.substring(27) + '...' : project.description }}</p>
          </div>
          <div class="last-operate">
            <Tooltip placement="top" :content="project.created_on">
              {{ getDateDiff(project.last_activity_on) }}
            </Tooltip>
          </div>
        </div>
        <div class="item-status">
          <a @click="toProjectDetail(project, 'auth')">[编辑权限]</a>
          <a @click="toProjectDetail(project, 'settings')">[删除]</a>
          <a>创建于:&nbsp;{{ project.created_on }}</a>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { getProjectList } from '@/api/project'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      searchValue: '',
      projectList: []
    }
  },
  methods: {
    getProjectList () {
      getProjectList().then(res => {
        this.projectList = res
      }).catch(err => {
        console.log(err)
      })
    },
    handleSearch (searchValue) {
      getProjectList(searchValue).then(res => {
        this.projectList = res
      }).catch(err => {
        console.log(err)
      })
    },
    handleCreate () {
      this.$router.push({
        name: 'project_create'
      })
    },
    handleDetail (project) {
      this.$router.push({
        path: 'project/' + project.id,
        query: {
          project_name: project.name,
          action: 'checkout'
        }
      })
    },
    toProjectDetail (project, action) {
      this.$router.push({
        path: 'project/' + project.id,
        query: {
          project_name: project.name,
          action: action
        }
      })
    },
    generateBgColor () {
      const colorList = [
        '#fbe9e7',
        '#eee',
        '#e0f2f1',
        '#f3e5f5',
        '#e8eaf6',
        '#e3f2fd'
      ]
      return colorList[Math.floor(Math.random() * 6)]
    },
    getDateDiff (datetime) {
      const dateTimeStamp = Date.parse(datetime.replace(/-/gi, '/'))
      const minute = 1000 * 60
      const hour = minute * 60
      const day = hour * 24
      const month = day * 30
      const now = new Date().getTime()
      const diffValue = now - dateTimeStamp
      if (diffValue < 0) {
        return
      }
      const monthC = diffValue / month
      const weekC = diffValue / (7 * day)
      const dayC = diffValue / day
      const hourC = diffValue / hour
      const minC = diffValue / minute
      let result = ''
      if (monthC >= 1) {
        result = '修改于 ' + parseInt(monthC) + '月前'
      } else if (weekC >= 1) {
        result = '修改于 ' + parseInt(weekC) + '周前'
      } else if (dayC >= 1) {
        result = '修改于 ' + parseInt(dayC) + '天前'
      } else if (hourC >= 1) {
        result = '修改于 ' + parseInt(hourC) + '小时前'
      } else if (minC >= 1) {
        result = '修改于 ' + parseInt(minC) + '分钟前'
      } else {
        result = '修改于 刚刚'
      }
      return result
    }
  },
  mounted () {
    this.getProjectList()
  }
}
</script>

<style lang="less">
  .head-line{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 0;
  }
  .svn-project{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .item-content{
    :hover {
      cursor: pointer;
    }
    .item-icon{
      text-align: center;
      float: left;
      border-radius: 8px;
      border: 0;
      width: 48px;
      height: 48px;
      margin: 0;
      align-self: center;
      background-color: #e8eaf6;
      font-size: 20px;
      line-height: 48px;
    }
    .item-name{
      float: left;
      margin-left: 15px;
      span{
        font-size: 12px;
        font-weight: normal;
        padding: 3px 6px;
        border: 1px solid #e5e5e5;
        border-radius: 100px;
      }
    }
    .last-operate{
      float: right;
      text-align: center;
      border: 0;
      height: 48px;
      line-height: 48px;
      font-size: 12px;
      margin-right: 10px;
      color: #707070;
    }
  }
  .item-status{
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #e5e5e5;
    a{
      display: block;
      margin-right: 10px;
    }
  }
</style>
