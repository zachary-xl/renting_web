<script lang="ts" setup name="Iframe">
import { useRoute } from "vue-router";

const route = useRoute();
const link = computed(() => route?.meta?.link);
</script>

<template>
  <div
    :key="link"
    class="flex flex-1 flex-col w-full h-full overflow-hidden"
  >
    <iframe :src="link" class="flex flex-1 flex-col h-full w-full border-0" />
  </div>
</template>
