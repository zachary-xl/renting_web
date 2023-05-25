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
    <template v-for="item of menuList" :key="item.path">
      <SubMenu :item="item" />
    </template>
  </el-menu>
</template>

<script lang="ts" name="MenuList" setup>
import { ref } from "vue";
import { HomeFilled, Setting, User, UserFilled } from "@element-plus/icons-vue";
import SubMenu from "./SubMenu.vue";
import { useSettingStoreToRefs, useUserStoreToRefs } from "@/hooks";

const { settingStore, isExpand } = useSettingStoreToRefs();
const { menuList } = useUserStoreToRefs();
</script>

<style lang="scss" scoped>
:root {
  --bg: #fff;
}

.menu-container {
  border: none;
}
</style>
