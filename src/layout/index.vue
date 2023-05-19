<template>
  <el-container class="w-full h-full">
    <AsideBar :style="{width:settingStore[GET_IS_EXPAND_WIDTH] + 'px'}"
              class="aside-container overflow-hidden"></AsideBar>
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
  transition: width .28s;
}

.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #000;
  opacity: 0.3;
  z-index: 2;
}

.main__container {
  width: 100%;
  min-height: 100%;
  transition: margin-left .28s;
  position: relative;
}
</style>
