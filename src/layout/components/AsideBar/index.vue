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
import MenuList from "./Menu.vue";

</script>

<style lang="scss" scoped>
.el-aside {
  width: 100%;
}
</style>
