<template>
  <div>
    <el-container>
      <el-aside>
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @fold-change="handleFoldChange"></nav-header>
        </el-header>
        <el-main>
          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";
import { ref } from "vue";

const isCollapse = ref(false);

const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold;
}
</script>
