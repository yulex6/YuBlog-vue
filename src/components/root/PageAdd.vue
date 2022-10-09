<template>
  <el-card class="box-card">
    <div >
      <el-button type="primary" round  @click="add()">保存</el-button>
    </div>
    <div class="divide"></div>
    <el-input v-model="pageMessage.title"
              placeholder="请输入"
              show-word-limit
              maxlength="10"
    >
      <template #prepend>标题</template>
    </el-input>
    <div class="divide"></div>
    <el-input v-model="pageMessage.desc"
              placeholder="请输入"
              show-word-limit
              maxlength="20"
    >
      <template #prepend>描述</template>
    </el-input>
    <div class="divide"></div>
    <md-editor v-model="pageMessage.content"  preview-theme="github"/>
  </el-card>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {inject, ref} from "vue";
import {ElMessage} from "element-plus";
const axios = inject("axios")
const url = "http://localhost:8080/root/page"
const props = defineProps({
  username: String,
})
const token = localStorage.getItem('token')
const pageMessage = ref({
  title:"",
  desc:'',
  content:'',
  author:props.username,
})
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
function add(){
    axios.post(url+'/add',{
      title:pageMessage.value.title,
      desc:pageMessage.value.desc,
      content:pageMessage.value.content,
      username: pageMessage.value.author,
      created:new Date().Format('yyyy-MM-dd HH:mm:ss')
    },token == null? null:{headers:{'Authorization':token}}).then(function (response){
      ElMessage.success(response.data.message)
    }).catch(function (error){
      console.log(error)
    })
}
</script>

<style scoped>
.box-card {
  width: auto;
}
.divide{
  margin-bottom: 20px;
}

</style>