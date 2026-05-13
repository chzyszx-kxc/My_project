<script setup lang="ts">
import { ref } from 'vue'

const isFold = ref(false)

// 注册需要触发的emit事件
const emit = defineEmits(['foldChange'])

const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<template>
<div>
  <el-icon @click="handleFoldClick">
    <component :is="isFold ? 'fold' : 'expand'"></component>
  </el-icon>
</div>
</template>

<style scoped lang="less">
</style>