<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
})
</script>

<style scoped lang="less">
.login {
  background: url('@/assets/img/login-bg.svg')
}
</style>
