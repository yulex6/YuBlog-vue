<template>
  <el-button type="primary" round @click="addArt()">发表</el-button>
  <el-table :data="pageData" style="width: 100%" >
    <el-table-column prop="date" label="发表日期" width="150" :show-overflow-tooltip=tableSet.show_overflow_tooltip />
    <el-table-column prop="name" label="发表人" width="120" :show-overflow-tooltip=tableSet.show_overflow_tooltip />
    <el-table-column prop="id" label="发表人ID" width="120" :show-overflow-tooltip=tableSet.show_overflow_tooltip />
    <el-table-column prop="title" label="标题" width="120" :show-overflow-tooltip=tableSet.show_overflow_tooltip />
    <el-table-column prop="desc" label="描述" width="120" :show-overflow-tooltip=tableSet.show_overflow_tooltip />
    <el-table-column prop="content" label="内容" width="550" :show-overflow-tooltip=tableSet.show_overflow_tooltip />
    <el-table-column fixed="right" label="Operations" width="120">
      <template  v-slot="scope">
        <el-button link type="primary" size="small" @click="toSinglePage(username,scope.row.title)">详情</el-button>
        <el-button link type="primary" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {inject, ref, onBeforeMount, provide} from "vue";
import {useRouter,useRoute} from "vue-router";
import {ElMessage} from "element-plus";

const router = useRouter()
const url = "http://localhost:8080/root/page"
const axios = inject("axios")
const pageData = ref([])
const tableSet = ref({
  fit:false,
  show_overflow_tooltip:true
})
const token = localStorage.getItem('token')
const pros =defineProps({
  username: String,
})
//失败弹窗
const fail = (mess) => {
  ElMessage.error(mess)
}

onBeforeMount(() =>{
  axios.get(url+'/all',token == null? null:{headers:{'Authorization':token}})
      .then(function (response){
        if(response.data.code == 500){
          localStorage.removeItem('token')
          fail(response.data.msg+'正在跳转登录页面...')
          setTimeout(()=>{
            router.push({name:'login'})
          },3000)
        }else {
          for (let i = 0; i < response.data.data.length; i++) {
            let page =response.data.data[i];
            pageData.value.push({
              date: page.created.replace(/T/g, ' '),
              name: page.username,
              id: page.userID,
              title: page.title,
              desc: page.desc,
              content: page.content
            })
          }
        }
      })
})
//跳转详情页面
function toSinglePage(username,title){
  router.push({name:'PageSingle',params:{title: title}})
}

//发表文章
function addArt() {
  router.push({name: 'Add'})
}
</script>

<style scoped>

</style>