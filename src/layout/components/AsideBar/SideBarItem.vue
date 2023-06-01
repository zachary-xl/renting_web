<template>
  <SideLink v-if="link" :to="link">
    <el-menu-item>
      <el-icon>
        <SvgIcon :icon-class="icon" />
      </el-icon>
      <template #title>
        <span class="menu-title">
            {{ title }}
          </span>
      </template>
    </el-menu-item>
  </SideLink>
  <el-sub-menu v-else-if="item.children && item.children.length > 0" ref="subMenu" :index="path">
    <template #title>
      <el-icon>
        <SvgIcon :icon-class="icon" />
      </el-icon>
      <span class="menu-title">{{ title }}</span>
    </template>
    <SideBarItem
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="path">
    <el-icon>
      <SvgIcon :icon-class="icon" />
    </el-icon>
    <template #title>
      <span class="menu-title">{{ title }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" name="SubMenu" setup>
import type { RouteRecordRaw } from "vue-router";
import { computed } from "vue";
import SideLink from "./SideLink";

interface ISubMenuProps {
  item: any;
}

const props = defineProps<ISubMenuProps>();
const title = computed<string>(() => props.item.title ?? "");
const icon = computed<string>(() => props.item.icon ?? "");
const link = computed<string>(() => props.item.link ?? "");
const path = computed<string>(() => props.item.path ?? "");
</script>

<style scoped>
.menu-title {
  margin-left: 6px;
}
</style>
