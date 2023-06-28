<template>
  <el-config-provider :locale="locale">
    <RouterView v-slot="{ Component }">
      <component :is="Component"></component>
    </RouterView>
  </el-config-provider>
</template>

<script lang="ts" setup>
import type { Language } from "element-plus/es/locale";
import { useDark } from "@vueuse/core";
import zhCn from "element-plus/dist/locale/zh-cn";
import consola from "consola";
consola.info(123);
const locale = ref(zhCn) as Language;
useDark();
</script>

<style scoped></style>
