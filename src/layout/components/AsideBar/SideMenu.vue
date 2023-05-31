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
        v-for="(route, index) of menusList"
        :key="route.path + index"
        :item="route" />
  </el-menu>
</template>

<script lang="ts" name="MenuList" setup>
import SideBarItem from "./SideBarItem.vue";
import { useSettingStoreToRefs,useAuthStoreToRefs } from "@/hooks";

const { isExpand } = useSettingStoreToRefs();
const { menusList } = useAuthStoreToRefs();
</script>

<style lang="scss" scoped>
:root {
  --bg: #fff;
}

.menu-container {
  border: none;
}
</style>
