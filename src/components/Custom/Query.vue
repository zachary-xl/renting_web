<template>
  <div>
    <el-row :gutter="18" style="display: block !important">
      <el-form ref="form" :inline="true" :label-width="`${labelWidth}px`" class="form_flex">
        <el-col v-for="(item, index) of items" :key="index" v-bind="colLayout">
          <el-form-item :label="item.name">
            <template v-if="item.slot">
              <slot :name="item.slotName" />
            </template>
            <el-input
              v-else-if="!item.type || item.type === 'input'"
              :model-value="searchParams[item.key]"
              :placeholder="item.placeholder || '请输入'"
              v-bind="setAttrs(item)"
              @update:model-value="handleValueChange($event, item.key)"
            />
            <el-input
              v-else-if="item.type === 'textarea'"
              :model-value="searchParams[item.key]"
              :placeholder="item.placeholder || '请输入'"
              v-bind="setAttrs(item)"
              @update:model-value="handleValueChange($event, item.key)"
            />
            <el-select
              v-else-if="item.type === 'select'"
              :model-value="searchParams[item.key]"
              :placeholder="item.placeholder || '请选择'"
              v-bind="setAttrs(item)"
              @update:model-value="handleValueChange($event, item.key)"
            >
              <el-option
                v-for="(option, i) of item.options"
                :key="i"
                :label="option[(item['props'] && item['props']['key']) || 'label']"
                :value="option[(item['props'] && item['props']['value']) || 'value']"
              />
            </el-select>
            <el-cascader
              v-else-if="item.type === 'cascader'"
              :model-value="searchParams[item.key]"
              :options="item.options"
              :placeholder="item.placeholder || '请选择'"
              :props="item.props"
              v-bind="setAttrs(item)"
              @update:model-value="handleValueChange($event, item.key)"
            />
            <el-date-picker
              v-else-if="item.type === 'date-picker'"
              :default-time="defaultTime"
              :model-value="searchParams[item.key]"
              :placeholder="item.placeholder || '请选择'"
              :type="item.pickerType || 'daterange'"
              end-placeholder="结束日期"
              prefix-icon=""
              range-separator="-"
              start-placeholder="开始日期"
              v-bind="setAttrs(item)"
              @update:model-value="handleValueChange($event, item.key)"
            />
            <template v-else-if="item.type === 'section'">
              <el-input
                :model-value="searchParams[item.minKey]"
                :placeholder="item.placeholder || '请输入'"
                class="section-input"
                v-bind="setAttrs(item)"
              />
              <span class="symbol">-</span>
              <el-input
                :model-value="searchParams[item.maxKey]"
                :placeholder="item.placeholder || '请输入'"
                class="section-input"
                v-bind="setAttrs(item)"
              />
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="btnWidth">
          <slot name="prefix-button" />
          <el-button-group class="search-wrap">
            <el-button type="primary" @click="handleSearch">
              <el-icon>
                <Search />
              </el-icon>
              查询
            </el-button>
            <el-button @click="handleReset">
              <el-icon>
                <Refresh />
              </el-icon>
              重置
            </el-button>
          </el-button-group>
          <slot name="suffix-button" />
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script lang="ts" name="CustomQuery" setup>
import { onMounted, ref, reactive } from "vue";
import { Refresh, Search } from "@element-plus/icons-vue";
import cloneDeep from "loadsh/cloneDeep";
const props = defineProps({
  labelWidth: {
    type: Number,
    default: 80
  },
  // 表单配置
  items: {
    type: Array,
    default: () => []
  },
  // 表单参数
  searchParams: {
    type: Object,
    default: () => []
  },
  btnWidth: {
    type: Number,
    default: 4
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 5,
      lg: 5,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
});
const emits = defineEmits(["update:searchParams", "change", "search", "reset"]);
const form = reactive({
  initSearchParams: {}
});
const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]);

onMounted(() => {
  // 保存初始值
  form.initSearchParams = cloneDeep(props.searchParams);
});
const handleValueChange = (value, field) => {
  emits("update:searchParams", { ...props.searchParams, [field]: value });
};
// 查询
const handleSearch = () => {
  const cpValue = cloneDeep(props.searchParams);
  let request = true;
  if (!cpValue.requestFlag) request = true;
  if (cpValue.requestFlag) request = false;
  emits("update:searchParams", { ...cpValue, request });
  emits("change", cpValue);
  emits("search", cpValue);
};
// 重置
const handleReset = () => {
  const cpValue = cloneDeep(form.initSearchParams);
  let request = true;
  if (!cpValue!.requestFlag) request = true;
  if (cpValue!.requestFlag) request = false;
  emits("update:searchParams", { ...cpValue, request });
  emits("change", cpValue);
  emits("reset", cpValue);
};
const setAttrs = params => {
  const { slot, ...options } = params;
  return { ...options, slot };
};
</script>

<style lang="scss" scoped>
.form_flex {
  display: flex;
  flex-wrap: wrap;

  .search-wrap {
    margin-bottom: 16px;
  }

  :deep() {
    .el-select {
      width: 100%;
    }

    .el-cascader {
      width: 100%;
    }

    .el-form-item {
      display: flex;
      width: 100%;
      margin-bottom: 18px;

      .el-form-item__label {
        font-size: 14px;
        color: #606060d9;
      }

      .el-form-item__content {
        flex: 1;
      }
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100% !important;
    }

    .el-range-editor.el-input__inner {
      padding: 3px 1px 3px 5px;
    }
  }
}
</style>
