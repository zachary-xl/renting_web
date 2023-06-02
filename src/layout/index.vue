<template>
  <el-container class="w-full h-full">
    <AsideBar :style="{ width: settingStore[GET_IS_EXPAND_WIDTH] + 'px' }" class="aside-container overflow-hidden"></AsideBar>
    <div class="main__container">
      <NavBar></NavBar>
      <MainPage></MainPage>
    </div>
  </el-container>
</template>

<script lang="ts" name="layout" setup>
import { AsideBar, NavBar, MainPage } from "./components";
import { useSettingStoreToRefs } from "@/hooks";
import { GET_IS_EXPAND_WIDTH } from "@/model";

const { settingStore } = useSettingStoreToRefs();
</script>
