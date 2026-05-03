<template>
  <div>
    <el-form ref="formRef" :model="account" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { ElForm } from "element-plus";
import localCache from '@/utils/cache'
import { useStore } from "vuex";
import {rules} from "@/views/login/config/account-config";
const store = useStore();

// 定义响应式数据
const account = reactive({
  name: '',
  password: ''
})

// 获取form组件对象
const formRef = ref<InstanceType<typeof ElForm>>()

// 提交表单和标签验证
const loginAction = (isKeepPassword: boolean) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        if (isKeepPassword) {
          localCache.setCache('name', account.name);
          localCache.setCache('password', account.password);
        } else {
          localCache.deleteCache('name');
          localCache.deleteCache('password');
        }
      }

      // 开始登陆验证
      store.dispatch('login/accountLoginAction', {...account})

    })
}

const setFormFileds = (name: string, password: string) => {
  account.name = name || account.name;
  account.password = password || account.password
}

defineExpose({loginAction, setFormFileds})
</script>