<template>
  <div>
    <div>
      <img src="@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse">Vue3+TS</span>
    </div>
    <el-menu
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id + ''">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="formatIcon(item)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <el-icon v-if="subitem.icon">
                  <component :is="formatIcon(subitem)"></component>
                </el-icon>
                <span>{{ subitem.name}}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <template v-else-if="item.type === 2">
          <span>这是权限2能看到的内容</span>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type {IStoreType} from '@/store/types'

interface Props {
  collapse: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true
})

// 拿到值(对象userMenus)：用户登陆后的用户菜单
const store = useStore<IStoreType>()
const userMenus = computed(() => { return store.state.login.userMenus})

const formatIcon = computed(() => {
  return (item: any) => {
    return item.icon.replace('el-icon-', '')
  }
})

const router = useRouter()
const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? '/not-found'
  })
}
</script>