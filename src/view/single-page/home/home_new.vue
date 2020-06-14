<template>
  <Card shadow style="height: 100%;width: 100%;overflow:hidden">
    <h2>
      我的svn仓库
    </h2>
    <div class="search-con search-con-top">
      <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
      <Button @click="handleSearch" class="search-btn" type="primary"><Icon style="font-size: 16px;" type="md-search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <div class="body">
      <div class="svn-repo" v-for="(repo, i) in repoList" :key="`repo-${i}`">
        <div class="item-content">
          <div class="item-icon" :style="{'background-color': generateBgColor()}">{{ repo.name.substring(0,1) }}</div>
          <div class="item-name">
            <h3>{{ repo.name_with_namespace }}&nbsp;<Icon :type="repo.visibility === 'private' ? 'md-lock' : 'md-globe'" />&nbsp;<span>{{ repo.permissions.project_access.access_level === 10 ? '开发者' : '管理员' }}</span></h3>
            <p style="color: #2e2e2e; font-size: 14px;">{{ repo.description }}</p>
          </div>
          <div class="last-operate">
            <Tooltip placement="top" :content="repo.created_at">
              {{ getDateDiff(repo.last_activity_at) }}
            </Tooltip>
          </div>
        </div>
        <div class="item-status">
          <a>[编辑权限]</a>
          <a>[删除]</a>
          <a>创建人:{{ repo.owner.name }}</a>
          <a>创建于:{{ repo.created_at }}</a>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      repoList: [
        {
          'id': 1,
          'description': '测试svn仓库',
          'visibility': 'public',
          'tsvn_url_to_repo': 'tsvn://liduote.top:8081/svn/testsvn',
          'http_url_to_repo': 'http://liduote.top:8081/svn/testsvn',
          'owner': {
            'id': 3,
            'name': 'liduote',
            'username': 'liduote',
            'created_at': '2020-04-26 10:28:35'
          },
          'name': '测试svn',
          'name_with_namespace': '李多特 / 测试svn',
          'path': 'testsvn',
          'path_with_namespace': 'liduote/testsvn',
          'created_at': '2020-04-26 10:28:35',
          'last_activity_at': '2020-04-26 10:28:35',
          'creator_id': 3,
          'namespace': {
            'id': 4,
            'name': '李多特',
            'path': 'liduote',
            'kind': 'group'
          },
          'permissions': {
            'project_access': {
              'access_level': 50
            },
            'group_access': {
              'access_level': 50
            }
          },
          'statistics': {
            'revision': 198,
            'repository_size': 106680
          }
        },
        {
          'id': 2,
          'description': 'CIT-BSP文档库',
          'visibility': 'private',
          'tsvn_url_to_repo': 'tsvn://liduote.top:8081/svn/abcsvn',
          'http_url_to_repo': 'http://liduote.top:8081/svn/abcsvn',
          'owner': {
            'id': 4,
            'name': '杨鸿铭',
            'username': 'yanghm3',
            'created_at': '2020-04-26 10:28:35'
          },
          'name': '文档库',
          'name_with_namespace': '杨鸿铭 / 文档库',
          'path': 'testsvn',
          'path_with_namespace': 'yanghm3/abcsvn',
          'created_at': '2020-04-26 10:28:35',
          'last_activity_at': '2020-04-26 10:28:35',
          'creator_id': 4,
          'namespace': {
            'id': 5,
            'name': '杨鸿铭',
            'path': 'yanghm3',
            'kind': 'group'
          },
          'permissions': {
            'project_access': {
              'access_level': 10
            },
            'group_access': {
              'access_level': 10
            }
          },
          'statistics': {
            'revision': 83,
            'repository_size': 3088658
          }
        }
      ]
    }
  },
  methods: {
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
    //
  }
}
</script>

<style lang="less">
  .svn-repo{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .item-content{
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
  .search-con{
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
    .search{
      &-input{
        display: inline-block;
        width: 200px;
        margin-left: 2px;
      }
      &-btn{
        margin-left: 2px;
      }
    }
  }
</style>
