<template>
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script lang="ts" name="Pagination" setup>
import type { PropType } from "vue";
import { computed } from "vue";

const props = defineProps({
  total: {
    required: true,
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100]
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper"
  },
  background: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits(["pagination", "update:page", "update:limit"]);
const currentPage = computed({
  get() {
    return props.page;
  },
  set(newValue) {
    emits("update:page", newValue);
  }
});
const pageSize = computed({
  get() {
    return props.limit;
  },
  set(newValue) {
    emits("update:limit", newValue);
  }
});
const handleSizeChange = (val) => {
  emits("pagination", { page: currentPage.value, limit: val });
};
const handleCurrentChange = (val) => {
  emits("pagination", { page: val, limit: pageSize.value });
};
</script>
