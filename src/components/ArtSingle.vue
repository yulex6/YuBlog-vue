<template>
  <el-card class="box-card">
    <md-editor v-model="artData.content"  :preview-theme="mdConfig.theme" :previewOnly="mdConfig.previewOnly"/>
  </el-card>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {inject, onBeforeMount, ref} from "vue";
import {ElMessage} from "element-plus";
const axios = inject("axios")
const url = "http://localhost:8080/common/page"
const mdConfig ={
  theme: 'github',
  previewOnly: true
}
const props = defineProps({
  title: String
})
//文章数据
const artData = ref({
  title: props.title,
  created:'',
  desc:'',
  content:'',
  author:'',
})
onBeforeMount(() =>{
  axios.get(url+'/getPage/'+props.title)
      .then(function (response){
        if(response.data.code === '500'){
          ElMessage.error('数据加载失败！')
          console.log(response.data.message)
        }else {
            let page =response.data.data;
            artData.value.created = page.created.replace(/T/g, ' ')
            artData.value.author = page.username
            artData.value.desc = page.desc
            artData.value.content = page.content
        }
      })
})
</script>

<style scoped>
.box-card {
  width: 1000px;
  margin: 50px auto auto;
}
</style>