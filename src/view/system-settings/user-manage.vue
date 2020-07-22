<template>
  <Card shadow style="min-height:100%;width: 100%;">
    <h2>
      用户管理
    </h2>
    <div class="head-line">
      <div class="search-con search-con-top">
        <Input @on-search="handleSearch" search enter-button placeholder="输入关键字搜索" />
        <Dropdown @on-click="handleDropdown" style="margin-left: 30px; width: 100px; line-height: 32px;">
          <a href="javascript:void(0)">
              操作
              <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="setAdmin"><Icon type="md-build" /> 设为管理员</DropdownItem>
            <DropdownItem name="deleteUser" style="color: red;"><Icon type="md-close" /> 删除</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="create-btn">
        <Button @click="handleCreate" type="primary"><Icon style="font-size: 16px;" type="md-add"/>&nbsp;&nbsp;创建</Button>
      </div>
    </div>
    <div class="body">
      <Table border ref="userTable" :columns="userCols" :data="userList"></Table>
    </div>
  </Card>
</template>
<script>
import { getUserList, updateUsers, deleteUsers } from '@/api/user'
export default {
  name: 'join_page',
  data () {
    return {
      userCols: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '全名',
          key: 'fullname'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '管理员',
          key: 'admin',
          render: (h, params) => {
            if (params.row.admin) {
              return h('div', '是')
            } else {
              return h('div', '否')
            }
          }
        },
        {
          title: '注册时间',
          key: 'created_on'
        }
      ],
      userList: []
    }
  },
  methods: {
    init () {
      getUserList().then(res => {
        this.userList = res
      })
    },
    handleSearch (searchValue) {
      const params = {
        searchKey: searchValue
      }
      getUserList(params).then(res => {
        this.userList = res
      }).catch(err => {
        console.log(err)
      })
    },
    handleCreate () {
      this.$router.push({
        name: 'user_create'
      })
    },
    handleDropdown (name) {
      if (name === 'setAdmin') {
        this.setAdmin()
      } else if (name === 'deleteUser') {
        this.deleteUsers()
      }
    },
    setAdmin () {
      let users = this.$refs['userTable'].getSelection()
      if (!users || users.length === 0) {
        return ''
      }

      users = users.map(item => {
        item.admin = 1
        return item
      })
      updateUsers(users).then(res => {
        console.log(res)
        this.handleSearch()
      })
    },
    deleteUsers () {
      let users = this.$refs['userTable'].getSelection()
      if (!users || users.length === 0) {
        return ''
      }

      deleteUsers(users).then(res => {
        console.log(res)
        this.handleSearch()
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
.head-line{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.search-con{
  display: flex;
}
</style>
