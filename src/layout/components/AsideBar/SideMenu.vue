<template>
  <el-menu
    :collapse="!isExpand"
    active-text-color="#409eff"
    background-color="#304156"
    class="menu-container"
    router
    text-color="#bfcbd9"
    unique-opened
  >
      <SideBarItem
        v-for="(route, index) of sidebarRouters"
        :key="route.path + index"
        :item="route" />
  </el-menu>
</template>

<script lang="ts" name="MenuList" setup>
import { ref } from "vue";
import { HomeFilled, Setting, User, UserFilled } from "@element-plus/icons-vue";
import SideBarItem from "./SideBarItem.vue";
import { useSettingStoreToRefs, useUserStoreToRefs } from "@/hooks";

const { settingStore, isExpand } = useSettingStoreToRefs();
const { sidebarRouters } = useUserStoreToRefs();
</script>

<style lang="scss" scoped>
:root {
  --bg: #fff;
}

.menu-container {
  border: none;
}
</style>
