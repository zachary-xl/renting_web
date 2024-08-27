<template>
  <el-config-provider :locale="locale">
    <RouterView v-slot="{ Component }">
      <component :is="Component"></component>
    </RouterView>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useDark } from "@vueuse/core";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import type { Language } from "element-plus/es/locale";
const locale = ref<Language>(zhCn);
useDark();
</script>

<style scoped></style>
