<template>
  <SideLink v-if="link" :to="link">
    <el-menu-item>
      <el-icon>
        <SvgIcon :icon-class="icon"/>
      </el-icon>
      <template #title>
        <span class="menu-title">
            {{ title }}
          </span>
      </template>
    </el-menu-item>
  </SideLink>
  <el-sub-menu v-else-if="item.children" ref="subMenu" :index="path">
    <template v-if="item.meta" #title>
      <el-icon>
        <SvgIcon :icon-class="icon"/>
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
      <SvgIcon :icon-class="icon"/>
    </el-icon>
    <template #title>
      <span class="menu-title">{{ title }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" name="SubMenu" setup>
import type {RouteRecordRaw} from "vue-router";
import {computed} from "vue";
import SideLink from "./SideLink";

interface ISubMenuProps {
  item: RouteRecordRaw;
}

const props = defineProps<ISubMenuProps>();
const title = computed<string>(() => props.item.meta?.title ?? "");
const icon = computed<string>(() => props.item.meta?.icon ?? "");
const link = computed<string>(() => props.item.meta?.link ?? "");
const path = computed<string>(() => props.item.path ?? "");
console.log(props.item)
</script>

<style scoped>
.menu-title {
  margin-left: 6px;
}
</style>
