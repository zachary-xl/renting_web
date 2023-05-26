<template>
  <div class="aside">
    <SideLogo />
    <el-aside>
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <MenuList></MenuList>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script lang="ts" name="AsideBar" setup>
import SideLogo from "./SideLogo.vue";
import MenuList from "./SideMenu.vue";

</script>

<style scoped lang="scss">
.el-aside {
  width: 100%;
}
</style>
