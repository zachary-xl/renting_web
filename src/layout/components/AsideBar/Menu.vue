<template>
  <el-menu
    active-text-color="#409eff"
    background-color="#304156"
    :collapse="!isExpand"
    class="menu-container"
    text-color="#bfcbd9"
    unique-opened
  >
    <el-menu-item index="1">
      <el-icon>
        <CirclePlus />
      </el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" name="MenuList" setup>
import { CirclePlus, Search, Female, Male } from "@element-plus/icons-vue";
import SubMenu from "./SubMenu.vue";
import variables from "@/assets/styles/export.module.scss";

import { ref } from "vue";

import { useSettingStoreToRefs } from "@/hooks";
import { GET_IS_EXPAND_WIDTH, GET_IS_FULLSCREEN, TOGGlE_EXPAND_ACTION, TOGGlE_FULLSCREEN_ACTION } from "@/model";

const { settingStore, isExpand } = useSettingStoreToRefs();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.menu-container {
  border: none;
}
</style>
