<template>
  <el-table v-loading="state.loading" :data="tableData" stripe v-bind="tableAttr" @selection-change="selectionChange">
    <el-table-column v-if="selectVisible" align="left" type="selection" width="45" />
    <template v-for="(column, index) in columnConfig" :key="index">
      <el-table-column v-if="column.render" show-overflow-tooltip v-bind="column">
        <template #default="scope">
          <Render :column="column" :index="scope.$index" :render="column.render" :row="scope.row" v-bind="$attrs" />
        </template>
      </el-table-column>
      <el-table-column v-else-if="column.type === 'index'" type="index" v-bind="column" width="70" />
      <el-table-column v-else :key="column.prop" show-overflow-tooltip v-bind="column" />
    </template>
  </el-table>
</template>

<script lang="ts" name="Table" setup>
import type { PropType } from "vue";
import type { ITable } from "@/components/types";
import { reactive } from "vue";
import Render from "./Render";

const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  columnConfig: {
    type: Array as PropType<ITable.IColumn[]>,
    default: () => []
  },
  // table组件的属性设置
  tableAttr: {
    type: Object,
    default: () => ({
      border: false
    })
  },
  // 是否可选择行
  selectVisible: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["selectionChange"]);
onBeforeMount(() => {
  state.loading = true;
});
const state = reactive({
  loading: false
});
onMounted(() => {
  state.loading = false;
});
const selectionChange = (selections) => {
  emits("selectionChange", selections);
};
</script>
<style lang="scss" scoped>
.el-popper {
  max-width: 50%;
}
</style>
