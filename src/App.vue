<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import type { Language } from "element-plus/es/locale";
import { useDark } from "@vueuse/core";
import zhCn from "element-plus/dist/locale/zh-cn";

const locale = ref(zhCn) as Language;
useDark();
</script>

<style scoped></style>
