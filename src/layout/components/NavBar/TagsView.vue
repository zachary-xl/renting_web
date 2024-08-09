<template>
  <div class="tags-view-container">
    <ScrollPanel ref="scrollPaneRef" class="tags-view-wrapper">
      <router-link v-for="tag of tagsViewStore[GET_TAGS_LIST]" :key="tag.path" :to="tag.path" active-class="active" class="tags-view-item">
        {{ tag.meta.title }}
        <span v-if="!tag.meta.isClose" class="close" @click.prevent.stop="closeSelectedTag(tag)"> &times; </span>
      </router-link>
    </ScrollPanel>
  </div>
</template>

<script lang="ts" name="TagsView" setup>
import ScrollPanel from "./ScrollPane.vue";
import { onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTagsViewStoreToRefs } from "@/hooks";
import { ADD_VISITED_VIEW_ACTION, DEL_VISITED_VIEW_ACTION, GET_TAGS_LIST, SET_CURRENT_TAG_ACTION } from "@/model";

const route = useRoute();
const router = useRouter();
const { tagsViewStore } = useTagsViewStoreToRefs();

const unwatch = watch(
  () => route,
  newVal => {
    tagsViewStore[ADD_VISITED_VIEW_ACTION](newVal);
    tagsViewStore[SET_CURRENT_TAG_ACTION](newVal);
  },
  {
    deep: true,
    flush: "pre",
    immediate: true
  }
);
const closeSelectedTag = tag => {
  let lastTag = tagsViewStore[DEL_VISITED_VIEW_ACTION](tag);
  lastTag && router.push(lastTag.path);
};
onUnmounted(() => {
  unwatch();
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    padding: 0 10px;
    transition: all 0.3s;

    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 2px 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      text-decoration: none;

      .close {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        line-height: 16px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        display: inline-block;

        :deep(.el-icon) {
          transform: scale(0.9);
          display: inline-block;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }

    .active {
      background-color: rgb(64, 158, 255);
      border-color: rgb(64, 158, 255);
      color: #fff;

      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
  }
}
</style>
