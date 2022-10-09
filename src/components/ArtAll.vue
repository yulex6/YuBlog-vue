<template>
  <!--main-->
  <div style="height: 88vh;">
    <!-- 注意需要给 el-scrollbar 设置高度，判断是否滚动是看它的height判断的 -->
    <el-scrollbar height="100%"> <!-- 滚动条 -->
      <el-card class="box-card" v-for="art in artData" @click="toSingle(art.title)">
        <div class="item title">{{ art.title }}</div>
        <p>{{ art.desc }}</p>
        <el-divider/>
        <span class="mess">{{ art.name }}</span>
        <span class="mess">{{ art.date }}</span>
      </el-card>
    </el-scrollbar><!-- /滚动条 -->
  </div>
</template>

<script setup>
import {inject, onBeforeMount, ref} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const axios = inject("axios")
const url = "http://localhost:8080/common/page"

//文章数据
const artData = ref([])
onBeforeMount(() =>{
  axios.get(url+'/all')
      .then(function (response){
        if(response.data.code === '500'){
          ElMessage.error('数据加载失败！')
          console.log(response.data.message)
        }else {
          for (let i = 0; i < response.data.data.length; i++) {
            let page =response.data.data[i];
            artData.value.push({
              date: page.created.replace(/T/g, ' '),
              name: page.username,
              title: page.title,
              desc: page.desc,
              content: page.content
            })
          }
        }
      })
})
function toSingle(title){
  router.push({name: 'ArtSingle',params:{title: title}})
}
</script>

<style scoped>
.title{
  font-size: larger;
  font-weight: bolder;
}
.mess{
  display: inline-block;
  margin-right: 30px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1000px;
  margin: 50px auto auto;
  cursor: pointer;
}
</style>