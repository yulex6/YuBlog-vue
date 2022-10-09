<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span></span>
        <span style="font-size: larger">{{ pageMessage.title }}</span>
        <el-button type="primary" @click="saveArt()" round>保存</el-button>
      </div>
      <div class="text item">
        <span class="detail">作者：{{ pageMessage.author }}</span><br/>
        <span class="detail">发表时间：{{ pageMessage.created }}</span><br/>
        <span class="detail">描述：{{ pageMessage.desc }}</span>
      </div>
      <div class="text item">
        <md-editor v-model="pageMessage.content"  preview-theme="github"/>
      </div>
    </template>

  </el-card>
</template>


<script setup>
import {useRouter,useRoute} from "vue-router";
import {ref, onBeforeMount, inject} from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {ElMessage} from "element-plus";

const token = localStorage.getItem('token')
const url = "http://localhost:8080/root/page"
const axios = inject("axios")
const route = useRoute()
const router = useRouter()
const pageMessage = ref({
  title: route.params.title,
  created:'',
  desc:'',
  content:'',
  author:'',
  authorId:''
})
//失败弹窗
const fail = (mess) => {
  ElMessage.error(mess)
}

//获取文章详情
onBeforeMount(() =>{
  axios.get(url+'/getPage/'+pageMessage.value.title,token == null? null:{headers:{'Authorization':token}})
      .then(function (response){
        if(response.data.code == 500){
          localStorage.removeItem('token')
          fail(response.data.msg+'正在跳转登录页面...')
          setTimeout(()=>{
            router.push({name:'login'})
          },3000)
        }else {
          let page=  response.data.data;
          pageMessage.value.created = page.created.replace(/T/g, ' ');
          pageMessage.value.desc = page.desc
          pageMessage.value.content = page.content;
          pageMessage.value.author = page.username;
          pageMessage.value.authorId = page.userID;
        }

      })
})

//保存修改
function saveArt(){

}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail{
  font-size: smaller;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>