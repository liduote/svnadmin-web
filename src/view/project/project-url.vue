<template>
  <Card shadow>
    <h3 style="margin-bottom: 20px;">项目地址（版本库）</h3>
    <Input readonly style="width: 90%;" v-model="project.http_url">
      <Select v-model="urlType" slot="prepend" style="width: 80px">
        <Option value="http">HTTPS</Option>
        <Option value="tsvn">TSVN</Option>
      </Select>
      <Button slot="append"
        @click="copyUrl">复制</Button>
    </Input>
    <p style="margin-top: 20px;">
      <span style="font-weight: bold">[提示]</span> TSVN选项会自动调用tortoiseSVN工具，如果没有该工具则该选项无反应。
    </p>
    <h1 style="margin-top: 20px;">&nbsp;新手引导</h1>
    <hr color="#987cb9 ">
    <div class="repo-guide-line">
      <p>
      .<a href="javascript:window.open('https://www.alisvn.com/faq/55.html?showRepo')">如何添加项目到平台</a>
      </p>
      <p>
      .<a href="javascript:window.open('https://www.alisvn.com/faq/7.html?showRepo')">TortoiseSVN 检出版本库</a>
      </p>
      <p>
      .<a href="javascript:window.open('https://www.alisvn.com/faq/6.html?showRepo')">TortoiseSVN 提交项目文件</a>
      </p>
      <p>
      .Linux / Mac / DOS 命令行 检出版本库
      </p>
      <div class="command-line">
        <span>$ svn co </span>
        <span>{{project.http_url}} --username={{$store.state.user.userName}}</span>
      </div>
      <span style="margin-left: 2px;font: 12px '\5FAE\8F6F\96C5\9ED1', 'microsoft yahei',tahoma;">下一步，需要输入账户名的密码，回车确认。</span>
      <div class="command-line">
        <span>Authentication realm: &lt;{{getPrefix(project.http_url)}}&gt; SVN Repositorys</span><br>
        <span>Password for '{{$store.state.user.userName}}': ******</span>
      </div>
      <div class="command-line">
        <span>$ cd {{getSuffix(project.http_url)}} #进入刚检出的目录</span><br>
        <span>$ touch testRepo.txt #生成一个新文件</span><br>
        <span>$ svn add testRepo.txt #执行添加svn文件命令</span><br>
        <span>$ svn ci testRepo.txt -m 'ci test' #提交刚生成的文件并写上注释</span><br>
        <span>Adding testRepo.txt</span><br>
        <span>Transmitting file data .</span><br>
        <span>Committed revision 2.</span><br>
      </div>
    </div>
  </Card>
</template>
<script>
export default {
  name: 'project_url',
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      urlType: 'http',
      repository: {
        httpUrl: 'https://bj-svn.asiainfo.com/svn/testsvn'
      }
    }
  },
  methods: {
    copyUrl () {
      const message = this.$Message
      this.$copyText(this.project.http_url).then(function (e) {
        message.info('已复制到剪切板')
      }, function (e) {
        message.error('复制失败，请手动复制')
      })
    },
    getPrefix (url) {
      console.log(url)
      return url.substring(0, url.indexOf('/svn/'))
    },
    getSuffix (url) {
      return url.substring(url.indexOf('/svn/') + 5)
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.repo-guide-line {
  margin-top: 10px;
  p {
    margin: 10px;
    font-size: 18px;
  }
  .command-line {
    background-color: #333333;
    border: 2px solid #DDDDDD;
    color: #FFFFFF;
    padding: 10px;
    font-family: Monaco,"DejaVu Sans Mono","Courier New",monospace;
    font-size: 13px;
    margin: 10px 0;
  }
}
</style>
