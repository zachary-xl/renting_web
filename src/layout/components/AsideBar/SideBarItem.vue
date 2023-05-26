<template>
  <SideLink v-if="item.meta.link" :to="item.meta.link">
    <el-menu-item :index="item.path">
      <template #title>
      <svg-icon :icon-class="item.meta.icon" />
<!--        <el-icon><UserFilled /></el-icon>-->
          <span :title="item.meta.title" class="menu-title">
            {{ item.meta.title }}
          </span>
      </template>
    </el-menu-item>
  </SideLink>

  <el-sub-menu v-else ref="subMenu" :index="item.path">
    <template v-if="item.meta" #title>
      <svg-icon :icon-class="item.meta && item.meta.icon" />
      <span :title="item.meta.title" class="menu-title">{{ item.meta.title }}</span>
    </template>

    <SideBarItem
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-sub-menu>
</template>

<script lang="ts" name="SubMenu" setup>
import {UserFilled} from "@element-plus/icons-vue"
import type { RouteRecordRaw } from "vue-router";
import { computed } from "vue";
import SideLink from "./SideLink";

interface ISubMenuProps {
  item: RouteRecordRaw;
}

const props = defineProps<ISubMenuProps>();
console.log(props.item);
const link = computed(() => {
  console.log(props.item);
});
</script>

<style scoped></style>
