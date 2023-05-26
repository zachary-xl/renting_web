<template>
  <component :is="labelType" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script lang="ts" name="Link" setup>
import { isExternal } from "@/utils";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  }
});

const isExt = computed(() => isExternal(props.to));
const labelType = computed(() => {
  if (isExt.value) return "a";
  return "router-link";
});

function linkProps() {
  if (isExt.value) {
    return {
      href: props.to,
      target: "_blank",
      rel: "noopener noreferrer"
    };
  }
  return {
    to: props.to
  };
}
</script>

