<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <root-header :username="username"/>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <root-aside/>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import RootHeader from '../../components/root/RootHeader.vue'
import RootAside from "../../components/root/RootAside.vue";
import {ref} from "vue";
import {useRouter,useRoute} from "vue-router";

defineProps({
  username: String
})
</script>

<style scoped>
.el-header{
  padding: 0;
}
</style>