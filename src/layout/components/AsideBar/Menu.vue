<template>
  <el-menu
    :collapse="!isExpand"
    active-text-color="#409eff"
    background-color="#304156"
    class="menu-container"
    text-color="#bfcbd9"
    unique-opened
    router
    :collapse-transition="false"
  >
    <el-menu-item index="/">
      <el-icon size="14">
        <HomeFilled />
      </el-icon>
      <strong>首页</strong>
    </el-menu-item>
    <el-sub-menu index="/system">
      <template #title>
      <el-icon><Setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/system/user">
        <el-icon><User /></el-icon>
        <strong>用户管理</strong>
      </el-menu-item>
      <el-menu-item index="/system/role">
        <el-icon><UserFilled /></el-icon>
        <strong>角色管理</strong>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" name="MenuList" setup>
import { ref } from "vue";
import { HomeFilled, Setting,User,UserFilled } from "@element-plus/icons-vue";
import SubMenu from "./SubMenu.vue";
import { useSettingStoreToRefs } from "@/hooks";

const { settingStore, isExpand } = useSettingStoreToRefs();
</script>

<style scoped lang="scss">
:root{
  --bg:#fff;
}
.menu-container {
  border: none;
}
</style>
