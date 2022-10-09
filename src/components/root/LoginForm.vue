<template>
  <el-card class="box-card">
    <div class="text item">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
      >
        <el-form-item label-width="55%"><h2>登录</h2></el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import {provide, reactive, ref} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {inject} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const axios = inject("axios")
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  pass: '',
  mess: '',
})
const url = "http://localhost:8080"
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 1, max: 8, message: 'Length should be 1 to 8', trigger: 'blur' },
  ],
  pass: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 3, max: 8, message: 'Length should be 3 to 8', trigger: 'blur' },
  ],
})
//成功弹窗
const success = () => {
  ElMessage({
    message: ruleForm.mess,
    type: 'success',
  })
}
//失败弹窗
const fail = () => {
  ElMessage.error(ruleForm.mess)
}
//登录验证
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      axios.post(url+"/login",{
            id: 'null',
            username: ruleForm.name,
            password: ruleForm.pass
          }).then(function (response){
        ruleForm.mess = response.data.message
        let code = response.data.code
        if (code == '00000')
          {
            let token = response.data.data.Authorization;
            console.log(token)
            localStorage.setItem("token",token);
            success()
            //跳转管理页面
            router.push(`/root/${ruleForm.name}`)
          }
        else
          fail()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<style scoped>
  .box-card{
    position: absolute;
    top: 30%;
    left: 35%;
    width: 450px ;
  }
</style>