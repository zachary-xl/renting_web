<template>
  <el-container class="w-full h-full">
    <AsideBar :style="{width:appStore[GET_IS_EXPAND_WIDTH] + 'px'}" class="aside-container transition_3 overflow-hidden"></AsideBar>
    <el-container>
      <NavBar></NavBar>
      <MainPage></MainPage>
    </el-container>
  </el-container>
</template>

<script lang="ts" name="layout" setup>
import { AsideBar, NavBar, MainPage } from "./components";
import { useAppStoreToRefs } from "@/hooks";
import { GET_IS_EXPAND_WIDTH } from "@/model";

console.log();
const { appStore } = useAppStoreToRefs();
</script>

<style lang="scss" scoped>
.aside-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  background-color: $globalAsideMenuDark;
}
</style>
