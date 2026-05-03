<script setup lang="ts">
import LoginAccount from "@/views/login/cpns/login-account.vue";
import { onMounted, ref } from "vue";
import LocalCache from '@/utils/cache'

const accountRef = ref<InstanceType<typeof LoginAccount>>()
const currentTab = ref('account')
const isKeepPassword = ref(true)

onMounted(() => {
  const name = LocalCache.getCache('name');
  const password = LocalCache.getCache('password');
  accountRef.value?.setFormFileds(name, password);
})

const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  } else {
    // phoneRef.value?.loginAction()
    // 这里写的是手机登陆的逻辑
  }
}
</script>

<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><UserFilled /></el-icon> 账号登陆
          </span>
        </template>
        <login-account ref="accountRef"/>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><Iphone></Iphone></el-icon> 手机登陆
          </span>
        </template>
        <!-- 这里放入自定义组件<login-phone> -->
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" @click="handleLoginClick()">
      立即登陆
    </el-button>
  </div>
</template>

<style scoped lang="less">

</style>