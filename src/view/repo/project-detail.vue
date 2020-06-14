<template>
  <div class="project-detail-container">
    <h2 class="project-detail-title">
      私有仓库 <Icon type="md-lock" />&nbsp;{{ project.name }}
    </h2>
    <Tabs class="project-detail-content" :value="selectedTab">
      <TabPane label="检出" name="checkout">
        <ProjectUrl :project="project" />
      </TabPane>
      <TabPane label="权限" name="auth">
        <ProjectAuth :project="project" />
      </TabPane>
      <TabPane label="设置" name="settings">
        <ProjectSettings :project="project" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getProjectById } from '@/api/project'
import ProjectUrl from './project-url'
import ProjectAuth from './project-auth'
import ProjectSettings from './project-settings'
export default {
  name: 'project_detail',
  components: {
    ProjectUrl,
    ProjectAuth,
    ProjectSettings
  },
  data () {
    return {
      urlType: 'http',
      project: {
        id: '',
        name: '',
        path: '',
        description: '',
        created_on: '',
        created_by: '',
        last_activity_on: '',
        namespace_id: '',
        visibility: '',
        updated_on: '',
        setting_auth_content: '',
        final_auth_content: ''
      },
      selectedTab: 'checkout'
    }
  },
  methods: {
    init () {
      const projectId = this.$route.params.project_id
      const action = this.$route.query.action
      if (action) this.selectedTab = action
      getProjectById(projectId).then(res => {
        this.project = res
      })
    },
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'repo_detail'
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less">
.project-detail-container {
  overflow: hidden;
  .project-detail-title {
    margin-bottom: 10px;
  }
}
</style>
